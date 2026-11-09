import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconBack, IconCheck, IconChevron, IconFingerprint, IconLock, IconLogout, IconSettings, IconShield } from '../icons.jsx'
import { useStore } from '../store.jsx'

export default function Settings() {
  const nav = useNavigate()
  const { user, logout, addAlert, paymentPassword, setPaymentPassword } = useStore()
  const [bio, setBio] = useState(true)
  const [faceId, setFaceId] = useState(false)
  const [pushNoti, setPushNoti] = useState(true)
  const [emailNoti, setEmailNoti] = useState(false)
  const [smsNoti, setSmsNoti] = useState(true)
  const [lang, setLang] = useState('vi')
  const [showLang, setShowLang] = useState(false)
  const [changePin, setChangePin] = useState(false)
  const [oldPin, setOldPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [pinErr, setPinErr] = useState('')
  const [pinDone, setPinDone] = useState(false)

  function submitChangePin() {
    if (!paymentPassword || oldPin !== paymentPassword) {
      setPinErr('Mật khẩu thanh toán hiện tại không chính xác')
      return
    }
    if (newPin.length !== 6) {
      setPinErr('PIN mới phải có 6 chữ số')
      return
    }
    if (newPin !== confirmPin) {
      setPinErr('Xác nhận PIN không khớp')
      return
    }
    setPaymentPassword(newPin)
    setPinDone(true)
    setPinErr('')
    addAlert('Đổi mật khẩu thanh toán', 'Mật khẩu thanh toán đã được thay đổi thành công')
    setTimeout(() => {
      setChangePin(false)
      setPinDone(false)
      setOldPin('')
      setNewPin('')
      setConfirmPin('')
    }, 1500)
  }

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Cài đặt & Bảo mật</h1>
      </div>
      <div className="scroll" style={{ padding: 16 }}>
        <div className="card" style={{ marginBottom: 14, textAlign: 'center' }}>
          <div className="avatar" style={{ width: 56, height: 56, margin: '0 auto 8px', fontSize: 20 }}>
            {user.name.split(' ').pop()[0]}
          </div>
          <div style={{ fontWeight: 800, fontSize: 16 }}>{user.name}</div>
          <div className="muted" style={{ marginTop: 2 }}>CIF: {user.cif}</div>
        </div>

        <div className="section-title" style={{ fontSize: 13, margin: '0 0 8px 4px', color: '#6b7280' }}>Bảo mật</div>
        <div className="list" style={{ marginBottom: 16 }}>
          <button className="list-item" onClick={() => setChangePin(true)}>
            <IconLock />
            <div className="li-body">
              <div className="li-title">Đổi mật khẩu thanh toán</div>
              <div className="li-sub">Dùng để xác nhận giao dịch</div>
            </div>
            <IconChevron color="#9aa3a0" />
          </button>
          <div className="list-item" style={{ cursor: 'default' }}>
            <IconFingerprint />
            <div className="li-body">
              <div className="li-title">Vân tay</div>
              <div className="li-sub">Đăng nhập bằng vân tay</div>
            </div>
            <span className={`sw ${bio ? 'on' : ''}`} onClick={() => setBio(!bio)} />
          </div>
          <div className="list-item" style={{ cursor: 'default' }}>
            <IconShield color="#1a9c4a" />
            <div className="li-body">
              <div className="li-title">Face ID</div>
              <div className="li-sub">Nhận diện khuôn mặt</div>
            </div>
            <span className={`sw ${faceId ? 'on' : ''}`} onClick={() => setFaceId(!faceId)} />
          </div>
        </div>

        <div className="section-title" style={{ fontSize: 13, margin: '0 0 8px 4px', color: '#6b7280' }}>Thông báo</div>
        <div className="list" style={{ marginBottom: 16 }}>
          <div className="list-item" style={{ cursor: 'default' }}>
            <div className="li-body">
              <div className="li-title">Thông báo đẩy</div>
              <div className="li-sub">Nhận thông báo trên thiết bị</div>
            </div>
            <span className={`sw ${pushNoti ? 'on' : ''}`} onClick={() => setPushNoti(!pushNoti)} />
          </div>
          <div className="list-item" style={{ cursor: 'default' }}>
            <div className="li-body">
              <div className="li-title">Thông báo SMS</div>
              <div className="li-sub">Nhận SMS giao dịch</div>
            </div>
            <span className={`sw ${smsNoti ? 'on' : ''}`} onClick={() => setSmsNoti(!smsNoti)} />
          </div>
          <div className="list-item" style={{ cursor: 'default' }}>
            <div className="li-body">
              <div className="li-title">Thông báo Email</div>
              <div className="li-sub">Nhận sao kê qua email</div>
            </div>
            <span className={`sw ${emailNoti ? 'on' : ''}`} onClick={() => setEmailNoti(!emailNoti)} />
          </div>
        </div>

        <div className="section-title" style={{ fontSize: 13, margin: '0 0 8px 4px', color: '#6b7280' }}>Khác</div>
        <div className="list" style={{ marginBottom: 16 }}>
          <button className="list-item" onClick={() => setShowLang(true)}>
            <IconSettings color="#1a9c4a" />
            <div className="li-body">
              <div className="li-title">Ngôn ngữ</div>
              <div className="li-sub">{lang === 'vi' ? 'Tiếng Việt' : 'English'}</div>
            </div>
            <IconChevron color="#9aa3a0" />
          </button>
          <button className="list-item" onClick={() => nav('/beneficiaries')}>
            <div className="li-body">
              <div className="li-title">Người thụ hưởng</div>
              <div className="li-sub">Quản lý danh sách</div>
            </div>
            <IconChevron color="#9aa3a0" />
          </button>
          <div className="list-item" style={{ cursor: 'default' }}>
            <div className="li-body">
              <div className="li-title">Phiên bản ứng dụng</div>
              <div className="li-sub">VCB Digibank v1.0.0</div>
            </div>
          </div>
        </div>

        <button className="list-item" onClick={() => { logout(); nav('/', { replace: true }) }}>
          <IconLogout />
          <div className="li-body">
            <div className="li-title" style={{ color: '#c62828' }}>Đăng xuất</div>
          </div>
        </button>
      </div>

      {showLang && (
        <div className="modal-bg" onClick={() => setShowLang(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="handle" />
            <div className="li-title" style={{ marginBottom: 10 }}>Chọn ngôn ngữ</div>
            <div className="list">
              <button className={`list-item ${lang === 'vi' ? 'on' : ''}`} onClick={() => { setLang('vi'); setShowLang(false) }}>
                <div className="avatar">VN</div>
                <div className="li-body"><div className="li-title">Tiếng Việt</div></div>
                {lang === 'vi' && <IconCheck />}
              </button>
              <button className={`list-item ${lang === 'en' ? 'on' : ''}`} onClick={() => { setLang('en'); setShowLang(false) }}>
                <div className="avatar">EN</div>
                <div className="li-body"><div className="li-title">English</div></div>
                {lang === 'en' && <IconCheck />}
              </button>
            </div>
          </div>
        </div>
      )}

      {changePin && (
        <div className="modal-bg" onClick={() => setChangePin(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="handle" />
            <div className="li-title" style={{ marginBottom: 14 }}>Đổi mật khẩu thanh toán</div>
            {pinDone ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div className="success-mark" style={{ margin: '0 auto 12px' }}>
                  <IconCheck size={32} />
                </div>
                <div style={{ fontWeight: 800 }}>Đổi mật khẩu thành công</div>
              </div>
            ) : (
              <>
                <div className="field">
                  <label>Mật khẩu hiện tại</label>
                  <input
                    inputMode="numeric"
                    maxLength={6}
                    value={oldPin}
                    onChange={(e) => { setOldPin(e.target.value.replace(/\D/g, '')); setPinErr('') }}
                    placeholder="Nhập mật khẩu hiện tại"
                    style={{ letterSpacing: 4, fontWeight: 800 }}
                  />
                </div>
                <div className="field">
                  <label>Mật khẩu mới (6 chữ số)</label>
                  <input
                    inputMode="numeric"
                    maxLength={6}
                    value={newPin}
                    onChange={(e) => { setNewPin(e.target.value.replace(/\D/g, '')); setPinErr('') }}
                    placeholder="Nhập mật khẩu mới"
                    style={{ letterSpacing: 4, fontWeight: 800 }}
                  />
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>Xác nhận mật khẩu mới</label>
                  <input
                    inputMode="numeric"
                    maxLength={6}
                    value={confirmPin}
                    onChange={(e) => { setConfirmPin(e.target.value.replace(/\D/g, '')); setPinErr('') }}
                    placeholder="Nhập lại mật khẩu mới"
                    style={{ letterSpacing: 4, fontWeight: 800 }}
                  />
                </div>
                {pinErr && <div className="login-err" style={{ marginTop: 8 }}>{pinErr}</div>}
                <button
                  className="btn-primary"
                  style={{ marginTop: 14 }}
                  disabled={oldPin.length < 6 || newPin.length < 6 || confirmPin.length < 6}
                  onClick={submitChangePin}
                >
                  Xác nhận đổi mật khẩu
                </button>
                <div style={{ height: 8 }} />
                <button className="btn-ghost" onClick={() => setChangePin(false)}>Hủy</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
