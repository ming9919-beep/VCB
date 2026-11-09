import { useNavigate } from 'react-router-dom'
import { ExitDemo } from '../components.jsx'
import { allFeatures, formatVND } from '../data.js'
import {
  IconBell,
  IconBill,
  IconCard,
  IconChart,
  IconChat,
  IconChevron,
  IconClock,
  IconCopy,
  IconExchange,
  IconEye,
  IconEyeOff,
  IconGift,
  IconGlobe,
  IconMap,
  IconPhonePay,
  IconPiggy,
  IconQr,
  IconRepeat,
  IconTransfer,
  IconTune,
  IconUser,
  IconWallet
} from '../icons.jsx'
import { useStore } from '../store.jsx'
import { useState } from 'react'

const ICONS = {
  transfer: IconTransfer,
  savings: IconPiggy,
  topup: IconPhonePay,
  card: IconCard,
  bill: IconBill,
  intl: IconGlobe,
  qr: IconQr,
  history: IconClock,
  accounts: IconWallet,
  analytics: IconChart,
  rates: IconExchange,
  beneficiaries: IconUser,
  settings: IconTune,
  rewards: IconGift,
  branches: IconMap,
  scheduled: IconRepeat,
  support: IconChat
}

export default function Home() {
  const nav = useNavigate()
  const { user, hideBalance, setHideBalance, favorites, unread } = useStore()
  const [copied, setCopied] = useState(false)

  function copyAcc() {
    navigator.clipboard?.writeText(user.accountNoFull).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  const feats = favorites
    .map((id) => allFeatures.find((f) => f.id === id))
    .filter(Boolean)
    .slice(0, 6)

  return (
    <>
      {copied && <div className="toast">Đã sao chép số tài khoản</div>}
      <div className="scroll splash-home" style={{ paddingBottom: 110 }}>
        <div className="home-top">
          <div className="hero">
            <img className="hero-art" src="./hero.jpg" alt="" />
          </div>
          <div className="home-nav">
            <div className="brand"><span className="g">VCB</span>{' '}Digibank</div>
            <div className="home-nav-right">
              <button className="icon-round" onClick={() => nav('/notify')} aria-label="notify">
                <IconBell />
                {unread > 0 && <span className="badge-dot">{unread > 9 ? '9+' : unread}</span>}
              </button>
              <ExitDemo />
            </div>
          </div>
        </div>

        <div className="account-card">
          <div className="acc-head">
            <button className="acc-user" onClick={() => nav('/profile')}>
              <IconUser color="#fff" />
              {user.name}
            </button>
            <button className="acc-qr" onClick={() => nav('/qr')}>
              <IconQr size={18} color="#fff" />
              QR của tôi
            </button>
          </div>
          <div className="acc-rows">
            <div className="acc-row">
              <span className="acc-label">Số tài khoản</span>
              <span className="acc-val">
                {user.accountNo}
                <span className="icon-btn" onClick={copyAcc}><IconCopy color="#fff" /></span>
              </span>
            </div>
            <div className="acc-row">
              <span className="acc-label">Số dư</span>
              <span className="acc-val">
                {hideBalance ? '*** *** ***' : formatVND(user.balance)} VND
                <span className="icon-btn" onClick={() => setHideBalance(!hideBalance)}>
                  {hideBalance ? <IconEyeOff color="#fff" /> : <IconEye color="#fff" />}
                </span>
              </span>
            </div>
          </div>
          <div className="acc-actions">
            <button className="acc-action" onClick={() => nav('/history')}>
              <IconClock color="#fff" />
              Lịch sử giao dịch
            </button>
            <button className="acc-action" onClick={() => nav('/accounts')}>
              <IconWallet color="#fff" />
              Danh sách tài khoản
            </button>
          </div>
        </div>

        <div className="section">
          <div className="section-head">
            <div className="section-title">Chức năng ưa thích</div>
            <button className="tune" onClick={() => nav('/features')}>
              Tuỳ chỉnh <IconTune />
            </button>
          </div>
          <div className="feat-grid">
            {feats.map((f) => {
              const Icon = ICONS[f.id] || IconTransfer
              return (
                <button key={f.id} className="feat" onClick={() => nav(f.path)}>
                  <div className="feat-icon">
                    <Icon />
                    {(f.id === 'transfer' || f.id === 'savings') && <span className="badge">Dùng thử</span>}
                  </div>
                  <div className="feat-label">{f.title}</div>
                </button>
              )
            })}
            <button className="feat-next" onClick={() => nav('/features')} aria-label="more">
              <IconChevron size={16} color="#1a9c4a" />
            </button>
          </div>
          <div className="dots-row">
            <div className="dots">
              <span className="dot on" />
              <span className="dot" />
            </div>
            <button className="see-all" onClick={() => nav('/features')}>
              Xem tất cả <IconChevron size={16} color="#0e7a35" />
            </button>
          </div>
        </div>

      </div>
    </>
  )
}
