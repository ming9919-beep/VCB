import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { amountToWords, bills, formatVND } from '../data.js'
import { IconBack } from '../icons.jsx'
import { useStore } from '../store.jsx'

export default function Bills() {
  const nav = useNavigate()
  const { source } = useStore()
  const [picked, setPicked] = useState(null)
  const [code, setCode] = useState('')
  const [amount, setAmount] = useState('365000')
  const amt = Number(String(amount).replace(/\D/g, '')) || 0

  function submit() {
    nav('/confirm', {
      state: {
        kind: 'bill',
        title: 'Thanh toán trong nước',
        amount: amt,
        successTitle: 'Giao dịch thành công!',
        words: amountToWords(amt),
        rows: [
          { label: 'Hình thức thanh toán', value: 'Thanh toán hoá đơn trong nước' },
          { label: 'Tài khoản nguồn', value: source.number },
          { label: 'Dịch vụ', value: picked.name },
          { label: 'Nhà cung cấp', value: picked.provider },
          { label: 'Mã khách hàng', value: code },
          { label: 'Phi thanh toán', value: 'Miễn phí' }
        ],
        action: { amount: amt, name: picked.name, provider: picked.provider, code }
      }
    })
  }

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => (picked ? setPicked(null) : nav(-1))}><IconBack /></button>
        <h1>{picked ? picked.name : 'Thanh toán trong nước'}</h1>
      </div>
      <div className="scroll" style={{ padding: 16 }}>
        {!picked && (
          <div className="list">
            {bills.map((b) => (
              <button key={b.id} className="list-item" onClick={() => setPicked(b)}>
                <div className="avatar">{b.name[0]}</div>
                <div className="li-body">
                  <div className="li-title">{b.name}</div>
                  <div className="li-sub">{b.provider}</div>
                </div>
              </button>
            ))}
          </div>
        )}
        {picked && (
          <>
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="field">
                <label>Mã khách hàng</label>
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Nhập mã khách hàng" />
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Số tiền (VND)</label>
                <input inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} />
                {amt > 0 && <div className="muted" style={{ marginTop: 6 }}>{formatVND(amt)} VND</div>}
              </div>
            </div>
            <button className="btn-primary" disabled={!code || amt < 1000 || amt > source.balance} onClick={submit}>Thanh toán</button>
          </>
        )}
      </div>
    </>
  )
}
