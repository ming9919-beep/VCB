/**
 * Bộ icon dùng cho màn Sản phẩm (Products) và các lưới dịch vụ.
 * Mô phỏng theo phong cách icon đa sắc màu của Vietcombank Digibank.
 */

/* ---------- Icon dịch vụ lớn (mảng 2 cột) ---------- */

export function IconCreditCard3D({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="8" width="40" height="30" rx="4" fill="#0f9d58" />
      <rect x="4" y="8" width="40" height="7" rx="3" fill="#0b7c43" />
      <rect x="9" y="20" width="14" height="2.6" rx="1.3" fill="#d9f7e3" />
      <rect x="9" y="26" width="22" height="2.2" rx="1.1" fill="#8fe3b4" />
      <circle cx="34" cy="30" r="6.5" fill="#f2b705" />
      <circle cx="34" cy="30" r="4" fill="#ffd34d" />
      <path d="M34 27.6v4.8M31.8 29.4h4.4" stroke="#8a6100" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function IconTopupMoney({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="5" y="11" width="38" height="26" rx="4" fill="#0f9d58" />
      <rect x="5" y="11" width="38" height="6" rx="3" fill="#0b7c43" />
      <rect x="11" y="21" width="16" height="10" rx="2" fill="#e8f8ee" />
      <circle cx="19" cy="26" r="3.4" fill="#0f9d58" />
      <path d="M19 23.6v4.8M17.2 25.2h3.6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="38" cy="8" r="7" fill="#f2b705" />
      <path d="M38 4.4v4.4M35.9 6.6h4.2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconInvestmentChart({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="8" width="40" height="32" rx="4" fill="#1a9c4a" />
      <path d="M4 14h40" stroke="#0b7c43" strokeWidth="2" />
      <path d="M11 33l7-8 6 4 6-9 7 6" stroke="#ffd34d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33 26h4v4" stroke="#ffd34d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="10" y="34" width="4" height="4" rx="1" fill="#d9f7e3" />
      <rect x="17" y="30" width="4" height="8" rx="1" fill="#8fe3b4" />
      <rect x="24" y="33" width="4" height="5" rx="1" fill="#d9f7e3" />
    </svg>
  )
}

export function IconNationalBudget({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M6 20L24 7l18 13" fill="#0f9d58" />
      <rect x="8" y="20" width="32" height="3.4" rx="1.7" fill="#0b7c43" />
      <rect x="11" y="24" width="4" height="14" rx="1.4" fill="#1a9c4a" />
      <rect x="18" y="24" width="4" height="14" rx="1.4" fill="#1a9c4a" />
      <rect x="26" y="24" width="4" height="14" rx="1.4" fill="#1a9c4a" />
      <rect x="33" y="24" width="4" height="14" rx="1.4" fill="#1a9c4a" />
      <rect x="7" y="38" width="34" height="4" rx="1.6" fill="#0b7c43" />
      <circle cx="24" cy="27" r="6" fill="#f2b705" />
      <path d="M21.8 27h4.4M24 24.8v4.4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconInsuranceShield({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 5l16 6v12c0 11-6.8 18.6-16 22-9.2-3.4-16-11-16-22V11l16-6z" fill="#0f9d58" />
      <path d="M24 5l16 6v12c0 11-6.8 18.6-16 22V5z" fill="#0b7c43" opacity=".55" />
      <path d="M24 14v13M17.5 20.5h13" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

/* ---------- Icon dịch vụ thẻ (mảng 2x2 dưới) ---------- */

export function IconCardService({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="5" y="14" width="30" height="22" rx="4" fill="#0f9d58" />
      <rect x="5" y="14" width="30" height="6" rx="3" fill="#0b7c43" />
      <rect x="10" y="24" width="11" height="2.4" rx="1.2" fill="#d9f7e3" />
      <rect x="10" y="29" width="17" height="2.2" rx="1.1" fill="#8fe3b4" />
      <path d="M35 26l-6 6v5h5l6-6v-5h-5z" fill="#f2b705" />
      <path d="M29 37h-4l-3 4" stroke="#f2b705" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31.5 10.5l2.5 2.5M36 7l2.5 2.5" stroke="#f2b705" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

export function IconTransferArrows({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="19" fill="#e8f8ee" />
      <circle cx="24" cy="24" r="14" fill="#0f9d58" />
      <path d="M15 18h18M15 30h18" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M30 14l4 4-4 4M18 26l-4 4 4 4" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 10h7l-2-2M43 10l-2 2" stroke="#f2b705" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 38H5l2-2M5 38l2 2" stroke="#f2b705" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconSavingsPiggy({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="5" y="12" width="38" height="26" rx="4" fill="#0f9d58" />
      <rect x="5" y="12" width="38" height="6" rx="3" fill="#0b7c43" />
      <path d="M13 30c0-5 3.6-8.6 8.4-8.6 3.4 0 6.2 1.8 7.2 4.6 2.4.2 4 2 4 4 0 2.4-2.2 4-4.8 4H15c-2.4 0-4-2-4-4.6 0-1.6 1-2.8 2-3.4z" fill="#e8f8ee" />
      <circle cx="25" cy="24" r="1.2" fill="#0b7c43" />
      <path d="M17 19.5c0-1.7 1.3-3.2 3.2-3.6" stroke="#e8f8ee" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="38" cy="8" r="7" fill="#f2b705" />
      <path d="M38 4.4v4.4M35.9 6.6h4.2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconBillCheck({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="5" y="8" width="30" height="34" rx="4" fill="#0f9d58" />
      <rect x="5" y="8" width="12" height="34" rx="4" fill="#0b7c43" />
      <rect x="10" y="15" width="18" height="2.4" rx="1.2" fill="#d9f7e3" />
      <rect x="10" y="22" width="18" height="2.4" rx="1.2" fill="#8fe3b4" />
      <rect x="10" y="29" width="12" height="2.4" rx="1.2" fill="#8fe3b4" />
      <circle cx="35" cy="31" r="10" fill="#f2b705" />
      <path d="M30 31l3.4 3.4L40.5 27" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ---------- Icon tiện ích (mảng 3 cột, nét) ---------- */

export function IconUtilSearchDoc({ size = 34, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M11 7h14l7 7v27a1.5 1.5 0 0 1-1.5 1.5h-19A1.5 1.5 0 0 1 10 41V8.5A1.5 1.5 0 0 1 11.5 7z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M25 7v7h7" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="30" cy="30" r="7" fill="#fff" stroke={color} strokeWidth="2.2" />
      <path d="M35 35l4.5 4.5" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M15 22h9M15 28h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconUtilSmartOtp({ size = 34, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M12 26a12 12 0 0 1 24 0" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16.5 24a7.5 7.5 0 0 1 15 0" stroke="#8bc53f" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="24" cy="27" r="4.6" fill="#fff" stroke={color} strokeWidth="2.2" />
      <path d="M24 24.6v2.8M22.6 26h2.8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <rect x="17" y="36" width="14" height="6" rx="2" fill="#eef8e2" stroke="#8bc53f" strokeWidth="1.8" />
    </svg>
  )
}

export function IconUtilReport({ size = 34, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="12" y="6" width="20" height="32" rx="2.6" stroke={color} strokeWidth="2.2" />
      <path d="M17 13h10M17 20h7" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M27 30l6 6M33 36v6h-6" stroke="#8bc53f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31 30h-4v4" stroke="#8bc53f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconUtilFamilyHome({ size = 34, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M7 21L24 8l17 13" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 19v20a1.6 1.6 0 0 0 1.6 1.6h22.8A1.6 1.6 0 0 0 37 39V19" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M24 32.5c-2.6-1.9-4.6-3.4-4.6-5.7a2.4 2.4 0 0 1 4.6-1 2.4 2.4 0 0 1 4.6 1c0 2.3-2 3.8-4.6 5.7z" fill="#8bc53f" stroke="#8bc53f" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

export function IconUtilReferral({ size = 34, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="17" cy="14" r="5" stroke={color} strokeWidth="2.4" />
      <path d="M8 34c0-4.4 4-7.5 9-7.5 1.4 0 2.7.3 3.9.8" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="33" cy="26" r="5" stroke="#8bc53f" strokeWidth="2.4" />
      <path d="M25 40c0-4.4 4-7.5 9-7.5 1.6 0 3.1.3 4.4 1" stroke="#8bc53f" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M30 14h9M34.5 9.5v9" stroke="#8bc53f" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

export function IconUtilAppointment({ size = 34, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="11" width="32" height="30" rx="4" stroke={color} strokeWidth="2.4" />
      <path d="M8 20h32" stroke={color} strokeWidth="2.4" />
      <path d="M17 7v8M31 7v8" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M18 30h12M24 24v12" stroke="#8bc53f" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconUtilEContract({ size = 34, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="10" y="6" width="24" height="36" rx="3" stroke={color} strokeWidth="2.4" />
      <path d="M15 14h14M15 21h9" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="33" cy="32" r="9" fill="#fff" stroke="#8bc53f" strokeWidth="2.4" />
      <path d="M29 32.4l3 3 5.5-6" stroke="#8bc53f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconUtilLinkedAccount({ size = 34, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="18" cy="14" r="5.4" stroke={color} strokeWidth="2.4" />
      <path d="M8 34c0-4.8 4.4-8.2 10-8.2 1.6 0 3.1.3 4.4 1" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M33 27a8 8 0 1 0 0 12 8 8 0 0 0 0-12z" stroke="#8bc53f" strokeWidth="2.4" />
      <path d="M30.5 33l2.5 2.5 5-5" stroke="#8bc53f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
