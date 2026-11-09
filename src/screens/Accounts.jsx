import { useNavigate } from 'react-router-dom'
import { formatMoney } from '../data.js'
import { IconBack, IconEye, IconEyeOff } from '../icons.jsx'
import { useStore } from '../store.jsx'

export default function Accounts() {
  const nav = useNavigate()
  const { accounts, hideBalance, setHideBalance, setSourceId } = useStore()
  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Danh sách tài khoản</h1>
        <button className="icon-btn" onClick={() => setHideBalance(!hideBalance)} style={{ color: '#333' }}>
          {hideBalance ? <IconEyeOff /> : <IconEye />}
        </button>
      </div>
      <div className="scroll" style={{ padding: 16 }}>
        <div className="list">
          {accounts.map((a) => (
            <button
              key={a.id}
              className="list-item"
              onClick={() => { setSourceId(a.id); nav('/transfer') }}
            >
              <div className="avatar">{a.currency[0]}</div>
              <div className="li-body">
                <div className="li-title">{a.name} {a.primary ? '· Chính' : ''}</div>
                <div className="li-sub">{a.number}{a.rate ? ` · ${a.rate}` : ''}</div>
              </div>
              <div style={{ fontWeight: 800, fontSize: 13.5, textAlign: 'right' }}>
                {formatMoney(a.balance, a.currency, hideBalance)}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
