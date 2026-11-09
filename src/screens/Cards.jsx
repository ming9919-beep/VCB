import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { existingCards, formatVND } from '../data.js'
import { IconBack, IconCheck, IconEyeCard, IconFreeze, IconTrash } from '../icons.jsx'
import { useStore } from '../store.jsx'

const NEW_CARDS = [
  { id: 'nc1', name: 'VCB Platinum', desc: 'Hoàn tiền 5%, phòng chờ sân bay, miễn phí thường niên năm đầu', color: '#37474f', tag: 'Ưu đãi' },
  { id: 'nc2', name: 'VCB Gold', desc: 'Hoàn tiền 2% tại siêu thị, hạn mức đến 200 triệu', color: '#c9a227', tag: 'Phổ biến' },
  { id: 'nc3', name: 'VCB Classic', desc: 'Miễn phí thường niên năm đầu, dễ dàng phê duyệt', color: '#1a9c4a', tag: '' }
]

export default function Cards() {
  const nav = useNavigate()
  const { addAlert } = useStore()
  const [tab, setTab] = useState('my')
  const [done, setDone] = useState(null)
  const [revealed, setRevealed] = useState({})
  const [frozen, setFrozen] = useState({})

  function toggleReveal(id) {
    setRevealed((p) => ({ ...p, [id]: !p[id] }))
  }

  function toggleFreeze(id) {
    setFrozen((p) => ({ ...p, [id]: !p[id] }))
    addAlert('Trạng thái thẻ', `Thẻ ${existingCards.find(c => c.id === id)?.name} đã ${frozen[id] ? 'mở khoá' : 'đóng băng tạm thời'}`)
  }

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Quản lý thẻ</h1>
      </div>
      <div className="scroll" style={{ padding: 16 }}>
        <div className="chip-row" style={{ marginBottom: 14 }}>
          <button className={`chip ${tab === 'my' ? 'on' : ''}`} onClick={() => setTab('my')}>Thẻ của tôi</button>
          <button className={`chip ${tab === 'new' ? 'on' : ''}`} onClick={() => setTab('new')}>Phát hành thẻ mới</button>
        </div>

        {tab === 'my' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {existingCards.map((c) => {
              const isFrozen = frozen[c.id]
              const isRevealed = revealed[c.id]
              return (
                <div key={c.id}>
                  <div
                    className="card-visual"
                    style={{
                      background: c.color === 'platinum'
                        ? 'linear-gradient(135deg, #455a64 0%, #1a2420 60%, #0a1410 100%)'
                        : 'linear-gradient(135deg, #2bb34f 0%, #148a3c 60%, #0b5a28 100%)'
                    }}
                  >
                    {isFrozen && <div className="card-frozen-badge">Đã đóng băng</div>}
                    <div className="card-v-top">
                      <div>
                        <div className="card-v-name">{c.name}</div>
                        <div className="card-v-type">{c.type}</div>
                      </div>
                      <div className="card-v-chip" />
                    </div>
                    <div className="card-v-number">
                      {isRevealed ? c.fullNumber.match(/.{1,4}/g).join(' ') : c.number}
                    </div>
                    <div className="card-v-bottom">
                      <div>
                        <div className="card-v-label">CHỦ THẺ</div>
                        <div className="card-v-val">{c.holder}</div>
                      </div>
                      <div>
                        <div className="card-v-label">HẾT HẠN</div>
                        <div className="card-v-val">{c.expiry}</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button className="card-act" onClick={() => toggleReveal(c.id)}>
                      <IconEyeCard size={18} color="#1a9c4a" />
                      <span>{isRevealed ? 'Ẩn số thẻ' : 'Hiện số thẻ'}</span>
                    </button>
                    <button className="card-act" onClick={() => toggleFreeze(c.id)}>
                      <IconFreeze size={18} color={isFrozen ? '#e53935' : '#1a9c4a'} />
                      <span>{isFrozen ? 'Mở khoá thẻ' : 'Đóng băng thẻ'}</span>
                    </button>
                  </div>
                  <div className="card" style={{ marginTop: 8 }}>
                    {c.type === 'Tín dụng' && (
                      <>
                        <div className="kv"><span>Hạn mức</span><span style={{ fontWeight: 700 }}>{formatVND(c.limit)} VND</span></div>
                        <div className="kv"><span>Đã sử dụng</span><span style={{ fontWeight: 700 }}>{formatVND(c.limit - c.balance)} VND</span></div>
                        <div className="kv" style={{ border: 0 }}>
                          <span>Còn lại</span>
                          <span style={{ fontWeight: 700, color: '#0e7a35' }}>{formatVND(c.balance)} VND</span>
                        </div>
                        <div className="card-progress">
                          <div
                            className="card-progress-bar"
                            style={{ width: `${Math.round((c.limit - c.balance) / c.limit * 100)}%` }}
                          />
                        </div>
                      </>
                    )}
                    {c.type === 'Ghi nợ' && (
                      <div className="kv" style={{ border: 0 }}>
                        <span>Số dư liên kết</span>
                        <span style={{ fontWeight: 700, color: '#0e7a35' }}>{formatVND(c.balance)} VND</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {tab === 'new' && !done && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {NEW_CARDS.map((c) => (
              <div key={c.id} className="card" style={{ padding: 14 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ width: 52, height: 36, borderRadius: 8, background: `linear-gradient(135deg, ${c.color}, #0b3d1c)`, flexShrink: 0 }} />
                  <div className="li-body">
                    {c.tag && <span className="tag">{c.tag}</span>}
                    <div className="li-title">{c.name}</div>
                    <div className="li-sub">{c.desc}</div>
                  </div>
                </div>
                <button className="btn-primary" onClick={() => setDone(c)}>Đăng ký phát hành</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'new' && done && (
          <div className="card" style={{ textAlign: 'center' }}>
            <div className="success-mark"><IconCheck size={32} /></div>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Đã gửi yêu cầu</div>
            <div className="muted" style={{ marginBottom: 16 }}>
              Yêu cầu phát hành {done.name} đang được xử lý. VCB sẽ liên hệ trong 1-2 ngày làm việc.
            </div>
            <button className="btn-primary" onClick={() => nav('/home')}>Về trang chủ</button>
          </div>
        )}
      </div>
    </>
  )
}
