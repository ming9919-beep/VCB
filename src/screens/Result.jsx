import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatFullDate, formatVND } from '../data.js'
import { IconCheck, IconHomeCircle, IconReceipt, IconShare, IconImage } from '../icons.jsx'
import { TxRows } from '../TxRows.jsx'
import { useStore } from '../store.jsx'

export default function Result() {
  const nav = useNavigate()
  const { state } = useLocation()
  const { addAlert } = useStore()
  const title = state?.title || 'Giao dịch thành công'
  const amount = Number(state?.amount) || 0
  const currency = state?.currency || 'VND'
  const rows = state?.rows || []
  const ref = state?.ref || `FT${Date.now().toString().slice(-10)}`
  const timeText = state?.timeText || formatFullDate()
  const receiptRows = rows.map((row) => row)
  const transferLike = receiptRows.some((row) => row.label === 'Tài khoản nhận')
  const amountText = `${transferLike ? '-' : ''}${formatVND(amount)} ${currency}`
  const [saveTpl, setSaveTpl] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vcb-transfer-templates') || '[]').some((item) => item.ref === ref) } catch { return false }
  })
  const [shared, setShared] = useState(null)

  const visibleRows = transferLike
    ? [
        ...receiptRows.filter((row) => !['Tài khoản nguồn', 'Hình thức chuyển'].includes(row.label) && row.label !== 'Phí chuyển tiền' && row.label !== 'Phi chuyển tiền'),
        ...receiptRows.filter((row) => row.label === 'Phí chuyển tiền' || row.label === 'Phi chuyển tiền'),
        ...receiptRows.filter((row) => row.label === 'Hình thức chuyển')
      ]
    : receiptRows
  const finalRows = [
    ...visibleRows,
    ...(ref ? [{ label: 'Mã giao dịch', value: ref }] : [])
  ]

  const receiptText = useMemo(() => [
    title,
    amount > 0 ? amountText : '',
    timeText,
    ...finalRows.map(({ label, value }) => `${label}: ${value ?? ''}`)
  ].filter(Boolean).join('\n'), [title, amount, amountText, timeText, finalRows])

  function toggleTemplate() {
    const next = !saveTpl
    try {
      const templates = JSON.parse(localStorage.getItem('vcb-transfer-templates') || '[]')
      const updated = next
        ? [{ ref, title, amount, currency, timeText, rows, savedAt: new Date().toISOString() }, ...templates.filter((item) => item.ref !== ref)]
        : templates.filter((item) => item.ref !== ref)
      localStorage.setItem('vcb-transfer-templates', JSON.stringify(updated))
      setSaveTpl(next)
      setShared(next ? '已保存到交易明细模板' : '已从交易明细模板移除')
      setTimeout(() => setShared(null), 2400)
    } catch {
      setShared('无法保存模板，请检查设备存储设置')
    }
  }

  async function onAction(kind) {
    try {
      if (kind === 'share' && navigator.share) {
        await navigator.share({ title: 'VCB Digibank · Biên lai giao dịch', text: receiptText })
        setShared('Đã mở bảng chia sẻ')
      } else if (kind === 'share' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(receiptText)
        setShared('Đã sao chép nội dung biên lai')
      } else if (kind === 'image') {
        const canvas = document.createElement('canvas')
        canvas.width = 1000
        canvas.height = 1240
        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('Không thể tạo ảnh biên lai')
        ctx.fillStyle = '#f5faf6'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#0d5630'
        ctx.font = 'bold 44px Arial'
        ctx.fillText('VCB Digibank', 64, 92)
        ctx.fillStyle = '#1a9c4a'
        ctx.beginPath(); ctx.arc(500, 210, 48, 0, Math.PI * 2); ctx.fill()
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 12; ctx.lineCap = 'round'
        ctx.beginPath(); ctx.moveTo(478, 210); ctx.lineTo(493, 226); ctx.lineTo(524, 190); ctx.stroke()
        ctx.fillStyle = '#10281a'; ctx.textAlign = 'center'; ctx.font = 'bold 34px Arial'
        ctx.fillText(title, 500, 310)
        if (amount > 0) {
          ctx.fillStyle = '#e53935'; ctx.font = 'bold 52px Arial'
          ctx.fillText(amountText, 500, 390)
        }
        ctx.textAlign = 'left'; ctx.fillStyle = '#29352e'; ctx.font = '25px Arial'
        let y = 480
        for (const row of finalRows) {
          const label = String(row.label ?? '')
          const value = String(row.value ?? '')
          ctx.fillStyle = '#707873'; ctx.fillText(label, 64, y)
          ctx.fillStyle = '#202720'; ctx.textAlign = 'right'
          ctx.fillText(value.slice(0, 42), 936, y)
          ctx.textAlign = 'left'; y += 82
          ctx.strokeStyle = '#e2e9e4'; ctx.lineWidth = 1
          ctx.beginPath(); ctx.moveTo(64, y - 34); ctx.lineTo(936, y - 34); ctx.stroke()
        }
        ctx.fillStyle = '#737d76'; ctx.font = '21px Arial'; ctx.textAlign = 'center'
        ctx.fillText(timeText, 500, 1150)
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
        if (!blob) throw new Error('Không thể lưu ảnh biên lai')
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `VCB-bien-lai-${ref}.png`
        link.click()
        setTimeout(() => URL.revokeObjectURL(link.href), 1000)
        setShared('Đã lưu ảnh biên lai')
      } else {
        if (navigator.share) await navigator.share({ title: 'Biên lai giao dịch', text: receiptText })
        else if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(receiptText)
        setShared('Biên lai đã sẵn sàng để chia sẻ')
      }
      addAlert(kind === 'share' ? 'Chia sẻ' : kind === 'image' ? 'Lưu ảnh' : 'Chia hoá đơn', 'Biên lai giao dịch đã sẵn sàng')
    } catch (error) {
      if (error?.name === 'AbortError') return
      setShared('Không thể hoàn tất thao tác. Hãy thử lại.')
    }
    setTimeout(() => setShared(null), 2400)
  }

  return (
    <div className="rs-page">
      <svg className="rs-pattern" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id="rsg" cx="50%" cy="18%" r="70%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="800" fill="url(#rsg)" />
        <g fill="none" stroke="#d9efdd" strokeWidth="1.1" opacity="0.75">
          <circle cx="200" cy="170" r="120" />
          <circle cx="200" cy="170" r="140" />
          <circle cx="200" cy="170" r="160" />
          <circle cx="200" cy="170" r="180" />
          <circle cx="200" cy="170" r="200" />
          <path d="M60 170h280M200 30v280M100 70l200 200M300 70L100 270M60 170l140-140M340 170L200 310M60 170l140 140M340 170L200 30" />
          <rect x="110" y="80" width="180" height="180" transform="rotate(45 200 170)" />
        </g>
        <g fill="none" stroke="#e2f4e6" strokeWidth="0.9" opacity="0.8">
          <circle cx="200" cy="520" r="150" />
          <circle cx="200" cy="520" r="175" />
          <circle cx="200" cy="520" r="200" />
          <path d="M40 520h320M200 360v320" />
        </g>
      </svg>

        <div className="rs-top">
          <div className="brand rs-brand"><span className="rs-brand-vcb">VCB</span>{' '}<span className="rs-brand-digi">Digibank</span></div>
          <button className="rs-home" onClick={() => nav('/home')} aria-label="home">
            <IconHomeCircle size={24} color="#1a9c4a" />
          </button>
        </div>

      <div className="scroll rs-scroll">
        <div className="rs-hero">
          <div className="rs-check">
            <IconCheck size={34} />
          </div>
          <div className="rs-title">{title}</div>
          {amount > 0 && (
            <div className="rs-amount">
              {transferLike ? '-' : ''}{formatVND(amount)} <span className="rs-ccy">{currency}</span>
            </div>
          )}
          <div className="rs-time">{timeText}</div>
        </div>

        <div className="receipt-card" aria-label="Chi tiết giao dịch">
          <TxRows rows={finalRows} compact />
        </div>

        <div className="rs-tpl">
          <span>Lưu mẫu chuyển tiền</span>
          <button className={`sw ${saveTpl ? 'on' : ''}`} onClick={toggleTemplate} role="switch" aria-checked={saveTpl} aria-label="Lưu mẫu chuyển tiền" />
        </div>

        <div className="rs-actions">
          <button className="rs-act" onClick={() => onAction('share')}>
            <span className="rs-act-ico"><IconShare size={22} color="#1a9c4a" /></span>
            <span className="rs-act-lbl">Chia sẻ</span>
          </button>
          <button className="rs-act" onClick={() => onAction('image')}>
            <span className="rs-act-ico"><IconImage size={22} color="#1a9c4a" /></span>
            <span className="rs-act-lbl">Lưu ảnh</span>
          </button>
          <button className="rs-act" onClick={() => onAction('invoice')}>
            <span className="rs-act-ico">
              <IconReceipt size={22} color="#1a9c4a" />
              <span className="rs-badge">Mới</span>
            </span>
            <span className="rs-act-lbl">Chia hoá đơn</span>
          </button>
        </div>
      </div>

      {shared && <div className="toast" role="status" aria-live="polite">{shared}</div>}
    </div>
  )
}
