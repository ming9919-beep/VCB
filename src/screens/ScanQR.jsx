import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { decodeQrFromCanvas, drawImageToCanvas, parseQrPayload } from '../qr.js'
import { resolveBank } from '../banks.js'
import { IconBack, IconClock, IconFlash, IconGear, IconImage, IconPin } from '../icons.jsx'
import { useStore } from '../store.jsx'
import {
  lookupVietQrAccountName,
  lookupVietQrRecipientName,
  parseVietQrImage,
  parseVietQrPayload
} from '../vietqrLookup.js'

function normalizePayeeName(name) {
  return String(name || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[Đđ]/g, 'D')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase()
}

function memoFromFields(fields) {
  if (!Array.isArray(fields)) return ''
  const tag62 = fields.find((f) => f.tag === '62')
  const sub = tag62?.subfields?.find?.((s) => s.tag === '08')
  return sub?.value ? String(sub.value) : ''
}

// 将本地 VietQR Reader API 的解析结果映射为收单信息
function payeeFromReader(data) {
  const bank = data?.bank || {}
  const amount = data?.amount
  const name = String(data?.recipient_name || '').trim()
  const verified = data?.recipient_name_source === 'vietqr_account_lookup'
  return {
    fromQr: true,
    account: String(data?.account_number || ''),
    name,
    qrName: verified ? '' : name,
    verified,
    bankBin: String(data?.bank_bin || ''),
    bankId: String(bank.code || ''),
    bank: String(bank.name || ''),
    bankFull: String(bank.legal_name || ''),
    bankLogo: String(bank.logo || ''),
    amount: amount === null || amount === undefined || amount === ''
      ? ''
      : String(parseInt(amount, 10) || amount),
    memo: memoFromFields(data?.fields),
    rawContent: String(data?.raw_payload || '')
  }
}

function payeeFromQrPayload(payload) {
  const parsed = parseQrPayload(payload)
  if (!parsed?.account) return null
  return {
    ...parsed,
    qrName: parsed.name,
    rawContent: String(payload || '')
  }
}

function mergePayeeData(primary, fallback) {
  if (!fallback) return primary
  return {
    ...primary,
    account: primary.account || fallback.account,
    qrName: primary.qrName || fallback.qrName,
    bankBin: primary.bankBin || fallback.bankBin,
    bankId: primary.bankId || fallback.bankId,
    bank: primary.bank || fallback.bank,
    bankFull: primary.bankFull || fallback.bankFull,
    bankLogo: primary.bankLogo || fallback.bankLogo,
    amount: primary.amount || fallback.amount,
    memo: primary.memo || fallback.memo,
    rawContent: primary.rawContent || fallback.rawContent
  }
}

async function decodeQrFromFile(file) {
  const image = await createImageBitmap(file)
  try {
    const canvas = document.createElement('canvas')
    if (!drawImageToCanvas(image, canvas, 1600)) return null
    return await decodeQrFromCanvas(canvas)
  } finally {
    image.close()
  }
}

