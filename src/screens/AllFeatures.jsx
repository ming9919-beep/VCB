import { useNavigate } from 'react-router-dom'
import { allFeatures } from '../data.js'
import { IconBack, IconChevron } from '../icons.jsx'
import { useStore } from '../store.jsx'

export default function AllFeatures() {
  const nav = useNavigate()
  const { favorites, setFavorites } = useStore()
  const groups = [...new Set(allFeatures.map((f) => f.group))]

  function toggle(id) {
    setFavorites((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 6) return prev
      return [...prev, id]
    })
  }

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Tất cả chức năng</h1>
      </div>
      <div className="scroll" style={{ padding: 16 }}>
        <div className="muted" style={{ marginBottom: 12 }}>Chọn tối đa 6 chức năng ưa thích trên trang chủ</div>
        {groups.map((g) => (
          <div key={g} style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ fontSize: 14, marginBottom: 8 }}>{g}</div>
            <div className="list">
              {allFeatures.filter((f) => f.group === g).map((f) => (
                <div key={f.id} className="list-item" style={{ cursor: 'default' }}>
                  <button className="li-body" style={{ background: 'none', border: 0, textAlign: 'left', cursor: 'pointer' }} onClick={() => nav(f.path)}>
                    <div className="li-title">{f.title}</div>
                  </button>
                  <button
                    className={`chip ${favorites.includes(f.id) ? 'on' : ''}`}
                    onClick={() => toggle(f.id)}
                    style={{ flexShrink: 0 }}
                  >
                    {favorites.includes(f.id) ? 'Đã ghim' : 'Ghim'}
                  </button>
                  <button className="icon-btn" onClick={() => nav(f.path)}><IconChevron color="#9aa3a0" /></button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
