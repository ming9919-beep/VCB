import { BANKS, resolveBank, unknownBank } from './banks.js'

export const BANK_BINS = Object.fromEntries(BANKS.map((b) => [b.bin, b]))

function takeUtf8Bytes(str, start, length) {
  let end = start
  let bytes = 0
  while (end < str.length && bytes < length) {
    const codePoint = str.codePointAt(end)
    bytes += codePoint <= 0x7f ? 1 : codePoint <= 0x7ff ? 2 : codePoint <= 0xffff ? 3 : 4
    end += codePoint > 0xffff ? 2 : 1
  }
  return { value: str.slice(start, end), end }
}

function parseTlv(s) {
  const out = {}
  let i = 0
  const str = String(s || '')
  while (i + 4 <= str.length) {
    const tag = str.slice(i, i + 2)
    const length = str.slice(i + 2, i + 4)
    if (!/^\d{2}$/.test(length)) break
    const len = Number(length)
    const { value: val, end } = takeUtf8Bytes(str, i + 4, len)
    if (len > 0 && end === i + 4) break
    if (!out[tag]) out[tag] = val
    else if (Array.isArray(out[tag])) out[tag].push(val)
    else out[tag] = [out[tag], val]
    i = end
  }
  return out
}

function first(v) {
  return Array.isArray(v) ? v[0] : v || ''
}

