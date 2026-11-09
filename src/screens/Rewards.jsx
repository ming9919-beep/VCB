import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatVND, redemptionHistory, rewardCatalog, rewardsData } from '../data.js'
import { IconBack, IconCheck, IconChevron, IconGift, IconHomeCircle, IconStar } from '../icons.jsx'

const CAT_COLORS = {
  'Shopping': '#e91e63',
  'Di chuyển': '#2196f3',
  'Viễn thông': '#ff9800',
  'F&B': '#795548',
  'Ngân hàng': '#1a9c4a',
  'Giải trí': '#9c27b0'
}

export default function Rewards() {
  const nav = useNavigate()
  const [tab, setTab] = useState('catalog')
  const [confirm, setConfirm] = useState(null)
  const [success, setSuccess] = useState(null)
  const [points, setPoints] = useState(rewardsData.points)

  function redeem(item) {
    if (points < item.points) return
    setPoints(points - item.points)
    setSuccess(item)
    setConfirm(null)
  }

  const progressPct = Math.min(100, Math.round((rewardsData.points / (rewardsData.points + rewardsData.pointsToNext)) * 100))

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>VCB Rewards</h1>
        <button className="tf-home" onClick={() => nav('/home')} aria-label="home">
          <IconHomeCircle />
        </button>
      </div>

      <div className="scroll" style={{ padding: '0 16px 110px' }}>
        <div className="rewards-hero">
          <div className="rewards-hero-bg" />
          <div className="rewards-tier">
            <IconStar size={20} color="#c9a227" />
            <span>{rewardsData.tier}</span>
          </div>
          <div className="rewards-points-label">Điểm thưởng</div>
          <div className="rewards-points-num">{points.toLocaleString('vi-VN')}</div>
          <div className="rewards-expiry">Hết hạn: {rewardsData.expiryDate}</div>
          <div className="rewards-progress-wrap">
            <div className="rewards-progress-track">
              <div className="rewards-progress-bar" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="rewards-progress-txt">
              Còn {rewardsData.pointsToNext} điểm lên {rewardsData.nextTier}
            </div>
          </div>
        </div>

        <div className="rewards-tabs">
          <button className={`rewards-tab ${tab === 'catalog' ? 'on' : ''}`} onClick={() => setTab('catalog')}>Quà tặng</button>
          <button className={`rewards-tab ${tab === 'history' ? 'on' : ''}`} onClick={() => setTab('history')}>Lịch sử đổi</button>
        </div>

        {tab === 'catalog' && (
          <div className="rewards-grid">
            {rewardCatalog.map((item) => {
              const canRedeem = points >= item.points
              const color = CAT_COLORS[item.cat] || '#1a9c4a'
              return (
                <button
                  key={item.id}
                  className="reward-card"
                  onClick={() => canRedeem && setConfirm(item)}
                  style={{ opacity: canRedeem ? 1 : 0.55 }}
                >
                  <div className="reward-ico" style={{ background: `${color}15`, color }}>
                    <IconGift size={24} color={color} />
                  </div>
                  <div className="reward-title">{item.title}</div>
                  <div className="reward-desc">{item.desc}</div>
                  <div className="reward-bottom">
                    <span className="reward-points" style={{ color }}>{item.points.toLocaleString('vi-VN')} điểm</span>
                    {canRedeem ? (
                      <span className="reward-action" style={{ color }}>Đổi ngay</span>
                    ) : (
                      <span className="reward-action muted">Chưa đủ điểm</span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {tab === 'history' && (
          <div className="list">
            {redemptionHistory.map((r) => (
              <div key={r.id} className="list-item" style={{ cursor: 'default' }}>
                <div className="avatar" style={{ background: '#fff3e0', color: '#e65100' }}>
                  <IconGift size={20} color="#e65100" />
                </div>
                <div className="li-body">
                  <div className="li-title">{r.title}</div>
                  <div className="li-sub">{r.date} · {r.code}</div>
                  <div className="li-sub" style={{ marginTop: 4 }}>{r.status}</div>
                </div>
                <div style={{ color: '#e65100', fontWeight: 800, fontSize: 13 }}>-{r.points.toLocaleString('vi-VN')}</div>
              </div>
            ))}
            {redemptionHistory.length === 0 && (
              <div className="muted" style={{ textAlign: 'center', padding: 24 }}>Chưa có giao dịch đổi thưởng</div>
            )}
          </div>
        )}
      </div>

      {confirm && (
        <div className="modal-bg" onClick={() => setConfirm(null)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="handle" />
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <div className="reward-ico" style={{ margin: '0 auto 10px', width: 56, height: 56 }}>
                <IconGift size={28} color={CAT_COLORS[confirm.cat] || '#1a9c4a'} />
              </div>
              <div className="li-title" style={{ fontSize: 17 }}>{confirm.title}</div>
              <div className="muted" style={{ marginTop: 4 }}>{confirm.desc}</div>
            </div>
            <div className="kv"><span>Điểm cần đổi</span><span style={{ color: '#e65100', fontWeight: 800 }}>{confirm.points.toLocaleString('vi-VN')} điểm</span></div>
            <div className="kv"><span>Điểm hiện có</span><span style={{ fontWeight: 800 }}>{points.toLocaleString('vi-VN')} điểm</span></div>
            <div className="kv" style={{ border: 0 }}><span>Điểm còn lại</span><span style={{ fontWeight: 800 }}>{(points - confirm.points).toLocaleString('vi-VN')} điểm</span></div>
            <button className="btn-primary" style={{ marginTop: 14 }} onClick={() => redeem(confirm)}>Xác nhận đổi</button>
            <button className="btn-ghost" style={{ marginTop: 8 }} onClick={() => setConfirm(null)}>Huỷ</button>
          </div>
        </div>
      )}

      {success && (
        <div className="modal-bg" onClick={() => setSuccess(null)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div className="success-mark" style={{ margin: '0 auto 14px' }}>
                <IconCheck size={32} color="#fff" />
              </div>
              <div className="li-title" style={{ fontSize: 18, color: '#0e7a35' }}>Đổi thưởng thành công!</div>
              <div className="muted" style={{ marginTop: 8 }}>{success.title}</div>
              <div className="muted" style={{ marginTop: 4, fontSize: 12 }}>
                Mã quà tặng: <strong style={{ color: '#333' }}>{generateCode(success.id)}</strong>
              </div>
              <button className="btn-primary" style={{ marginTop: 18 }} onClick={() => setSuccess(null)}>Hoàn tất</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function generateCode(id) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return `VCB-${code}-${id.toUpperCase()}`
}
