import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { amountToWords, formatVND, telcos, topupAmounts } from '../data.js'
import { IconBack } from '../icons.jsx'
import { useStore } from '../store.jsx'

export default function Topup() {
  const nav = useNavigate()
  const { source } = useStore()
  const [phone, setPhone] = useState('')
  const [telco, setTelco] = useState('viettel')
  const [amt, setAmt] = useState(50000)
  const telcoName = telcos.find((t) => t.id === telco)?.name

  function submit() {
    nav('/confirm', {
      state: {
        kind: 'topup',
        title: 'Nạp tiền điện thoại',
        amount: amt,
        successTitle: 'Giao dịch thành công!',
        words: amountToWords(amt),
        rows: [
          { label: 'Hình thức nạp', value: 'Nạp tiền điện thoại' },
          { label: 'Tài khoản nguồn', value: source.number },
          { label: 'Số điện thoại', value: phone },
          { label: 'Nhà mạng', value: telcoName },
          { label: 'Mệnh giá', value: `${formatVND(amt)} VND` },
          { label: 'Phi nạp tiền', value: 'Miễn phí' }
        ],
        action: { amount: amt, phone, telco: telcoName }
      }
    })
  }

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Nạp tiền điện thoại</h1>
      </div>
      <div className="scroll" style={{ padding: 16 }}>
        <div className="card" style={{ marginBottom: 14 }}>
          <div className="field">
            <label>Số điện thoại</label>
            <input inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Nhà mạng</label>
            <div className="chip-row">
              {telcos.map((t) => (
                <button key={t.id} className={`chip ${telco === t.id ? 'on' : ''}`} onClick={() => setTelco(t.id)}>{t.name}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="card" style={{ marginBottom: 16 }}>
          <label className="muted" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Mệnh giá</label>
          <div className="chip-row">
            {topupAmounts.map((a) => (
              <button key={a} className={`chip ${amt === a ? 'on' : ''}`} onClick={() => setAmt(a)}>
                {formatVND(a)}đ
              </button>
            ))}
          </div>
        </div>
        <button className="btn-primary" disabled={phone.length < 9 || amt > source.balance} onClick={submit}>Nạp tiền {formatVND(amt)} VND</button>
      </div>
    </>
  )
}
