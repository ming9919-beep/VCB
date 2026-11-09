import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconBack, IconCalendar, IconCertificate, IconCheck, IconChevron, IconRefresh } from '../icons.jsx'
import { certificates, formatVND } from '../data.js'

export default function Certificates() {
  const nav = useNavigate()
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? certificates
    : filter === 'active' ? certificates.filter(c => c.status === 'active')
    : certificates.filter(c => c.status === 'matured')

  const totalPrincipal = certificates.filter(c => c.status === 'active').reduce((s, c) => s + c.amount, 0)
  const totalInterest = certificates.filter(c => c.status === 'active').reduce((s, c) => s + c.interestEarned, 0)

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Sổ tiết kiệm</h1>
      </div>
      <div className="scroll" style={{ paddingBottom: 24 }}>
        {/* Summary */}
        <div className="card cert-summary">
          <div className="cert-summary-icon">
            <IconCertificate size={32} color="#fff" />
          </div>
          <div className="cert-summary-body">
            <div className="cert-summary-label">Tổng tiền gửi đang hoạt động</div>
            <div className="cert-summary-val">{formatVND(totalPrincipal)} VND</div>
            <div className="cert-summary-sub">
              Lãi đã thu: {formatVND(totalInterest)} VND
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="cert-filter-row">
          <button className={`cert-filter ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            Tất cả ({certificates.length})
          </button>
          <button className={`cert-filter ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>
            Đang gửi ({certificates.filter(c => c.status === 'active').length})
          </button>
          <button className={`cert-filter ${filter === 'matured' ? 'active' : ''}`} onClick={() => setFilter('matured')}>
            Đáo hạn ({certificates.filter(c => c.status === 'matured').length})
          </button>
        </div>

        {/* Certificate list */}
        <div className="cert-list">
          {filtered.map((cert) => (
            <div key={cert.id} className={`cert-card ${cert.status === 'matured' ? 'matured' : ''}`}>
              <div className="cert-card-top">
                <div className="cert-card-left">
                  <div className="cert-icon-box">
                    <IconCertificate size={22} color="#1a9c4a" />
                  </div>
                  <div>
                    <div className="cert-name">{cert.name}</div>
                    <div className="cert-code">Mã: {cert.code}</div>
                  </div>
                </div>
                <span className={`cert-status-badge ${cert.status}`}>
                  {cert.status === 'active' ? 'Đang gửi' : 'Đáo hạn'}
                </span>
              </div>

              <div className="cert-amount-row">
                <div>
                  <div className="cert-amt-label">Số tiền gửi</div>
                  <div className="cert-amt-val">{formatVND(cert.amount)} VND</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="cert-amt-label">Lãi suất</div>
                  <div className="cert-amt-val">{cert.rate}%/năm</div>
                </div>
              </div>

              <div className="cert-dates">
                <div className="cert-date-item">
                  <IconCalendar size={14} color="#9aa3a0" />
                  <span>Mở: {cert.openDate}</span>
                </div>
                <div className="cert-date-item">
                  <IconCalendar size={14} color={cert.status === 'active' ? '#1a9c4a' : '#f44336'} />
                  <span>{cert.status === 'active' ? 'Đáo hạn' : 'Đã đáo hạn'}: <b>{cert.maturityDate}</b></span>
                </div>
              </div>

              {cert.interestEarned > 0 && (
                <div className="cert-interest-row">
                  <span>Lãi đã tích lũy</span>
                  <span className="cert-interest-val">+{formatVND(cert.interestEarned)} VND</span>
                </div>
              )}

              {cert.status === 'active' && (
                <div className="cert-autorenew-row">
                  <span>Tự động gia hạn</span>
                  <span className={`cert-toggle ${cert.autoRenew ? 'on' : 'off'}`}>
                    {cert.autoRenew ? 'Bật' : 'Tắt'}
                  </span>
                </div>
              )}

              {cert.status === 'matured' && (
                <div className="cert-actions-row">
                  <button className="cert-action-btn withdraw" onClick={() => nav('/transfer')}>
                    Rút tiền
                  </button>
                  <button className="cert-action-btn renew" onClick={() => nav('/savings')}>
                    Tái gửi
                  </button>
                </div>
              )}

              <button className="cert-detail-btn" onClick={() => setSelected(selected === cert.id ? null : cert.id)}>
                {selected === cert.id ? 'Thu gọn' : 'Xem chi tiết'}
              </button>

              {selected === cert.id && (
                <div className="cert-detail-body">
                  <div className="kv"><span>Kỳ hạn</span><span>{cert.termMonths} tháng</span></div>
                  <div className="kv"><span>Lãi suất</span><span>{cert.rate}%/năm</span></div>
                  <div className="kv"><span>Tài khoản nguồn</span><span>{cert.account}</span></div>
                  <div className="kv" style={{ border: 0 }}>
                    <span>Tiền lãi dự kiến</span>
                    <span>{formatVND(Math.round(cert.amount * cert.rate / 100 * cert.termMonths / 12))} VND</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Open new */}
        <button className="btn-primary cert-open-new" onClick={() => nav('/savings')}>
          <IconCertificate size={20} color="#fff" />
          Mở sổ tiết kiệm mới
        </button>
      </div>
    </>
  )
}
