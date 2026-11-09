import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { amountToWords, formatVND } from '../data.js'
import { IconBack } from '../icons.jsx'
import { useStore } from '../store.jsx'

export default function IntlTransfer() {
  const nav = useNavigate()
  const { source } = useStore()
  const [name, setName] = useState('')
  const [swift, setSwift] = useState('')
  const [iban, setIban] = useState('')
  const [amount, setAmount] = useState('')
  const [ccy, setCcy] = useState('USD')
  const amt = Number(String(amount).replace(/\D/g, '')) || 0

  function submit() {
    nav('/confirm', {
      state: {
        kind: 'intl',
        title: 'Chuyển tiền quốc tế',
        amount: amt,
        currency: ccy,
        successTitle: 'Giao dịch thành công!',
        words: amountToWords(amt),
        rows: [
          { label: 'Hình thức chuyển', value: 'Chuyển tiền quốc tế' },
          { label: 'Tài khoản nguồn', value: source.number },
          { label: 'Tài khoản nhận', value: iban },
          { label: 'Tên người nhận', value: name, tone: 'danger' },
          { label: 'Ngân hàng nhận', value: swift, sub: 'SWIFT / BIC' },
          { label: 'Loại tiền', value: ccy },
          { label: 'Phi chuyển tiền', value: 'Miễn phí' }
        ],
        action: {
          amount: amt,
          name,
          bank: swift,
          account: iban,
          memo: `SWIFT ${swift}`,
          title: `Chuyen tien quoc te den ${name}`,
          channel: 'Chuyển tiền quốc tế'
        }
      }
    })
  }

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Chuyển tiền quốc tế</h1>
      </div>
      <div className="scroll" style={{ padding: 16 }}>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="field">
            <label>Tên người nhận</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="NGUYEN VAN B" />
          </div>
          <div className="field">
            <label>Mã SWIFT</label>
            <input value={swift} onChange={(e) => setSwift(e.target.value.toUpperCase())} placeholder="BFTVVNVX" />
          </div>
          <div className="field">
            <label>IBAN / Số tài khoản</label>
            <input value={iban} onChange={(e) => setIban(e.target.value)} />
          </div>
          <div className="field">
            <label>Loại tiền</label>
            <select value={ccy} onChange={(e) => setCcy(e.target.value)}>
              <option>USD</option>
              <option>EUR</option>
              <option>JPY</option>
              <option>AUD</option>
            </select>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Số tiền</label>
            <input inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} />
            {amt > 0 && <div className="muted" style={{ marginTop: 6 }}>{formatVND(amt)} {ccy}</div>}
          </div>
        </div>
        <button className="btn-primary" disabled={!name || !swift || !iban || amt < 1} onClick={submit}>Gửi lệnh</button>
      </div>
    </>
  )
}
