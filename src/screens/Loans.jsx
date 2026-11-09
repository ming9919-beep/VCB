import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconArrowRight, IconBack, IconCalendar, IconChevron, IconChevronDown, IconLoan, IconPercent } from '../icons.jsx'
import { calcEMI, formatVND, loansData, loanSchedule } from '../data.js'

export default function Loans() {
  const nav = useNavigate()
  const [expanded, setExpanded] = useState(null)
  const [showCalc, setShowCalc] = useState(false)

  // EMI calculator state
  const [calcAmount, setCalcAmount] = useState(100000000)
  const [calcRate, setCalcRate] = useState(7.2)
  const [calcMonths, setCalcMonths] = useState(36)

  const emi = calcEMI(calcAmount, calcRate, calcMonths)
  const totalPay = emi * calcMonths
  const totalInterest = totalPay - calcAmount

  const totalRemaining = loansData.reduce((s, l) => s + l.remaining, 0)
  const totalMonthly = loansData.reduce((s, l) => s + l.monthlyPayment, 0)
  const totalBorrowed = loansData.reduce((s, l) => s + l.amount, 0)

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Khoản vay</h1>
      </div>
      <div className="scroll" style={{ paddingBottom: 24 }}>
        {/* Summary card */}
        <div className="card loan-summary-card">
          <div className="loan-summary-grid">
            <div className="loan-stat">
              <div className="loan-stat-label">Tổng dư nợ</div>
              <div className="loan-stat-val">{formatVND(totalRemaining)}</div>
              <div className="loan-stat-sub">VND</div>
            </div>
            <div className="loan-stat">
              <div className="loan-stat-label">Góp/tháng</div>
              <div className="loan-stat-val">{formatVND(totalMonthly)}</div>
              <div className="loan-stat-sub">VND</div>
            </div>
            <div className="loan-stat">
              <div className="loan-stat-label">Tổng giải ngân</div>
              <div className="loan-stat-val">{formatVND(totalBorrowed)}</div>
              <div className="loan-stat-sub">VND</div>
            </div>
            <div className="loan-stat">
              <div className="loan-stat-label">Số khoản vay</div>
              <div className="loan-stat-val">{loansData.length}</div>
              <div className="loan-stat-sub">Đang hoạt động</div>
            </div>
          </div>
        </div>

        {/* Loan list */}
        <div className="section" style={{ marginTop: 14 }}>
          <div className="section-head">
            <div className="section-title">Khoản vay đang hoạt động</div>
          </div>
          {loansData.map((loan) => {
            const isOpen = expanded === loan.id
            const progress = (loan.paidMonths / loan.termMonths) * 100
            return (
              <div key={loan.id} className="card loan-card" style={{ marginBottom: 12 }}>
                <button className="loan-head" onClick={() => setExpanded(isOpen ? null : loan.id)}>
                  <div className="loan-head-left">
                    <div className="loan-icon-wrap">
                      <IconLoan size={24} color="#1a9c4a" />
                    </div>
                    <div>
                      <div className="loan-name">{loan.name}</div>
                      <div className="loan-sub">{loan.type} · {loan.rate}%/năm · {loan.termMonths} tháng</div>
                    </div>
                  </div>
                  <IconChevronDown size={18} color="#9aa3a0" style={{ transform: isOpen ? 'rotate(180deg)' : '', transition: '0.2s' }} />
                </button>

                <div className="loan-progress-wrap">
                  <div className="loan-progress-bar">
                    <div className="loan-progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="loan-progress-text">
                    Đã trả {loan.paidMonths}/{loan.termMonths} kỳ
                  </div>
                </div>

                <div className="loan-amounts">
                  <div>
                    <div className="loan-amt-label">Dư nợ còn lại</div>
                    <div className="loan-amt-val">{formatVND(loan.remaining)} VND</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="loan-amt-label">Góp/tháng</div>
                    <div className="loan-amt-val">{formatVND(loan.monthlyPayment)} VND</div>
                  </div>
                </div>

                <div className="loan-next-due">
                  <IconCalendar size={14} color="#f44336" />
                  <span>Kỳ tiếp theo: <b>{loan.nextDueDate}</b></span>
                </div>

                {isOpen && (
                  <div className="loan-detail">
                    <div className="kv"><span>Số tiền vay</span><span>{formatVND(loan.amount)} VND</span></div>
                    <div className="kv"><span>Ngày giải ngân</span><span>{loan.disbursed}</span></div>
                    <div className="kv"><span>Lãi suất</span><span>{loan.rate}%/năm</span></div>
                    <div className="kv"><span>Kỳ hạn</span><span>{loan.termMonths} tháng</span></div>
                    <div className="kv"><span>Đã trả</span><span>{loan.paidMonths} kỳ</span></div>
                    <div className="kv" style={{ border: 0 }}><span>Tài khoản thu giải ngân</span><span>{loan.account}</span></div>

                    <div className="loan-schedule-title">Lịch trả nợ</div>
                    <div className="loan-schedule-table">
                      <div className="loan-schedule-header">
                        <span>Kỳ</span>
                        <span>Ngày</span>
                        <span style={{ textAlign: 'right' }}>Gốc</span>
                        <span style={{ textAlign: 'right' }}>Lãi</span>
                        <span style={{ textAlign: 'right' }}>Tổng</span>
                      </div>
                      {loanSchedule.map((s) => (
                        <div key={s.no} className={`loan-schedule-row ${s.status}`}>
                          <span>{s.no}</span>
                          <span>{s.dueDate}</span>
                          <span style={{ textAlign: 'right' }}>{formatVND(s.principal)}</span>
                          <span style={{ textAlign: 'right' }}>{formatVND(s.interest)}</span>
                          <span style={{ textAlign: 'right' }}><b>{formatVND(s.total)}</b></span>
                          <span className="loan-schedule-badge">
                            {s.status === 'paid' ? 'Đã trả' : s.status === 'due' ? 'Sắp đến' : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* EMI Calculator */}
        <div className="section" style={{ marginTop: 14 }}>
          <button className="emi-toggle" onClick={() => setShowCalc(!showCalc)}>
            <IconPercent size={20} color="#1a9c4a" />
            <span>Tính khoản góp (EMI)</span>
            <IconChevronDown size={18} color="#9aa3a0" style={{ marginLeft: 'auto', transform: showCalc ? 'rotate(180deg)' : '', transition: '0.2s' }} />
          </button>

          {showCalc && (
            <div className="card emi-card">
              <div className="emi-field">
                <label>Số tiền vay (VND)</label>
                <input
                  type="text"
                  value={calcAmount.toLocaleString('vi-VN')}
                  onChange={(e) => {
                    const v = Number(e.target.value.replace(/\D/g, ''))
                    if (v > 0) setCalcAmount(v)
                  }}
                />
                <div className="emi-quick">
                  {[50000000, 100000000, 200000000, 500000000].map((v) => (
                    <button key={v} className="emi-chip" onClick={() => setCalcAmount(v)}>
                      {formatVND(v)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="emi-field">
                <label>Lãi suất (%/năm)</label>
                <div className="emi-slider-row">
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.1"
                    value={calcRate}
                    onChange={(e) => setCalcRate(Number(e.target.value))}
                    className="emi-slider"
                  />
                  <span className="emi-slider-val">{calcRate.toFixed(1)}%</span>
                </div>
              </div>
              <div className="emi-field">
                <label>Kỳ hạn (tháng)</label>
                <div className="emi-term-row">
                  {[12, 24, 36, 48, 60].map((m) => (
                    <button
                      key={m}
                      className={`emi-term-btn ${calcMonths === m ? 'active' : ''}`}
                      onClick={() => setCalcMonths(m)}
                    >
                      {m}T
                    </button>
                  ))}
                </div>
              </div>

              <div className="emi-result">
                <div className="emi-result-main">
                  <div className="emi-result-label">Khoản góp hàng tháng</div>
                  <div className="emi-result-val">{formatVND(emi)} VND</div>
                </div>
                <div className="emi-result-grid">
                  <div>
                    <span>Tổng tiền lãi</span>
                    <b>{formatVND(totalInterest)} VND</b>
                  </div>
                  <div>
                    <span>Tổng phải trả</span>
                    <b>{formatVND(totalPay)} VND</b>
                  </div>
                </div>
              </div>

              <button className="btn-primary emi-cta" onClick={() => nav('/products')}>
                Đăng ký vay
                <IconArrowRight size={16} color="#fff" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
