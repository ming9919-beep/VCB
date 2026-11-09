import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatVND } from '../data.js'
import { IconBack, IconSearch } from '../icons.jsx'
import { useStore } from '../store.jsx'

export default function History() {
  const nav = useNavigate()
  const { transactions } = useStore()
  const [q, setQ] = useState('')
  const [tab, setTab] = useState('all')
  const list = useMemo(() => {
    return transactions.filter((t) => {
      const okTab = tab === 'all' || t.type === tab
      const searchText = [
        t.title,
        t.ref,
        t.channel,
        t.extra?.name,
        t.extra?.bank,
        t.extra?.account,
        t.extra?.memo,
        t.extra?.source,
        t.accountId,
        t.amount
      ].filter(Boolean).join(' ').toLowerCase()
      const query = q.trim().toLowerCase()
      const queryDigits = query.replace(/\D/g, '')
      const searchDigits = searchText.replace(/\D/g, '')
      const okQ = !query || searchText.includes(query) || (queryDigits.length > 0 && searchDigits.includes(queryDigits))
      return okTab && okQ
    })
  }, [q, tab, transactions])

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Lịch sử giao dịch</h1>
      </div>
      <div className="scroll" style={{ padding: 16 }}>
        <div className="search-bar">
          <IconSearch />
          <input placeholder="Tìm theo nội dung, mã GD" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="chip-row" style={{ marginBottom: 12 }}>
          {[
            ['all', 'Tất cả'],
            ['in', 'Tiền vào'],
            ['out', 'Tiền ra']
          ].map(([k, l]) => (
            <button key={k} className={`chip ${tab === k ? 'on' : ''}`} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>
        <div className="list">
          {list.map((t) => (
            <button key={t.id} className="list-item" onClick={() => nav(`/history/${t.id}`)}>
              <div className="avatar">{t.type === 'in' ? '+' : '-'}</div>
              <div className="li-body">
                <div className="li-title">{t.title}</div>
                <div className="li-sub">{t.time} · {t.channel}</div>
              </div>
              <div className={t.type === 'in' ? 'amt-in' : 'amt-out'}>
                {t.type === 'in' ? '+' : ''}{formatVND(t.amount)}
              </div>
            </button>
          ))}
          {list.length === 0 && <div className="muted" style={{ textAlign: 'center', padding: 24 }}>Không có giao dịch</div>}
        </div>
      </div>
    </>
  )
}
