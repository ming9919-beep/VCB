import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { branches } from '../data.js'
import { IconBack, IconHomeCircle, IconPin, IconSearch } from '../icons.jsx'

export default function Branches() {
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return branches
      .filter((b) => filter === 'all' || b.type === filter)
      .filter((b) => !t || (b.name + b.address + b.services.join('')).toLowerCase().includes(t))
      .sort((a, b) => a.distance - b.distance)
  }, [q, filter])

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Chi nhánh & ATM</h1>
        <button className="tf-home" onClick={() => nav('/home')} aria-label="home">
          <IconHomeCircle />
        </button>
      </div>

      <div className="map-placeholder">
        <svg viewBox="0 0 390 160" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
          <rect width="390" height="160" fill="#e8f0ec" />
          <path d="M0 50 L390 80" stroke="#d4e0d8" strokeWidth="8" fill="none" />
          <path d="M0 110 L390 95" stroke="#d4e0d8" strokeWidth="6" fill="none" />
          <path d="M120 0 L140 160" stroke="#d4e0d8" strokeWidth="5" fill="none" />
          <path d="M250 0 L270 160" stroke="#d4e0d8" strokeWidth="5" fill="none" />
          <rect x="0" y="110" width="390" height="50" fill="#dde8e2" opacity="0.6" />
          {filtered.slice(0, 4).map((b, i) => {
            const x = 60 + i * 90
            const y = b.type === 'branch' ? 60 : 90
            const c = b.type === 'branch' ? '#1a9c4a' : '#2196f3'
            return (
              <g key={b.id}>
                <path d={`M${x} ${y} C${x - 8} ${y - 16}, ${x + 8} ${y - 16}, ${x} ${y}`} fill={c} />
                <circle cx={x} cy={y - 8} r="5" fill={c} />
                <circle cx={x} cy={y - 8} r="2" fill="#fff" />
              </g>
            )
          })}
        </svg>
        <div className="map-overlay-info">
          <span>{filtered.length} điểm</span>
        </div>
      </div>

      <div className="scroll" style={{ padding: '0 16px 110px' }}>
        <div className="search-bar" style={{ marginTop: 12 }}>
          <IconSearch />
          <input placeholder="Tìm chi nhánh, ATM, địa chỉ..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>

        <div className="chip-row" style={{ marginBottom: 14 }}>
          <button className={`chip ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>Tất cả</button>
          <button className={`chip ${filter === 'branch' ? 'on' : ''}`} onClick={() => setFilter('branch')}>Chi nhánh</button>
          <button className={`chip ${filter === 'atm' ? 'on' : ''}`} onClick={() => setFilter('atm')}>ATM</button>
        </div>

        <div className="list">
          {filtered.map((b) => (
            <button key={b.id} className="list-item branch-item" onClick={() => setSelected(b)}>
              <div className="branch-ico" style={{ background: b.type === 'branch' ? '#e8f7ee' : '#e3f2fd', color: b.type === 'branch' ? '#1a9c4a' : '#2196f3' }}>
                <IconPin size={20} color={b.type === 'branch' ? '#1a9c4a' : '#2196f3'} />
              </div>
              <div className="li-body">
                <div className="li-title">{b.name}</div>
                <div className="li-sub">{b.address}</div>
                <div className="branch-tags">
                  <span className="branch-dist">{b.distance} km</span>
                  {b.open ? (
                    <span className="branch-open">Đang mở</span>
                  ) : (
                    <span className="branch-closed">Đã đóng</span>
                  )}
                </div>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="muted" style={{ textAlign: 'center', padding: 24 }}>Không tìm thấy chi nhánh/ATM nào</div>
          )}
        </div>
      </div>

      {selected && (
        <div className="modal-bg" onClick={() => setSelected(null)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="handle" />
            <div className="branch-detail-head">
              <div className="branch-ico-lg" style={{ background: selected.type === 'branch' ? '#e8f7ee' : '#e3f2fd', color: selected.type === 'branch' ? '#1a9c4a' : '#2196f3' }}>
                <IconPin size={28} color={selected.type === 'branch' ? '#1a9c4a' : '#2196f3'} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="li-title" style={{ fontSize: 17 }}>{selected.name}</div>
                <div className="li-sub">{selected.type === 'branch' ? 'Chi nhánh' : 'Máy ATM'}</div>
              </div>
            </div>
            <div className="kv"><span>Địa chỉ</span><span style={{ maxWidth: 240, textAlign: 'right' }}>{selected.address}</span></div>
            <div className="kv"><span>Giờ mở cửa</span><span>{selected.hours}</span></div>
            {selected.phone && <div className="kv"><span>Điện thoại</span><span>{selected.phone}</span></div>}
            <div className="kv"><span>Khoảng cách</span><span>{selected.distance} km</span></div>
            <div className="kv" style={{ border: 0 }}>
              <span>Dịch vụ</span>
              <span style={{ maxWidth: 240, textAlign: 'right' }}>{selected.services.join(', ')}</span>
            </div>
            <button className="btn-primary" style={{ marginTop: 14 }} onClick={() => setSelected(null)}>Đóng</button>
          </div>
        </div>
      )}
    </>
  )
}
