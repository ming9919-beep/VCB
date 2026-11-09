import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode'
import { formatVND } from '../data.js'
import { buildVietQR } from '../qr.js'
import { IconBack, IconCopy } from '../icons.jsx'
import { useStore } from '../store.jsx'

export default function MyQR() {
  const nav = useNavigate()
  const { user } = useStore()
  const [copied, setCopied] = useState(false)
  const [src, setSrc] = useState('')
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('Chuyen tien')
  const amt = Number(String(amount).replace(/\D/g, '')) || 0

  useEffect(() => {
    let alive = true
    const payload = buildVietQR({
      bin: '970436',
      account: user.accountNoFull,
      name: user.name,
      amount: amt || '',
      memo
    })
    QRCode.toDataURL(payload, { width: 440, margin: 1, color: { dark: '#111111', light: '#ffffff' } })
      .then((url) => { if (alive) setSrc(url) })
      .catch(() => {})
    return () => { alive = false }
  }, [amt, memo, user.accountNoFull, user.name])

  function copy() {
    navigator.clipboard?.writeText(user.accountNoFull).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <>
      {copied && <div className="toast">Đã sao chép số tài khoản</div>}
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>QR nhận tiền</h1>
      </div>
      <div className="scroll" style={{ padding: 16 }}>
        <div className="qr-box">
          <div className="brand" style={{ fontSize: 20 }}><span className="g">VCB</span>Digibank</div>
          <div style={{ fontWeight: 800, marginTop: 8 }}>{user.name}</div>
          {src ? <img className="qr-img" src={src} alt="QR nhận tiền" /> : <div className="qr-canvas" />}
          <div className="muted">VietQR · Vietcombank · {user.accountNoFull}</div>
          {amt > 0 && <div style={{ fontWeight: 800, marginTop: 6, color: '#0e7a35' }}>{formatVND(amt)} VND</div>}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 10, fontWeight: 700 }}>
            {user.accountNoFull}
            <button className="icon-btn" onClick={copy}><IconCopy color="#1a9c4a" /></button>
          </div>
        </div>
        <div className="card" style={{ marginTop: 14 }}>
          <div className="field">
            <label>Số tiền nhận (tuỳ chọn)</label>
            <input
              inputMode="numeric"
              value={amount}
              onChange={(e) => {
                const n = Number(String(e.target.value).replace(/\D/g, '')) || 0
                setAmount(n ? formatVND(n) : '')
              }}
              placeholder="0"
            />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Nội dung</label>
            <input value={memo} onChange={(e) => setMemo(e.target.value)} maxLength={25} />
          </div>
        </div>
        <button className="btn-primary" style={{ marginTop: 16 }} onClick={copy}>Chia sẻ số tài khoản</button>
        <button className="btn-ghost" style={{ marginTop: 10 }} onClick={() => nav('/scan')}>Mở camera quét QR</button>
      </div>
    </>
  )
}
