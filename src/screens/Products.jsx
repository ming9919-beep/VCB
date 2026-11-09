import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  IconCreditCard3D,
  IconInsuranceShield,
  IconInvestmentChart,
  IconNationalBudget,
  IconTopupMoney
} from '../iconsProducts.jsx'
import {
  IconBillCheck,
  IconCardService,
  IconSavingsPiggy,
  IconTransferArrows,
  IconUtilAppointment,
  IconUtilEContract,
  IconUtilFamilyHome,
  IconUtilLinkedAccount,
  IconUtilReferral,
  IconUtilReport,
  IconUtilSearchDoc,
  IconUtilSmartOtp
} from '../iconsProducts.jsx'
import { IconSearch } from '../icons.jsx'

/** Nhóm dịch vụ lớn (lưới 2 cột) */
const SERVICES = [
  { id: 'credit', label: 'Tín dụng', icon: IconCreditCard3D, path: '/cards' },
  { id: 'topup', label: 'Nạp tiền', icon: IconTopupMoney, path: '/topup' },
  { id: 'invest', label: 'Đầu tư', icon: IconInvestmentChart, path: '/savings' },
  { id: 'budget', label: 'Ngân sách NN', icon: IconNationalBudget, path: '/bills' },
  { id: 'insurance', label: 'Bảo hiểm', icon: IconInsuranceShield, path: '/features' }
]

/** Nhóm dịch vụ nổi bật (lưới 2x2) */
const HIGHLIGHTS = [
  { id: 'card-service', label: 'Dịch vụ thẻ', sub: '', icon: IconCardService, path: '/cards' },
  { id: 'transfer', label: 'Chuyển tiền', sub: 'Miễn phí', icon: IconTransferArrows, path: '/transfer' },
  { id: 'savings', label: 'Tiết kiệm', sub: 'Lãi suất tối 11%', icon: IconSavingsPiggy, path: '/savings' },
  { id: 'bills', label: 'Hoá đơn', sub: '', icon: IconBillCheck, path: '/bills' }
]

/** Nhóm tiện ích (lưới 3 cột) */
const UTILITIES = [
  { id: 'search', label: 'Tra soát\ntrực tuyến', icon: IconUtilSearchDoc, path: '/history' },
  { id: 'otp', label: 'Kích hoạt\nSmart OTP', icon: IconUtilSmartOtp, path: '/settings' },
  { id: 'report', label: 'Báo cáo\ngiao dịch', icon: IconUtilReport, path: '/analytics' },
  { id: 'family', label: 'VCB Family', icon: IconUtilFamilyHome, path: '/features' },
  { id: 'referral', label: 'Giới thiệu bạn', icon: IconUtilReferral, path: '/features' },
  { id: 'booking', label: 'Đặt lịch hẹn\nvới VCB', icon: IconUtilAppointment, path: '/features' },
  { id: 'contract', label: 'Tra cứu hợp\nđồng điện tử', icon: IconUtilEContract, path: '/features' },
  { id: 'linked', label: 'Tài khoản\nliên kết', icon: IconUtilLinkedAccount, path: '/accounts' }
]

export default function Products() {
  const nav = useNavigate()
  const [q, setQ] = useState('')

  const norm = q.trim().toLowerCase()
  const hit = (s) => !norm || s.toLowerCase().includes(norm)

  const services = useMemo(() => SERVICES.filter((s) => hit(s.label)), [norm])
  const highlights = useMemo(() => HIGHLIGHTS.filter((s) => hit(s.label) || hit(s.sub)), [norm])
  const utilities = useMemo(() => UTILITIES.filter((s) => hit(s.label)), [norm])

  const empty = !services.length && !highlights.length && !utilities.length

  return (
    <div className="prd-page">
      {/* Nền gradient + hoa văn logo VCB */}
      <div className="prd-bg" aria-hidden="true">
        <svg className="prd-shield" viewBox="0 0 200 240" fill="none">
          <path
            d="M100 8l84 30v66c0 52-34 90-84 112-50-22-84-60-84-112V38L100 8z"
            fill="url(#prdShieldGrad)"
          />
          <defs>
            <linearGradient id="prdShieldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity=".55" />
              <stop offset="1" stopColor="#ffffff" stopOpacity=".12" />
            </linearGradient>
          </defs>
          <path
            d="M100 46l50 18v40c0 30-20 52-50 65-30-13-50-35-50-65V64l50-18z"
            fill="#ffffff"
            opacity=".2"
          />
        </svg>
      </div>

      <div className="scroll prd-scroll">
        {/* Tiêu đề */}
        <h1 className="prd-title">
          Khám phá các sản phẩm của<br />Vietcombank
        </h1>

        {/* Ô tìm kiếm */}
        <div className="prd-search">
          <IconSearch size={22} color="#2b2b2b" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm kiếm dịch vụ"
            aria-label="Tìm kiếm dịch vụ"
          />
        </div>

        {empty ? (
          <div className="prd-empty">
            <IconSearch size={30} color="#9aa3a0" />
            <div>Không tìm thấy dịch vụ phù hợp</div>
          </div>
        ) : (
          <>
            {/* Lưới dịch vụ lớn — 2 cột */}
            {services.length > 0 && (
              <div className="prd-grid2">
                {services.map((s) => {
                  const Ico = s.icon
                  return (
                    <button key={s.id} className="prd-svc" onClick={() => nav(s.path)}>
                      <span className="prd-svc-ico">
                        <Ico size={46} />
                      </span>
                      <span className="prd-svc-lbl">{s.label}</span>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Lưới dịch vụ nổi bật — 2x2 */}
            {highlights.length > 0 && (
              <div className="prd-hl-grid">
                {highlights.map((s) => {
                  const Ico = s.icon
                  return (
                    <button key={s.id} className="prd-hl" onClick={() => nav(s.path)}>
                      <div className="prd-hl-text">
                        <div className="prd-hl-title">{s.label}</div>
                        {s.sub && <div className="prd-hl-sub">{s.sub}</div>}
                      </div>
                      <span className="prd-hl-ico">
                        <Ico size={50} />
                      </span>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Tiện ích — thẻ trắng, lưới 3 cột */}
            {utilities.length > 0 && (
              <div className="prd-util-card">
                <div className="prd-util-title">Tiện ích</div>
                <div className="prd-util-grid">
                  {utilities.map((s) => {
                    const Ico = s.icon
                    return (
                      <button key={s.id} className="prd-util" onClick={() => nav(s.path)}>
                        <span className="prd-util-ico">
                          <Ico size={34} />
                        </span>
                        <span className="prd-util-lbl">
                          {s.label.split('\n').map((line, i) => (
                            <span key={i} className="prd-util-line">{line}</span>
                          ))}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}
