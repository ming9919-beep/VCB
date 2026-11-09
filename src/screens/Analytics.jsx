import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatVND, monthlySpending, spendingCategories } from '../data.js'
import { IconBack } from '../icons.jsx'

export default function Analytics() {
  const nav = useNavigate()
  const [view, setView] = useState('donut')

  const total = spendingCategories.reduce((s, c) => s + c.amount, 0)
  const maxMonthly = Math.max(...monthlySpending.map((m) => m.amount))
  const avgMonthly = Math.round(monthlySpending.reduce((s, m) => s + m.amount, 0) / monthlySpending.length)

  const donutSegments = useMemo(() => {
    const segments = []
    let angle = -90
    const r = 70
    const cx = 100
    const cy = 100
    for (const cat of spendingCategories) {
      if (cat.amount === 0) continue
      const pct = cat.amount / total
      const startAngle = angle
      const endAngle = angle + pct * 360
      const startRad = (startAngle * Math.PI) / 180
      const endRad = (endAngle * Math.PI) / 180
      const x1 = cx + r * Math.cos(startRad)
      const y1 = cy + r * Math.sin(startRad)
      const x2 = cx + r * Math.cos(endRad)
      const y2 = cy + r * Math.sin(endRad)
      const largeArc = pct > 0.5 ? 1 : 0
      segments.push({
        ...cat,
        pct,
        path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`,
        labelAngle: (startAngle + endAngle) / 2
      })
      angle = endAngle
    }
    return segments
  }, [total])

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Phân tích chi tiêu</h1>
      </div>
      <div className="scroll" style={{ padding: 16 }}>
        <div className="card" style={{ textAlign: 'center', marginBottom: 14 }}>
          <div className="muted" style={{ fontSize: 12 }}>Tổng chi tiêu tháng 10</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#0e7a35', marginTop: 4 }}>
            {formatVND(total)} VND
          </div>
          <div className="muted" style={{ marginTop: 6 }}>
            Trung bình 6 tháng: {formatVND(avgMonthly)} VND/tháng
          </div>
        </div>

        <div className="chip-row" style={{ marginBottom: 14 }}>
          <button className={`chip ${view === 'donut' ? 'on' : ''}`} onClick={() => setView('donut')}>Theo nhóm</button>
          <button className={`chip ${view === 'bar' ? 'on' : ''}`} onClick={() => setView('bar')}>Theo tháng</button>
        </div>

        {view === 'donut' && (
          <>
            <div className="card" style={{ marginBottom: 14, display: 'flex', justifyContent: 'center' }}>
              <svg viewBox="0 0 200 200" style={{ width: 200, height: 200 }}>
                {donutSegments.map((seg) => (
                  <path
                    key={seg.id}
                    d={seg.path}
                    fill={seg.color}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                ))}
                <circle cx="100" cy="100" r="42" fill="#fff" />
                <text x="100" y="96" textAnchor="middle" fontSize="10" fill="#6b7280">Tổng</text>
                <text x="100" y="112" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0e7a35">
                  {(total / 1000000).toFixed(1)}tr
                </text>
              </svg>
            </div>
            <div className="card">
              {spendingCategories.filter((c) => c.amount > 0).map((cat, i) => (
                <div key={cat.id} className="kv" style={i === spendingCategories.filter(c => c.amount > 0).length - 1 ? { border: 0 } : undefined}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 4, background: cat.color, flexShrink: 0 }} />
                    {cat.label}
                  </span>
                  <span style={{ fontWeight: 700 }}>
                    {formatVND(cat.amount)}
                    <span className="muted" style={{ marginLeft: 6, fontSize: 11 }}>
                      {Math.round(cat.amount / total * 100)}%
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {view === 'bar' && (
          <>
            <div className="card" style={{ marginBottom: 14 }}>
              <div className="li-title" style={{ marginBottom: 12 }}>Chi tiêu 6 tháng gần nhất</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8, height: 160, paddingTop: 10 }}>
                {monthlySpending.map((m) => {
                  const h = Math.max(4, Math.round((m.amount / maxMonthly) * 140))
                  const isLatest = m === monthlySpending[monthlySpending.length - 1]
                  return (
                    <div key={m.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: isLatest ? '#0e7a35' : '#6b7280' }}>
                        {(m.amount / 1000000).toFixed(0)}tr
                      </div>
                      <div
                        style={{
                          width: '100%',
                          maxWidth: 32,
                          height: h,
                          borderRadius: '6px 6px 0 0',
                          background: isLatest
                            ? 'linear-gradient(180deg, #2bb34f, #148a3c)'
                            : 'linear-gradient(180deg, #c5e8cd, #a5d4b5)',
                        }}
                      />
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280' }}>{m.month}</div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="card">
              <div className="kv"><span>Tháng cao nhất</span><span style={{ fontWeight: 700 }}>T10 · {formatVND(maxMonthly)}</span></div>
              <div className="kv"><span>Tháng thấp nhất</span><span style={{ fontWeight: 700 }}>T7 · {formatVND(Math.min(...monthlySpending.map(m => m.amount)))}</span></div>
              <div className="kv" style={{ border: 0 }}><span>Xu hướng</span><span style={{ fontWeight: 700, color: '#e53935' }}>Tăng 15% so với T9</span></div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
