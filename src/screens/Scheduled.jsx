import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatVND, scheduledTx as seedScheduled } from '../data.js'
import { IconBack, IconClock2, IconHomeCircle, IconPause, IconPlay, IconRepeat, IconTrash } from '../icons.jsx'

export default function Scheduled() {
  const nav = useNavigate()
  const [items, setItems] = useState(seedScheduled)
  const [confirmDel, setConfirmDel] = useState(null)

  function toggle(id) {
    setItems((prev) => prev.map((s) =>
      s.id === id ? { ...s, status: s.status === 'active' ? 'paused' : 'active' } : s
    ))
  }

  function remove(id) {
    setItems((prev) => prev.filter((s) => s.id !== id))
    setConfirmDel(null)
  }

  const active = items.filter((s) => s.status === 'active').length
  const paused = items.filter((s) => s.status === 'paused').length
  const totalAmount = items.filter((s) => s.status === 'active').reduce((sum, s) => sum + s.amount, 0)

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Giao dịch định kỳ</h1>
        <button className="tf-home" onClick={() => nav('/home')} aria-label="home">
          <IconHomeCircle />
        </button>
      </div>

      <div className="scroll" style={{ padding: '0 16px 110px' }}>
        <div className="sch-stats">
          <div className="ben-stat">
            <div className="ben-stat-num">{active}</div>
            <div className="ben-stat-lbl">Đang hoạt động</div>
          </div>
          <div className="ben-stat">
            <div className="ben-stat-num">{paused}</div>
            <div className="ben-stat-lbl">Tạm dừng</div>
          </div>
          <div className="ben-stat">
            <div className="ben-stat-num" style={{ fontSize: 16 }}>{formatVND(totalAmount)}</div>
            <div className="ben-stat-lbl">Tổng / tháng</div>
          </div>
        </div>

        <div className="list">
          {items.map((s) => (
            <div key={s.id} className="sch-card">
              <div className="sch-card-head">
                <div className="sch-ico" style={{
                  background: s.status === 'active' ? '#e8f7ee' : '#f5f5f5',
                  color: s.status === 'active' ? '#1a9c4a' : '#999'
                }}>
                  <IconRepeat size={24} color={s.status === 'active' ? '#1a9c4a' : '#999'} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="li-title">{s.title}</div>
                  <div className="li-sub">{s.frequency} · {s.count} lần đã thực hiện</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{formatVND(s.amount)}</div>
                  <div className="muted" style={{ fontSize: 11 }}>VND</div>
                </div>
              </div>

              <div className="sch-info">
                <div className="sch-info-row">
                  <IconClock2 size={14} color="#9aa3a0" />
                  <span>Lần tiếp theo</span>
                  <strong>{s.nextDate}</strong>
                </div>
                {s.name && (
                  <div className="sch-info-row">
                    <span>Người nhận</span>
                    <strong>{s.name}</strong>
                  </div>
                )}
                {s.account && (
                  <div className="sch-info-row">
                    <span>Tài khoản</span>
                    <strong>{s.account}</strong>
                  </div>
                )}
                {s.memo && (
                  <div className="sch-info-row">
                    <span>Nội dung</span>
                    <strong style={{ fontWeight: 500 }}>{s.memo}</strong>
                  </div>
                )}
              </div>

              <div className="sch-actions">
                <button
                  className="sch-act-btn"
                  onClick={() => toggle(s.id)}
                  style={s.status === 'active'
                    ? { background: '#fff3e0', color: '#e65100', borderColor: '#ffe0b2' }
                    : { background: '#e8f7ee', color: '#1a9c4a', borderColor: '#cfe8d6' }}
                >
                  {s.status === 'active' ? <><IconPause color="#e65100" /> Tạm dừng</> : <><IconPlay color="#1a9c4a" /> Kích hoạt</>}
                </button>
                <button
                  className="sch-act-btn"
                  style={{ background: '#fff', color: '#c62828', borderColor: '#ffcdd2' }}
                  onClick={() => setConfirmDel(s)}
                >
                  <IconTrash size={16} color="#c62828" /> Xoá
                </button>
              </div>

              {s.status === 'paused' && (
                <div className="sch-paused-badge">Đã tạm dừng — sẽ không thực hiện vào ngày đã lên lịch</div>
              )}
            </div>
          ))}
          {items.length === 0 && (
            <div className="muted" style={{ textAlign: 'center', padding: 32 }}>
              Chưa có giao dịch định kỳ nào.
              <br />
              <button className="btn-ghost" style={{ marginTop: 12, width: 'auto', display: 'inline-block' }} onClick={() => nav('/transfer')}>
                Tạo giao dịch mới
              </button>
            </div>
          )}
        </div>
      </div>

      {confirmDel && (
        <div className="modal-bg" onClick={() => setConfirmDel(null)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="handle" />
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 6 }}>Xoá giao dịch định kỳ?</div>
              <div className="muted">{confirmDel.title} — {formatVND(confirmDel.amount)} VND</div>
              <div className="muted" style={{ marginTop: 4, fontSize: 12 }}>Hành động này không thể hoàn tác.</div>
            </div>
            <button className="btn-primary" style={{ background: 'linear-gradient(180deg, #e53935, #c62828)' }} onClick={() => remove(confirmDel.id)}>Xoá</button>
            <button className="btn-ghost" style={{ marginTop: 8 }} onClick={() => setConfirmDel(null)}>Huỷ</button>
          </div>
        </div>
      )}
    </>
  )
}
