import { useNavigate } from 'react-router-dom'
import { IconBack, IconChevron, IconGift, IconIdCard, IconLoan, IconLogout, IconMap, IconRepeat, IconSettings, IconChat, IconCertificate } from '../icons.jsx'
import { useStore } from '../store.jsx'

export default function Profile() {
  const nav = useNavigate()
  const { user, logout, accounts } = useStore()

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Cá nhân</h1>
      </div>
      <div className="scroll" style={{ padding: 16 }}>
        <div className="card" style={{ textAlign: 'center', marginBottom: 14 }}>
          <div className="avatar" style={{ width: 64, height: 64, margin: '4px auto 10px', fontSize: 22 }}>
            {user.name.split(' ').pop()[0]}
          </div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{user.name}</div>
          <div className="muted" style={{ marginTop: 4 }}>CIF {user.cif}</div>
        </div>
        <div className="card" style={{ marginBottom: 14 }}>
          <div className="kv"><span>Số điện thoại</span><span>{user.phone}</span></div>
          <div className="kv"><span>Email</span><span>{user.email}</span></div>
          <div className="kv" style={{ border: 0 }}><span>Số tài khoản</span><span>{accounts.length}</span></div>
        </div>
        <div className="list">
          <button className="list-item" onClick={() => nav('/accounts')}>
            <div className="li-body"><div className="li-title">Danh sách tài khoản</div></div>
            <IconChevron color="#9aa3a0" />
          </button>
          <button className="list-item" onClick={() => nav('/history')}>
            <div className="li-body"><div className="li-title">Lịch sử giao dịch</div></div>
            <IconChevron color="#9aa3a0" />
          </button>
          <button className="list-item" onClick={() => nav('/scheduled')}>
            <IconRepeat size={22} color="#1a9c4a" />
            <div className="li-body"><div className="li-title">Giao dịch định kỳ</div></div>
            <IconChevron color="#9aa3a0" />
          </button>
          <button className="list-item" onClick={() => nav('/beneficiaries')}>
            <div className="li-body"><div className="li-title">Người thụ hưởng</div></div>
            <IconChevron color="#9aa3a0" />
          </button>
          <button className="list-item" onClick={() => nav('/analytics')}>
            <div className="li-body"><div className="li-title">Phân tích chi tiêu</div></div>
            <IconChevron color="#9aa3a0" />
          </button>
          <button className="list-item" onClick={() => nav('/rewards')}>
            <IconGift size={22} color="#c9a227" />
            <div className="li-body"><div className="li-title">VCB Rewards</div></div>
            <IconChevron color="#9aa3a0" />
          </button>
          <button className="list-item" onClick={() => nav('/rates')}>
            <div className="li-body"><div className="li-title">Tỷ giá ngoại tệ</div></div>
            <IconChevron color="#9aa3a0" />
          </button>
          <button className="list-item" onClick={() => nav('/loans')}>
            <IconLoan size={22} color="#1a9c4a" />
            <div className="li-body"><div className="li-title">Khoản vay</div></div>
            <IconChevron color="#9aa3a0" />
          </button>
          <button className="list-item" onClick={() => nav('/certificates')}>
            <IconCertificate size={22} color="#1a9c4a" />
            <div className="li-body"><div className="li-title">Sổ tiết kiệm</div></div>
            <IconChevron color="#9aa3a0" />
          </button>
          <button className="list-item" onClick={() => nav('/branches')}>
            <IconMap size={22} color="#1a9c4a" />
            <div className="li-body"><div className="li-title">Chi nhánh & ATM</div></div>
            <IconChevron color="#9aa3a0" />
          </button>
          <button className="list-item" onClick={() => nav('/features')}>
            <div className="li-body"><div className="li-title">Tuỳ chỉnh chức năng</div></div>
            <IconChevron color="#9aa3a0" />
          </button>
          <button className="list-item" onClick={() => nav('/support')}>
            <IconChat size={22} color="#1a9c4a" />
            <div className="li-body"><div className="li-title">Hỗ trợ trực tuyến</div></div>
            <IconChevron color="#9aa3a0" />
          </button>
          <button className="list-item" onClick={() => nav('/kyc')}>
            <IconIdCard size={22} color="#1a9c4a" />
            <div className="li-body"><div className="li-title">Định danh eKYC</div></div>
            <IconChevron color="#9aa3a0" />
          </button>
          <button className="list-item" onClick={() => nav('/settings')}>
            <IconSettings color="#1a9c4a" />
            <div className="li-body"><div className="li-title">Cài đặt & Bảo mật</div></div>
            <IconChevron color="#9aa3a0" />
          </button>
          <button className="list-item" onClick={() => { logout(); nav('/', { replace: true }) }}>
            <IconLogout />
            <div className="li-body"><div className="li-title" style={{ color: '#c62828' }}>Đăng xuất</div></div>
          </button>
        </div>
      </div>
    </>
  )
}
