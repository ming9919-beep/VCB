import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { amountToWords, formatFullDate, formatVND } from '../data.js'
import { IconCheck, IconHomeCircle, IconImage, IconReceipt, IconShare } from '../icons.jsx'
import { TxRows } from '../TxRows.jsx'
import { useStore } from '../store.jsx'
import { resolveBank } from '../banks.js'

/** Dựng danh sách dòng chi tiết theo loại giao dịch */
function buildRows(t) {
  const rows = []
  const e = t.extra || {}
  const resolvedBankFull = resolveBank(e.bank || e.bankFull)?.full
  const bankFull = resolvedBankFull && resolvedBankFull !== e.bank
    ? resolvedBankFull
    : e.bankFull && e.bankFull !== e.bank
      ? `${e.bank} - ${e.bankFull}`
      : e.bankFull || e.bank

  if (t.type === 'out' && (e.name || e.account)) {
    rows.push({ label: 'Tài khoản nhận', value: formatAcc(e.account) })
    rows.push({ label: 'Tên người nhận', value: e.name, tone: 'danger' })
    if (e.bank) {
      rows.push({
        label: 'Ngân hàng nhận',
        value: e.bank,
        sub: bankFull,
        logo: e.bankLogo || ''
      })
    }
    if (e.memo) rows.push({ label: 'Nội dung', value: e.memo })
    rows.push({ label: 'Phí chuyển tiền', value: 'Miễn phí' })
    rows.push({ label: 'Hình thức chuyển', value: t.channel === 'QR Pay' ? 'Thanh toán QR' : 'Chuyển tiền trong Vietcombank' })
  } else if (t.channel === 'Thanh toán') {
    rows.push({ label: 'Dịch vụ', value: e.name || t.title })
    if (e.provider) rows.push({ label: 'Nhà cung cấp', value: e.provider })
    if (e.code) rows.push({ label: 'Mã khách hàng', value: e.code })
    rows.push({ label: 'Phí thanh toán', value: 'Miễn phí' })
    rows.push({ label: 'Hình thức thanh toán', value: 'Thanh toán hoá đơn trong nước' })
  } else if (t.channel === 'Nạp tiền') {
    rows.push({ label: 'Số điện thoại', value: e.telco || t.title.replace(/^Nap tien dien thoai\s*/i, '') })
    rows.push({ label: 'Mệnh giá', value: `${formatVND(Math.abs(t.amount))} VND` })
    rows.push({ label: 'Phí nạp tiền', value: 'Miễn phí' })
    rows.push({ label: 'Hình thức nạp', value: 'Nạp tiền điện thoại' })
  } else if (t.channel === 'Tiết kiệm') {
    rows.push({ label: 'Sản phẩm', value: e.name || t.title })
    if (e.term) rows.push({ label: 'Kỳ hạn', value: `${e.term} tháng` })
    if (e.rate) rows.push({ label: 'Lãi suất', value: `${e.rate}%/năm` })
    if (e.interest) rows.push({ label: 'Lãi dự kiến', value: `${formatVND(e.interest)} VND` })
    rows.push({ label: 'Phí chuyển tiền', value: 'Miễn phí' })
    rows.push({ label: 'Hình thức', value: 'Mở tiết kiệm online' })
  } else if (t.type === 'in') {
    rows.push({ label: 'Tài khoản nhận', value: e.source || '1234567824333' })
    rows.push({ label: 'Nội dung', value: e.memo || t.title })
    rows.push({ label: 'Hình thức nhận', value: t.channel || 'Chuyển khoản' })
  } else {
    rows.push({ label: 'Nội dung', value: t.title })
    rows.push({ label: 'Kênh', value: t.channel })
  }

  rows.push({ label: 'Mã giao dịch', value: t.ref })
  return rows
}

function formatAcc(v) {
  const d = String(v || '').replace(/\D/g, '')
  if (d.length <= 3) return d
  if (d.length <= 8) return `${d.slice(0, 3)} ${d.slice(3)}`
  return `${d.slice(0, 3)} ${d.slice(3, 8)} ${d.slice(8)}`
}

export default function TransactionDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const { transactions, addAlert } = useStore()
  const [shared, setShared] = useState(null)

  const t = transactions.find((x) => x.id === id)

  const rows = useMemo(() => (t ? buildRows(t) : []), [t])
  const [saveTpl, setSaveTpl] = useState(() => {
    try {
      return t
        ? JSON.parse(localStorage.getItem('vcb-transfer-templates') || '[]').some((item) => item.ref === t.ref)
        : false
    } catch {
      return false
    }
  })

  if (!t) {
    return (
      <>
        <div className="page-head">
          <button className="back" onClick={() => nav(-1)}><IconBackFallback /></button>
          <h1>Chi tiết giao dịch</h1>
        </div>
        <div className="scroll" style={{ padding: 16 }}>Không tìm thấy giao dịch</div>
      </>
    )
  }

  const amount = Math.abs(t.amount)
  const isIn = t.type === 'in'
  const timeText = t.timeFull || t.time || formatFullDate()

  function toggleTemplate() {
    const next = !saveTpl
    try {
      const templates = JSON.parse(localStorage.getItem('vcb-transfer-templates') || '[]')
      const updated = next
        ? [{ ref: t.ref, title: t.title, amount, currency: 'VND', timeText, rows, savedAt: new Date().toISOString() }, ...templates.filter((item) => item.ref !== t.ref)]
        : templates.filter((item) => item.ref !== t.ref)
      localStorage.setItem('vcb-transfer-templates', JSON.stringify(updated))
      setSaveTpl(next)
      setShared(next ? 'Đã lưu mẫu giao dịch' : 'Đã xoá mẫu giao dịch')
    } catch {
      setShared('Không thể lưu mẫu. Vui lòng kiểm tra bộ nhớ thiết bị.')
    }
    setTimeout(() => setShared(null), 2400)
  }

  function onAction(kind) {
    setShared(kind)
    addAlert(
      kind === 'share' ? 'Chia sẻ' : kind === 'image' ? 'Lưu ảnh' : 'Chia hoá đơn',
      kind === 'invoice' ? 'Hoá đơn đã sẵn sàng để chia sẻ' : 'Đã gửi ảnh chụp màn hình'
    )
    setTimeout(() => setShared(null), 1600)
  }

  return (
    <div className="rs-page">
      <svg className="rs-pattern" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id="tdg" cx="50%" cy="18%" r="70%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="800" fill="url(#tdg)" />
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
          <div className="rs-title">{t.status || 'Giao dịch thành công!'}</div>
          <div className="rs-amount">
            {isIn ? '+' : '-'}{formatVND(amount)} <span className="rs-ccy">{t.currency || 'VND'}</span>
          </div>
          <div className="rs-time">{timeText}</div>
        </div>

        <div className="receipt-card" aria-label="Chi tiết giao dịch">
          <TxRows rows={rows} compact />
        </div>

        <div className="rs-tpl">
          <span>Lưu mẫu chuyển tiền</span>
          <button
            className={`sw ${saveTpl ? 'on' : ''}`}
            onClick={toggleTemplate}
            role="switch"
            aria-checked={saveTpl}
            aria-label="Lưu mẫu chuyển tiền"
          />
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

      {shared && (
        <div className="toast" role="status" aria-live="polite">
          {shared === 'share' ? 'Đã gửi yêu cầu chia sẻ' : shared === 'image' ? 'Đã lưu ảnh chụp màn hình' : shared === 'invoice' ? 'Hoá đơn đã sẵn sàng' : shared}
        </div>
      )}
    </div>
  )
}

function IconBackFallback() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <path d="M15 5l-7 7 7 7" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
