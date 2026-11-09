import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconBack, IconSearch, IconTrash } from '../icons.jsx'
import { useStore } from '../store.jsx'

export default function Beneficiaries() {
  const nav = useNavigate()
  const { beneficiaries, knownPayees, addAlert } = useStore()
  const [q, setQ] = useState('')
  const [confirmDel, setConfirmDel] = useState(null)
  const [deleted, setDeleted] = useState([])

  const allBeneficiaries = useMemo(() => {
    const seen = new Set()
    const list = []
    for (const b of beneficiaries) {
      const key = `${b.account}-${b.bank}`
      if (!seen.has(key) && !deleted.includes(key)) {
        seen.add(key)
        list.push({ ...b, source: 'saved' })
      }
    }
    for (const p of knownPayees) {
      const key = `${p.account}-${p.bank}`
      if (!seen.has(key) && !deleted.includes(key)) {
        seen.add(key)
        list.push({ ...p, source: 'recent' })
      }
    }
    return list
  }, [beneficiaries, knownPayees, deleted])

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return allBeneficiaries
    return allBeneficiaries.filter((b) => (b.name + b.account + b.bank).toLowerCase().includes(t))
  }, [q, allBeneficiaries])

  function doDelete(b) {
    const key = `${b.account}-${b.bank}`
    setDeleted((p) => [...p, key])
    setConfirmDel(null)
    addAlert('Xóa người thụ hưởng', `Đã xóa ${b.name} khỏi danh sách`)
  }

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Người thụ hưởng</h1>
      </div>
      <div className="scroll" style={{ padding: 16 }}>
        <div className="search-bar">
          <IconSearch />
          <input placeholder="Tìm theo tên, số tài khoản, ngân hàng" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>

        <div className="ben-stats">
          <div className="ben-stat">
            <div className="ben-stat-num">{allBeneficiaries.length}</div>
            <div className="ben-stat-lbl">Tổng số</div>
          </div>
          <div className="ben-stat">
            <div className="ben-stat-num">{allBeneficiaries.filter(b => b.source === 'saved').length}</div>
            <div className="ben-stat-lbl">Đã lưu</div>
          </div>
          <div className="ben-stat">
            <div className="ben-stat-num">{allBeneficiaries.filter(b => b.source === 'recent').length}</div>
            <div className="ben-stat-lbl">Gần đây</div>
          </div>
        </div>

        <div className="list">
          {filtered.map((b) => (
            <div key={`${b.account}-${b.bank}`} className="list-item" style={{ cursor: 'default' }}>
              <button
                className="li-body"
                style={{ background: 'none', border: 0, textAlign: 'left', cursor: 'pointer', flex: 1 }}
                onClick={() => nav('/transfer', {
                  state: {
                    fromQr: true,
                    name: b.name,
                    account: b.account,
                    bank: b.bank,
                    bankFull: b.bank,
                    amount: ''
                  }
                })}
              >
                <div className="li-title">{b.name}</div>
                <div className="li-sub">{b.bank} · {b.account}</div>
                {b.last && <div className="muted" style={{ marginTop: 2, fontSize: 11 }}>GD gần nhất: {b.last}</div>}
              </button>
              {b.source === 'recent' && <span className="ben-tag">Gần đây</span>}
              <button className="icon-btn" onClick={() => setConfirmDel(b)} aria-label="delete">
                <IconTrash color="#c62828" />
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="muted" style={{ textAlign: 'center', padding: 32 }}>
              {q ? 'Không tìm thấy người thụ hưởng' : 'Chưa có người thụ hưởng nào'}
            </div>
          )}
        </div>

        <button
          className="btn-primary"
          style={{ marginTop: 16 }}
          onClick={() => nav('/transfer')}
        >
          + Thêm người thụ hưởng mới
        </button>
      </div>

      {confirmDel && (
        <div className="modal-bg" onClick={() => setConfirmDel(null)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="handle" />
            <div className="li-title" style={{ marginBottom: 8 }}>Xác nhận xóa</div>
            <div className="muted" style={{ marginBottom: 16 }}>
              Bạn có chắc muốn xóa <strong>{confirmDel.name}</strong> ({confirmDel.bank} · {confirmDel.account}) khỏi danh sách người thụ hưởng?
            </div>
            <button className="btn-primary" style={{ background: '#e53935', boxShadow: 'none' }} onClick={() => doDelete(confirmDel)}>
              Xóa người thụ hưởng
            </button>
            <div style={{ height: 8 }} />
            <button className="btn-ghost" onClick={() => setConfirmDel(null)}>Hủy</button>
          </div>
        </div>
      )}
    </>
  )
}
