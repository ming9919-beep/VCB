import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supportBotReplies, supportQuickPrompts } from '../data.js'
import { IconBack, IconHomeCircle, IconSend } from '../icons.jsx'

const BOT_NAME = 'VCB Assistant'

function botReply(userText) {
  const t = userText.toLowerCase()
  if (t.includes('khoá') || t.includes('khoa') || t.includes('lock')) return supportBotReplies[1]
  if (t.includes('usd') || t.includes('tỷ giá') || t.includes('ty gia')) return supportBotReplies[2]
  if (t.includes('lịch') || t.includes('lich') || t.includes('định kỳ') || t.includes('dinh ky')) return supportBotReplies[3]
  if (t.includes('hạn mức') || t.includes('han muc') || t.includes('limit')) return supportBotReplies[4]
  if (t.includes('mất') || t.includes('mat') || t.includes('mất điện thoại')) return supportBotReplies[5]
  if (t.includes('tiết kiệm') || t.includes('tiet kiem') || t.includes('savings')) return supportBotReplies[6]
  return 'Cảm ơn bạn đã liên hệ. Tôi đã ghi nhận câu hỏi của bạn. Đối với hỗ trợ chi tiết hơn, vui lòng gọi hotline 1900 54 54 68 hoặc đến chi nhánh VCB gần nhất.'
}

export default function Support() {
  const nav = useNavigate()
  const [messages, setMessages] = useState([
    { id: 'm0', from: 'bot', text: supportBotReplies[0], time: nowStr() }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  function nowStr() {
    const d = new Date()
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  function send(text) {
    const t = text.trim()
    if (!t) return
    const userMsg = { id: `m${Date.now()}`, from: 'user', text: t, time: nowStr() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, {
        id: `m${Date.now() + 1}`,
        from: 'bot',
        text: botReply(t),
        time: nowStr()
      }])
    }, 800 + Math.random() * 600)
  }

  return (
    <div className="support-page">
      <div className="support-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <div className="support-head-info">
          <div className="support-avatar">VCB</div>
          <div>
            <div className="support-name">{BOT_NAME}</div>
            <div className="support-status"><span className="dot-online" /> Trực tuyến</div>
          </div>
        </div>
        <button className="tf-home" onClick={() => nav('/home')} aria-label="home">
          <IconHomeCircle />
        </button>
      </div>

      <div className="support-body" ref={scrollRef}>
        {messages.map((m) => (
          <div key={m.id} className={`chat-msg ${m.from}`}>
            {m.from === 'bot' && <div className="chat-avatar">VCB</div>}
            <div className="chat-bubble-wrap">
              <div className="chat-bubble">{m.text}</div>
              <div className="chat-time">{m.time}</div>
            </div>
          </div>
        ))}
        {typing && (
          <div className="chat-msg bot">
            <div className="chat-avatar">VCB</div>
            <div className="chat-bubble-wrap">
              <div className="chat-bubble chat-typing">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}
      </div>

      {messages.length <= 2 && (
        <div className="support-quick">
          {supportQuickPrompts.map((p, i) => (
            <button key={i} className="chip" onClick={() => send(p)}>{p}</button>
          ))}
        </div>
      )}

      <div className="support-input-bar">
        <input
          className="support-input"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') send(input) }}
        />
        <button className="support-send" onClick={() => send(input)} disabled={!input.trim()}>
          <IconSend size={20} color={input.trim() ? '#fff' : '#ccc'} />
        </button>
      </div>
    </div>
  )
}
