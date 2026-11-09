import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconBack } from '../icons.jsx'
import { useStore } from '../store.jsx'

export default function Notifications() {
  const nav = useNavigate()
  const { alerts, markAlertsRead } = useStore()

  useEffect(() => {
    const t = setTimeout(markAlertsRead, 600)
    return () => clearTimeout(t)
  }, [markAlertsRead])

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Thông báo</h1>
      </div>
      <div className="scroll" style={{ padding: 16 }}>
        <div className="list">
          {alerts.map((n) => (
            <div key={n.id} className="list-item" style={{ cursor: 'default' }}>
              <div className={`avatar ${n.unread ? '' : ''}`} style={n.unread ? { background: '#1a9c4a', color: '#fff' } : undefined}>
                {n.unread ? '!' : 'i'}
              </div>
              <div className="li-body">
                <div className="li-title">{n.title}</div>
                <div className="li-sub">{n.body}</div>
                <div className="muted" style={{ marginTop: 4 }}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
