import snapshot from './vietqr-banks.json'

function mapBank(b) {
  const bin = String(b.bin || '')
  const code = String(b.code || b.shortName || b.short_name || bin)
  const name = String(b.shortName || b.short_name || (b.full ? b.name : b.code || b.name) || bin)
  const fullName = String(b.full || b.name || name)
  return {
    bin,
    id: code,
    code,
    name,
    full: fullName.toLowerCase().includes(name.toLowerCase()) ? fullName : `${name} - ${fullName}`,
    logo: String(b.logo || (code ? `https://cdn.vietqr.io/img/${code}.png` : '')),
    swift: b.swift_code || b.swift || ''
  }
}

export let BANKS = snapshot.map(mapBank)
export let bankList = BANKS

const byKey = new Map()

function norm(v) {
  return String(v || '').normalize('NFKC').trim().toLowerCase().replace(/[\s._-]+/g, '')
}

function rebuildIndex() {
  byKey.clear()
  for (const b of BANKS) {
    for (const key of [b.bin, b.code, b.id, b.name, b.full]) {
      const k = norm(key)
      if (k && !byKey.has(k)) byKey.set(k, b)
    }
  }
}

rebuildIndex()

export function resolveBank(raw) {
  if (raw === undefined || raw === null || raw === '') return null
  const s = String(raw).trim()
  const direct = byKey.get(norm(s))
  if (direct) return direct
  const low = s.toLowerCase()
  for (const b of BANKS) {
    if (low.includes(norm(b.name)) || low.includes(norm(b.code)) || (b.bin && low.includes(b.bin))) {
      return b
    }
  }
  return null
}

export function unknownBank(bin) {
  const code = String(bin || '').trim()
  return {
    bin: code || '',
    id: code || 'other',
    code: code || 'NAPAS',
    name: code ? `Ngân hàng ${code}` : 'Ngân hàng khác',
    full: code ? `Ngân hàng NAPAS BIN ${code}` : 'Ngân hàng khác',
    logo: '',
    swift: ''
  }
}

export async function loadBanks() {
  try {
    // 本地 VietQR Reader API：GET /api/v1/banks（经 Vite /vqr 代理）
    const res = await fetch('/vqr/api/v1/banks', { headers: { Accept: 'application/json' } })
    const json = await res.json()
    const list = Array.isArray(json) ? json : Array.isArray(json?.data) ? json.data : []
    if (list.length) {
      BANKS = list.map(mapBank)
      bankList = BANKS
      rebuildIndex()
    }
  } catch {
    /* keep snapshot */
  }
  return BANKS
}