export default function ScanQR() {
  const nav = useNavigate()
  const { setScannedPayee, rememberPayee } = useStore()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileRef = useRef(null)
  const streamRef = useRef(null)
  const cameraRequest = useRef(0)
  const scanTimer = useRef(0)
  const scanned = useRef(false)
  const imageBusy = useRef(false)
  const facingRef = useRef('environment')
  const [flash, setFlash] = useState(false)
  const [hint, setHint] = useState('Đưa mã QR vào khung hình')
  const [camOn, setCamOn] = useState(false)
  const [busy, setBusy] = useState(false)
  const [facing, setFacing] = useState('environment')
  const showHint = busy || (
    hint !== 'Đưa mã QR vào khung hình'
    && !hint.startsWith('Camera sau:')
    && !hint.startsWith('Camera trước:')
  )

  const stopStream = useCallback(() => {
    cameraRequest.current += 1
    clearTimeout(scanTimer.current)
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setCamOn(false)
  }, [])

  const goTransfer = useCallback((payee) => {
    const next = { ...payee, fromQr: true, name: String(payee.name || '').trim() }
    if (next.name && next.verified) rememberPayee(next.account, next.name, next.bank)
    setScannedPayee(next)
    stopStream()
    nav('/transfer', { replace: true, state: next })
  }, [rememberPayee, setScannedPayee, stopStream, nav])

  const submitPayee = useCallback(async (payee) => {
    if (scanned.current) return
    if (!payee || !/^\d{6,19}$/.test(String(payee.account || '').replace(/\s/g, ''))) {
      setHint('Mã QR không chứa số tài khoản hợp lệ. Hãy quét VietQR')
      return
    }
    payee.account = String(payee.account).replace(/\s/g, '')
    const resolvedName = String(payee.name || payee.qrName || '').trim()
    payee.qrName = String(payee.qrName || '').trim()
    payee.verified = payee.verified === true && Boolean(resolvedName)
    payee.name = payee.verified ? resolvedName : payee.qrName
    payee.nameMismatch = Boolean(
      payee.verified
      && payee.qrName
      && normalizePayeeName(payee.qrName) !== normalizePayeeName(payee.name)
    )
    const bank = resolveBank(payee.bankBin || payee.bankId || payee.bank)
    if (bank) {
      payee.bankId = bank.id
      payee.bankBin = bank.bin
      payee.bank = bank.name
      payee.bankFull = bank.full
      payee.bankLogo = bank.logo
    }
    scanned.current = true
    const bankCode = bank?.code || payee.bankId || ''
    const content = /^0002/.test(String(payee.rawContent || '')) ? String(payee.rawContent) : ''
    if (!payee.verified && (bankCode || content)) {
      setHint('Đã nhận tài khoản, đang xác minh tên người nhận...')
      try {
        let verification
        let vietQrError
        if (/^\d{6}$/.test(payee.bankBin)) {
          try {
            verification = await lookupVietQrRecipientName({
              bankBin: payee.bankBin,
              accountNumber: payee.account
            })
          } catch (error) {
            vietQrError = error
          }
        }
        if (!verification) {
          try {
            verification = await lookupVietQrAccountName({
              content: bankCode ? '' : content,
              bankCode,
              accountNumber: payee.account
            })
          } catch (error) {
            if (vietQrError) {
              throw new Error(`${vietQrError.message}; ${error.message}`)
            }
            throw error
          }
        }
        payee.verified = verification.verified === true
        payee.nameMismatch = Boolean(
          payee.qrName
          && normalizePayeeName(payee.qrName) !== normalizePayeeName(verification.accountName)
        )
        payee.name = verification.accountName
        payee.verifiedBankName = verification.bankName
      } catch (error) {
        payee.lookupError = error.message
      }
    } else {
      payee.lookupError = 'Không thể xác minh vì mã QR thiếu mã ngân hàng hợp lệ.'
    }
    const label = [payee.name, payee.bank, payee.account].filter(Boolean).join(' · ')
    setHint(payee.name ? `Đã nhận: ${label}` : `Đã nhận tài khoản: ${label}`)
    goTransfer(payee)
  }, [goTransfer])

  const applyPayload = useCallback(async (text) => {
    if (scanned.current) return
    const localPayee = payeeFromQrPayload(text)
    try {
      const data = await parseVietQrPayload(text)
      await submitPayee(mergePayeeData(payeeFromReader(data), localPayee))
    } catch (error) {
      if (localPayee) {
        await submitPayee(localPayee)
        return
      }
      setHint(error.message || 'Không giải mã được mã QR. Hãy quét VietQR')
    }
  }, [submitPayee])

  const loopScan = useCallback(() => {
    if (scanned.current) return
    if (imageBusy.current) {
      scanTimer.current = window.setTimeout(loopScan, 180)
      return
    }
    const video = videoRef.current
    const canvas = canvasRef.current
    if (video && canvas && video.readyState >= 2) {
      if (drawImageToCanvas(video, canvas, 640)) {
        decodeQrFromCanvas(canvas).then(async (text) => {
          if (!text || scanned.current) return
          await applyPayload(text)
        }).catch(() => {})
      }
    }
    scanTimer.current = window.setTimeout(loopScan, 180)
  }, [applyPayload])

  const startCam = useCallback(async (mode) => {
    stopStream()
    const request = cameraRequest.current
    scanned.current = false
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      })
      if (request !== cameraRequest.current) {
        stream.getTracks().forEach((t) => t.stop())
        return
      }
      streamRef.current = stream
      setCamOn(true)
      setHint(mode === 'user'
        ? 'Camera trước: đưa mã QR đối diện máy để quét'
        : 'Camera sau: đưa mã QR vào khung hình')
      const video = videoRef.current
      if (video) {
        video.srcObject = stream
        await video.play().catch(() => {})
      }
      loopScan()
    } catch (error) {
      if (request === cameraRequest.current) {
        setCamOn(false)
        setHint(error?.name === 'NotAllowedError'
          ? 'Chưa được cấp quyền camera. Hãy cấp quyền hoặc chọn ảnh mã QR'
          : 'Không mở được camera. Hãy chọn ảnh mã QR để thanh toán')
      }
    }
  }, [loopScan, stopStream])

  useEffect(() => {
    startCam(facingRef.current)
    return () => stopStream()
  }, [startCam, stopStream])

  async function toggleFlash() {
    const track = streamRef.current?.getVideoTracks?.()[0]
    const next = !flash
    if (!track) {
      setHint('Camera chưa sẵn sàng để bật đèn flash')
      return
    }
    try {
      await track.applyConstraints({ advanced: [{ torch: next }] })
      setFlash(next)
    } catch {
      setFlash(false)
      setHint('Camera này không hỗ trợ đèn flash')
    }
  }

  function switchCam() {
    const next = facing === 'environment' ? 'user' : 'environment'
    facingRef.current = next
    setFacing(next)
    setFlash(false)
    startCam(next)
  }

  async function onPickFile(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setHint('Hãy chọn tệp hình ảnh có chứa mã QR')
      return
    }
    if (file.size > 15 * 1024 * 1024) {
      setHint('Ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn 15 MB')
      return
    }
    if (busy) return
    imageBusy.current = true
    setBusy(true)
    setHint('Đang đọc mã QR trong ảnh...')
    try {
      const payload = await decodeQrFromFile(file)
      const localPayee = payload ? payeeFromQrPayload(payload) : null
      if (localPayee) {
        await submitPayee(localPayee)
        return
      }
      const data = await parseVietQrImage(file)
      const fromReader = payeeFromReader(data)
      const readerPayload = String(data?.raw_payload || '')
      await submitPayee(mergePayeeData(
        fromReader,
        localPayee || (readerPayload ? payeeFromQrPayload(readerPayload) : null)
      ))
    } catch (error) {
      setHint(error.message || 'Không đọc được mã QR trong ảnh. Hãy chọn ảnh rõ hơn')
    } finally {
      imageBusy.current = false
      setBusy(false)
    }
  }

  return (
    <div className={`scan-page ${camOn ? '' : 'scan-page-fallback'}`}>
      <video
        ref={videoRef}
        className={`scan-video ${facing === 'user' ? 'mirror' : ''}`}
        playsInline
        muted
        autoPlay
      />
      <div className="scan-shade" />
      <canvas ref={canvasRef} className="scan-canvas" />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="scan-file"
        onChange={onPickFile}
      />

      <div className="scan-top">
        <button className="scan-icon-btn" onClick={() => nav(-1)} aria-label="back">
          <IconBack color="#fff" />
        </button>
        <div className="scan-title">Quét mã QR</div>
        <button className={`scan-icon-btn ${flash ? 'on' : ''}`} onClick={toggleFlash}>
          <IconFlash />
        </button>
        <button className="scan-icon-btn" onClick={switchCam} title="Đổi camera">
          <IconGear />
        </button>
      </div>

      <div className="scan-mid">
        <div className="scan-brand"><span className="g">VCB</span>Digibank</div>
        <div className="scan-desc">Quét mã QR để thanh toán, chuyển tiền và rút tiền mặt tại hệ thống ATM</div>
        <div className="scan-frame">
          <span className="scan-line" />
        </div>
        <div className="scan-paylogos">
          <span>VIETQR cash</span>
          <span>VIETQR</span>
          <span>VNPAY QR</span>
          <span>napas 247</span>
        </div>
        <div className="scan-cards">
          <span className="visa">VISA</span>
          <span className="mc">mastercard</span>
          <span className="cup">UnionPay</span>
        </div>
        {showHint && <div className="scan-hint">{busy ? 'Đang đọc mã QR...' : hint}</div>}
      </div>

      <div className="scan-bottom">
        <button className="scan-act" type="button" onClick={() => fileRef.current?.click()}>
          <IconImage />
          <span>Chọn ảnh mã QR</span>
        </button>
        <button className="scan-act" type="button" onClick={() => nav('/history')}>
          <IconClock size={22} color="#fff" />
          <span>Lịch sử giao dịch</span>
        </button>
        <button className="scan-act" type="button" onClick={() => nav('/branches')}>
          <IconPin />
          <span>Điểm thanh toán</span>
        </button>
      </div>
    </div>
  )
}