function unescapeName(s) {
  const raw = String(s || '').replace(/\+/g, ' ').replace(/\s+/g, ' ').trim()
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

const NOT_NAME = /^(https?:|www\.|qr\.|img\.|api\.|vietqr|napas|vnpay|qribftta|qribfttc|vnd|vn|compact|print|qr_only|chuyen tien|chuyen khoan|transfer)$/i

function looksLikeName(s) {
  const t = unescapeName(s)
  if (!t || t.length < 2 || t.length > 80) return false
  if (NOT_NAME.test(t)) return false
  if (/^\d+$/.test(t)) return false
  if (/^https?:/i.test(t)) return false
  const letters = (t.match(/[A-Za-zÀ-ỹĂăÂâÊêÔôƠơƯưĐđ]/g) || []).length
  return letters >= 2
}

function pickName(...cands) {
  for (const c of cands) {
    // 部分不规范/被截断的码会让 tag 59 户名尾部粘连下一字段的数字，去掉尾部残留数字
    const n = unescapeName(c).replace(/[\s\d]+$/, ' ').replace(/\s+/g, ' ').trim()
    if (looksLikeName(n)) return n
  }
  return ''
}

function extractTagValues(raw, tag) {
  const str = String(raw || '')
  const out = []
  const re = new RegExp(tag + '(\\d{2})', 'g')
  let m
  while ((m = re.exec(str))) {
    const len = parseInt(m[1], 10)
    if (Number.isNaN(len) || len < 1 || len > 99) continue
    const { value: val } = takeUtf8Bytes(str, m.index + 4, len)
    if (val) out.push(val)
  }
  return out
}

function extractMerchant(root) {
  const keys = Object.keys(root).filter((k) => {
    const n = Number(k)
    return n >= 26 && n <= 51
  }).sort((a, b) => (a === '38' ? -1 : b === '38' ? 1 : Number(a) - Number(b)))
  for (const k of keys) {
    const accInfo = parseTlv(first(root[k]))
    const guid = first(accInfo['00'] || '').toUpperCase()
    const nested = parseTlv(first(accInfo['01']))
    let bin = first(nested['00']) || first(accInfo['00']) || ''
    let account = String(first(nested['01']) || first(accInfo['01']) || '').replace(/\s/g, '')
    if (!account && /^\d{6,}$/.test(String(first(accInfo['01']) || ''))) {
      account = String(first(accInfo['01'])).replace(/\s/g, '')
    }
    if (guid.includes('A000000727') || /^\d{6}$/.test(bin) || account.length >= 6) {
      if (!/^\d{6}$/.test(bin)) {
        const m = String(first(root[k])).match(/01(\d{2})(\d{6,19})/)
        if (m) account = account || m[2]
        const b = String(first(root[k])).match(/00(\d{2})(\d{6})/)
        if (b && b[2].length === 6) bin = bin || b[2]
      }
      return {
        guid,
        bin,
        account,
        service: first(accInfo['02'])
      }
    }
  }
  return { guid: '', bin: '', account: '', service: '' }
}

function parseEmv(raw) {
  const root = parseTlv(raw)
  const merchant = extractMerchant(root)
  const amountRaw = first(root['54'])
  const amount = amountRaw ? String(Math.round(Number(amountRaw) || Number(amountRaw.replace(/[^\d.]/g, '')) || 0) || '') : ''
  const add = parseTlv(first(root['62']))
  const extra = unescapeName(first(add['08']))
  const name = pickName(
    first(root['59']),
    first(add['50']),
    first(add['01']),
    first(root['60']),
    ...extractTagValues(raw, '59')
  )
  return {
    bin: merchant.bin,
    account: merchant.account,
    name,
    amount,
    extra
  }
}

function parseUrl(raw) {
  try {
    const url = new URL(raw)
    const p = url.searchParams
    const path = decodeURIComponent(url.pathname || '')
    const img = path.match(/\/(?:qr|image|img)\/([A-Za-z0-9]+)-([0-9A-Za-z]{6,22})/i)
      || path.match(/\/([A-Za-z]{2,12})\/(\d{6,19})/)
    const bankToken = img ? img[1] : ''
    const accToken = img ? img[2] : ''
    const binFromToken = /^\d{6}$/.test(bankToken) ? bankToken : ''
    const bankFromToken = !binFromToken && bankToken ? bankToken : ''
    return {
      account: p.get('account') || p.get('acc') || p.get('soTaiKhoan') || p.get('accountNo') || accToken,
      name: p.get('accountName') || p.get('name') || p.get('ten') || p.get('owner') || p.get('consumerName') || '',
      amount: p.get('amount') || p.get('soTien') || p.get('amt') || '',
      memo: p.get('addInfo') || p.get('content') || p.get('memo') || '',
      bankQ: p.get('bank') || p.get('nganHang') || p.get('bankName') || p.get('bankCode') || bankFromToken,
      binQ: p.get('bin') || p.get('bankBin') || p.get('acqId') || binFromToken
    }
  } catch {
    return null
  }
}

function parseText(raw) {
  const parts = raw.split(/[|;,\n]/).map((x) => x.trim()).filter(Boolean)
  if (parts.length < 2) return null
  const accPart = parts.find((p) => /^\d{6,19}$/.test(p.replace(/\s/g, '')))
  const maybeBank = parts.map((p) => resolveBank(p)).find(Boolean)
  const namePart = parts.find((p) => looksLikeName(p) && p !== parts[0] && !/^\d+$/.test(p))
  const amtPart = parts.find((p) => /^amount=/i.test(p))
  return {
    bank: maybeBank,
    account: accPart ? accPart.replace(/\s/g, '') : '',
    name: namePart || '',
    amount: amtPart ? amtPart.replace(/[^\d]/g, '') : ''
  }
}

export function parseQrPayload(text) {
  const raw = String(text || '').trim()
  if (!raw) return null

  let bank = null
  let account = ''
  let name = ''
  let amount = ''
  let memo = ''

  if (/^000201/.test(raw) || /^0002/.test(raw)) {
    const emv = parseEmv(raw)
    account = emv.account
    name = emv.name
    amount = emv.amount
    memo = emv.extra || ''
    if (emv.bin) bank = resolveBank(emv.bin) || unknownBank(emv.bin)
  }

  const url = parseUrl(raw)
  if (url) {
    account = account || String(url.account || '').replace(/\s/g, '')
    name = pickName(name, url.name)
    amount = amount || String(url.amount || '').replace(/[^\d.]/g, '')
    memo = memo || unescapeName(url.memo)
    if (url.binQ) bank = resolveBank(url.binQ) || unknownBank(url.binQ)
    else if (url.bankQ) bank = resolveBank(url.bankQ) || bank
  }

  if (!account) {
    const txt = parseText(raw)
    if (txt) {
      account = txt.account
      name = name || txt.name
      amount = amount || txt.amount
      bank = txt.bank || bank
    }
  }

  if (!account) {
    const digits = raw.replace(/\s/g, '').match(/(?:^|[^0-9])(\d{8,19})(?:[^0-9]|$)/)
    if (digits) account = digits[1]
  }

  if (!account) return null

  if (!bank) {
    const maybe = raw.match(/\b(\d{6})\b/g) || []
    for (const bin of maybe) {
      const hit = resolveBank(bin)
      if (hit) {
        bank = hit
        break
      }
    }
  }
  if (!bank) bank = unknownBank('')

  name = pickName(name, ...extractTagValues(raw, '59'))

  return {
    fromQr: true,
    bankId: bank.id,
    bankBin: bank.bin,
    bank: bank.name,
    bankFull: bank.full,
    bankLogo: bank.logo || '',
    name,
    account,
    accountDisplay: account,
    amount: amount ? String(parseInt(amount, 10) || amount) : '',
    memo
  }
}

function crc16(str) {
  let crc = 0xffff
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) crc = (crc << 1) ^ 0x1021
      else crc <<= 1
      crc &= 0xffff
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

function tlv(tag, value) {
  const v = String(value)
  return tag + String(v.length).padStart(2, '0') + v
}

export function asciiName(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^A-Za-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase()
    .slice(0, 25)
}

export function buildVietQR({ bin = '970436', account, name, amount = '', memo = '' }) {
  const accInfo = tlv('00', bin) + tlv('01', account)
  const merchant = tlv('00', 'A000000727') + tlv('01', accInfo) + tlv('02', 'QRIBFTTA')
  let s = tlv('00', '01') + tlv('01', amount ? '12' : '11') + tlv('38', merchant) + tlv('53', '704')
  if (amount) s += tlv('54', String(amount))
  const nm = asciiName(name) || 'NGUOI NHAN'
  s += tlv('58', 'VN') + tlv('59', nm)
  if (memo) s += tlv('62', tlv('08', String(memo).slice(0, 25)))
  s += '6304'
  return s + crc16(s)
}

let jsQRFn = null
async function getJsQR() {
  if (!jsQRFn) {
    const mod = await import('jsqr')
    jsQRFn = mod.default
  }
  return jsQRFn
}

export async function decodeQrFromImageData(imageData) {
  const jsQR = await getJsQR()
  const code = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: 'attemptBoth'
  })
  return code?.data || null
}

