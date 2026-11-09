import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { amountToWords, formatVND, savingsTerms } from '../data.js'
import { IconBack } from '../icons.jsx'
import { useStore } from '../store.jsx'

export default function Savings() {
  const nav = useNavigate()
  const { source } = useStore()
  const [amount, setAmount] = useState('10000000')
  const [term, setTerm] = useState(12)
  const amt = Number(String(amount).replace(/\D/g, '')) || 0
  const selected = savingsTerms.find((t) => t.months === term)
  const interest = selected ? Math.round(amt * (selected.rate / 100) * (term / 12)) : 0

  function submit() {
    nav('/confirm', {
      state: {
        kind: 'savings',
        title: 'Mở tiết kiệm',
        amount: amt,
        successTitle: 'Giao dịch thành công!',
        words: amountToWords(amt),
        rows: [
          { label: 'Hình thức', value: 'Mở tiết kiệm online' },
          { label: 'Tài khoản nguồn', value: source.number },
          { label: 'Kỳ hạn', value: `${term} tháng` },
          { label: 'Lãi suất', value: `${selected.rate}%/năm` },
          { label: 'Lãi dự kiến', value: `${formatVND(interest)} VND` },
          { label: 'Phi chuyển tiền', value: 'Miễn phí' }
        ],
        action: { amount: amt, term, rate: selected.rate, interest }
      }
    })
  }

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Mở tiết kiệm</h1>
      </div>
      <div className="scroll" style={{ padding: 16 }}>
        <div className="card" style={{ marginBottom: 14 }}>
          <div className="field">
            <label>Số tiền gửi (VND)</label>
            <input inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} />
            {amt > 0 && <div className="muted" style={{ marginTop: 6 }}>{formatVND(amt)} VND</div>}
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Kỳ hạn</label>
            <div className="chip-row">
              {savingsTerms.map((t) => (
                <button key={t.months} className={`chip ${term === t.months ? 'on' : ''}`} onClick={() => setTerm(t.months)}>
                  {t.months} tháng · {t.rate}%
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="kv"><span>Lãi suất</span><span>{selected?.rate}%/năm</span></div>
          <div className="kv"><span>Lãi dự kiến</span><span>{formatVND(interest)} VND</span></div>
          <div className="kv" style={{ border: 0 }}><span>Tài khoản nguồn</span><span>{source.masked || source.number}</span></div>
        </div>
        <button className="btn-primary" disabled={amt < 100000 || amt > source.balance} onClick={submit}>Xác nhận mở tiết kiệm</button>
      </div>
    </>
  )
}