export async function decodeQrFromCanvas(canvas) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  let text = await decodeQrFromImageData(imageData)
  if (text) return text
  const w = canvas.width
  const h = canvas.height
  const crops = [
    [0.12, 0.12, 0.76, 0.76],
    [0.18, 0.08, 0.64, 0.84],
    [0.08, 0.18, 0.84, 0.64]
  ]
  for (const [x, y, cw, ch] of crops) {
    const sx = Math.floor(w * x)
    const sy = Math.floor(h * y)
    const sw = Math.floor(w * cw)
    const sh = Math.floor(h * ch)
    const piece = ctx.getImageData(sx, sy, sw, sh)
    text = await decodeQrFromImageData(piece)
    if (text) return text
  }
  return null
}

export function drawImageToCanvas(source, canvas, max = 720) {
  const w = source.videoWidth || source.naturalWidth || source.width
  const h = source.videoHeight || source.naturalHeight || source.height
  if (!w || !h) return false
  const scale = Math.min(1, max / Math.max(w, h))
  canvas.width = Math.max(1, Math.round(w * scale))
  canvas.height = Math.max(1, Math.round(h * scale))
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height)
  return true
}

const OCR_SKIP = /^(vietqr|napas|agribank|vietcombank|bidv|techcombank|mb|acb|vpbank|tpbank|vietinbank|zalo|use|scan|qr|code|to|transfer|money|quickly|bank|247|vnd|compact|print|chia|se|tai|khoan|ngan|hang)$/i

export function nameFromOcrText(text) {
  const lines = String(text || '')
    .split(/\n+/)
    .map((l) => l.replace(/[^A-Za-zÀ-ỹĂăÂâÊêÔôƠơƯưĐđ0-9 .'-]/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean)
  const names = []
  for (const line of lines) {
    if (/^\d{6,}$/.test(line.replace(/\s/g, ''))) continue
    const words = line.split(' ').filter(Boolean)
    if (words.length < 2 || words.length > 6) continue
    if (words.every((w) => OCR_SKIP.test(w))) continue
    if (words.filter((w) => OCR_SKIP.test(w)).length >= words.length - 1) continue
    const letters = (line.match(/[A-Za-zÀ-ỹ]/g) || []).length
    if (letters < 6) continue
    if (!/^[A-Za-zÀ-ỹ].*[A-Za-zÀ-ỹ]$/.test(line)) continue
    names.push(line.toUpperCase())
  }
  names.sort((a, b) => b.length - a.length)
  return names[0] || ''
}

let tess = null
async function getTess() {
  if (tess) return tess
  const { createWorker } = await import('tesseract.js')
  tess = await createWorker('eng')
  return tess
}

export async function extractPrintedName(canvas) {
  if (!canvas || !canvas.width) return ''
  const w = canvas.width
  const h = canvas.height
  const crop = document.createElement('canvas')
  const ch = Math.max(40, Math.floor(h * 0.42))
  crop.width = w
  crop.height = ch
  const ctx = crop.getContext('2d')
  ctx.drawImage(canvas, 0, h - ch, w, ch, 0, 0, w, ch)
  try {
    const worker = await getTess()
    const full = await worker.recognize(canvas)
    let name = nameFromOcrText(full?.data?.text)
    if (name) return name
    const bottom = await worker.recognize(crop)
    name = nameFromOcrText(bottom?.data?.text)
    return name || ''
  } catch {
    return ''
  }
}
