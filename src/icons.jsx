export function IconUser({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.2" stroke={color} strokeWidth="1.8" />
      <path d="M5.5 19c1.4-3.1 3.7-4.6 6.5-4.6S17.6 15.9 19 19" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconQr({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" stroke={color} strokeWidth="1.7" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" stroke={color} strokeWidth="1.7" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" stroke={color} strokeWidth="1.7" />
      <path d="M13.5 13.5h3v3h-3zM18.5 13.5h2v2M13.5 18.5h2v2M17.5 17.5h3.5v3.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <rect x="5.6" y="5.6" width="2.8" height="2.8" fill={color} />
      <rect x="15.6" y="5.6" width="2.8" height="2.8" fill={color} />
      <rect x="5.6" y="15.6" width="2.8" height="2.8" fill={color} />
    </svg>
  )
}

export function IconCopy({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="8" y="8" width="11" height="13" rx="2" stroke={color} strokeWidth="1.8" />
      <path d="M6 16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke={color} strokeWidth="1.8" />
    </svg>
  )
}

export function IconEyeOff({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 3l18 18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.6 10.7a2.2 2.2 0 0 0 2.7 2.7M9.5 5.6A10.6 10.6 0 0 1 12 5.3c5.2 0 8.8 4.2 9.7 5.5-.4.6-1.1 1.6-2.2 2.6M6.2 6.9C4.4 8.2 3.2 9.8 2.3 10.8c1.2 1.6 4.6 5.5 9.7 5.5 1.1 0 2.1-.2 3-.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconEye({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M2.5 12S6.2 6.2 12 6.2 21.5 12 21.5 12 17.8 17.8 12 17.8 2.5 12 2.5 12z" stroke={color} strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.6" stroke={color} strokeWidth="1.8" />
    </svg>
  )
}

export function IconClock({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.2" stroke={color} strokeWidth="1.8" />
      <path d="M12 8v4.2l2.6 1.8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconWallet({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6.5" width="18" height="12.5" rx="2.4" stroke={color} strokeWidth="1.8" />
      <path d="M3 9.5h18" stroke={color} strokeWidth="1.8" />
      <circle cx="16.5" cy="13.6" r="1.1" fill={color} />
      <path d="M8 6.5V5.4A1.4 1.4 0 0 1 9.4 4h5.2A1.4 1.4 0 0 1 16 5.4V6.5" stroke={color} strokeWidth="1.8" />
    </svg>
  )
}

export function IconTransfer({ size = 28, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.6" />
      <path d="M16 20h16l-4-4M32 28H16l4 4" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconPiggy({ size = 28, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.6" />
      <path d="M17 27c0-5 3.2-8.5 7.5-8.5 3.2 0 6 2 7 5.2 2.2.2 3.8 1.8 3.8 3.8 0 2.4-2.1 4-4.6 4H18.8C16.6 31.5 15 29.5 15 27.2c0-1.6 1-3 2.4-3.6" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="28.5" cy="23.2" r="1.1" fill={color} />
      <path d="M20 18.2c0-1.6 1.2-3 3-3.4M18.5 32.5l-1.6 3M29.8 32.5l1.5 3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconPhonePay({ size = 28, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.6" />
      <rect x="18" y="12.5" width="12" height="23" rx="2.4" stroke={color} strokeWidth="2" />
      <path d="M21 16h6M24 31.5h.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M30 19.5l4-1.5M31.2 23H35M30 26.5l4 1.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconCard({ size = 28, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.6" />
      <rect x="13" y="17" width="22" height="14" rx="2.2" stroke={color} strokeWidth="2" />
      <path d="M13 22h22" stroke={color} strokeWidth="2" />
      <path d="M17 27h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconBill({ size = 28, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.6" />
      <circle cx="24" cy="24" r="9.5" stroke={color} strokeWidth="2" />
      <path d="M24 18.5v11M21 21.2h4.4c1.3 0 2.3.9 2.3 2.1s-1 2.1-2.3 2.1H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconGlobe({ size = 28, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.6" />
      <circle cx="24" cy="24" r="9.5" stroke={color} strokeWidth="2" />
      <path d="M15 24h18M24 14.5c2.6 2.8 4 6 4 9.5s-1.4 6.7-4 9.5c-2.6-2.8-4-6-4-9.5s1.4-6.7 4-9.5z" stroke={color} strokeWidth="1.8" />
    </svg>
  )
}

export function IconHome({ size = 22, color = 'currentColor', filled = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {filled ? (
        <path d="M3.5 10.8L12 4l8.5 6.8V20a1.5 1.5 0 0 1-1.5 1.5h-5.2v-6.2H10.2V21.5H5A1.5 1.5 0 0 1 3.5 20V10.8z" fill={color} />
      ) : (
        <path d="M4 11.2L12 4.5l8 6.7V20a1 1 0 0 1-1 1h-5.2v-6H10.2v6H5a1 1 0 0 1-1-1v-8.8z" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
      )}
    </svg>
  )
}

export function IconProducts({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="7" height="7" rx="1.4" stroke={color} strokeWidth="1.7" />
      <rect x="13" y="4" width="7" height="7" rx="1.4" stroke={color} strokeWidth="1.7" />
      <rect x="4" y="13" width="7" height="7" rx="1.4" stroke={color} strokeWidth="1.7" />
      <path d="M13 16.5h7M16.5 13v7" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function IconTune({ size = 18, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M4 17h16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="9" cy="7" r="2.3" fill="#fff" stroke={color} strokeWidth="1.8" />
      <circle cx="15" cy="17" r="2.3" fill="#fff" stroke={color} strokeWidth="1.8" />
    </svg>
  )
}

export function IconPower({ size = 16, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3v9" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M7.2 6.4a7.2 7.2 0 1 0 9.6 0" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export function IconBack({ size = 22, color = '#222' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M15 5l-7 7 7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconChevron({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 5l7 7-7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconSearch({ size = 18, color = '#888' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="6.5" stroke={color} strokeWidth="1.8" />
      <path d="M16 16l4.2 4.2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconCheck({ size = 18, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5l5 5 9-10" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconFlash({ size = 22, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4.5 13.5H12L11 22l8.5-11.5H12L13 2z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

export function IconGear({ size = 22, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.8" />
      <path d="M12 3.5v2.2M12 18.3V21M3.5 12h2.2M18.3 12H21M6.2 6.2l1.6 1.6M16.2 16.2l1.6 1.6M6.2 17.8l1.6-1.6M16.2 7.8l1.6-1.6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconImage({ size = 22, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5" width="17" height="14" rx="2.2" stroke={color} strokeWidth="1.7" />
      <circle cx="9" cy="10.2" r="1.6" stroke={color} strokeWidth="1.6" />
      <path d="M5.5 17.2l4.2-4 3.2 3 2.4-2.4 3.2 3.4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.2 5V3.4M16.2 5l1.6-1.2M16.2 5l-1.6-1.2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function IconPin({ size = 22, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 21s6.5-6.1 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.9 6.5 11 6.5 11z" stroke={color} strokeWidth="1.7" />
      <circle cx="12" cy="10" r="2.2" stroke={color} strokeWidth="1.7" />
    </svg>
  )
}

export function IconTicket({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h11A2.5 2.5 0 0 1 20 8.5v2a2 2 0 1 0 0 3v2A2.5 2.5 0 0 1 17.5 18h-11A2.5 2.5 0 0 1 4 15.5v-2a2 2 0 1 0 0-3v-2z" stroke={color} strokeWidth="1.7" />
      <path d="M9 8v8" stroke={color} strokeWidth="1.7" strokeDasharray="2 2" />
    </svg>
  )
}

export function IconHomeCircle({ size = 26, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10.2" stroke={color} strokeWidth="1.5" />
      <path d="M7.2 12.2L12 8.2l4.8 4V16.6a.9.9 0 0 1-.9.9h-2.5v-3.2h-2.8v3.2H8.1a.9.9 0 0 1-.9-.9v-4.4z" fill={color} />
    </svg>
  )
}

export function IconTemplate({ size = 16, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="2.4" stroke={color} strokeWidth="1.8" />
      <path d="M8 9h8M8 12.5h8M8 16h5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconInfo({ size = 16, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
      <path d="M12 11v5M12 8h.01" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconBook({ size = 18, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21.5V5.5z" stroke={color} strokeWidth="1.7" />
      <path d="M5 19h12" stroke={color} strokeWidth="1.7" />
    </svg>
  )
}

export function IconChevronDown({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconBell({ size = 20, color = '#1f2933' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.2 2H4.8L6 16.5z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10 20.2a2.2 2.2 0 0 0 4 0" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconLock({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="10" width="14" height="10" rx="2" stroke={color} strokeWidth="1.8" />
      <path d="M8 10V8a4 4 0 0 1 8 0v2" stroke={color} strokeWidth="1.8" />
    </svg>
  )
}

export function IconLogout({ size = 18, color = '#c62828' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M10 5H6.5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19H10" stroke={color} strokeWidth="1.8" />
      <path d="M10 12h9M16 8.5L19.5 12 16 15.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconChart({ size = 28, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.6" />
      <path d="M16 32V22M24 32V16M32 32V26" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M13 32h22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconExchange({ size = 28, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.6" />
      <path d="M14 18h18l-4-4M34 30H16l4 4" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="24" y="27" textAnchor="middle" fontSize="10" fontWeight="800" fill={color}>$</text>
    </svg>
  )
}

export function IconSettings({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" stroke={color} strokeWidth="1.7" />
      <path d="M19.4 13.5a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

export function IconTrash({ size = 18, color = '#c62828' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12.5A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5L19 7M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconFingerprint({ size = 22, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 11a2.5 2.5 0 0 0-2.5 2.5c0 2 .5 3.8 1.3 5.4M12 11a2.5 2.5 0 0 1 2.5 2.5c0 1.2-.2 2.4-.5 3.5M12 4.5a8 8 0 0 0-8 8c0 1.8.3 3.5.8 5M12 4.5a8 8 0 0 1 8 8c0 .7 0 1.3-.1 2M7.5 8a6.5 6.5 0 0 1 9 0" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function IconShield({ size = 22, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l7 3v5.5c0 4.5-3 7.8-7 9.5-4-1.7-7-5-7-9.5V6l7-3z" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconEyeCard({ size = 18, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M2.5 12S6.2 6.2 12 6.2 21.5 12 21.5 12 17.8 17.8 12 17.8 2.5 12 2.5 12z" stroke={color} strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.6" stroke={color} strokeWidth="1.8" />
    </svg>
  )
}

export function IconFreeze({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3v18M4 7l16 10M4 17L20 7" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 7l-3-2M12 7l3-2M12 17l-3 2M12 17l3 2M5.5 9.5L4 6M18.5 9.5L20 6M5.5 14.5L4 18M18.5 14.5L20 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconShare({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="18" cy="5.5" r="2.8" stroke={color} strokeWidth="1.7" />
      <circle cx="6" cy="12" r="2.8" stroke={color} strokeWidth="1.7" />
      <circle cx="18" cy="18.5" r="2.8" stroke={color} strokeWidth="1.7" />
      <path d="M8.4 10.8l7.2-4M8.4 13.2l7.2 4" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function IconReceipt({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5.5 3.5h13v17l-2.2-1.5-2.2 1.5-2.2-1.5-2.2 1.5-2.2-1.5-2 1.5v-17z" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="9" cy="9" r="1.3" fill={color} />
      <path d="M12 8.4h4M8 13.2h8M8 16.4h5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function IconChat({ size = 28, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.6" />
      <path d="M14 18c0-1.5 1.2-2.8 2.8-2.8h14.4c1.6 0 2.8 1.3 2.8 2.8v8c0 1.5-1.2 2.8-2.8 2.8h-7.2l-5 4.4v-4.4h-2.2c-1.6 0-2.8-1.3-2.8-2.8v-8z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="20" cy="22" r="1.3" fill={color} />
      <circle cx="24" cy="22" r="1.3" fill={color} />
      <circle cx="28" cy="22" r="1.3" fill={color} />
    </svg>
  )
}

export function IconGift({ size = 28, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.6" />
      <rect x="15" y="22" width="18" height="14" rx="1.5" stroke={color} strokeWidth="2" />
      <path d="M15 27h18" stroke={color} strokeWidth="2" />
      <path d="M24 22v14M20 22c-2.5 0-4-1.8-4-4s2.5-3 4-1.5c1-1.5 4-1 4 1.5s-1.5 4-4 4z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M28 22c2.5 0 4-1.8 4-4s-2.5-3-4-1.5c-1-1.5-4-1-4 1.5s1.5 4 4 4z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

export function IconMap({ size = 28, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.6" />
      <path d="M24 13c-4.4 0-8 3.5-8 8 0 5.5 8 14 8 14s8-8.5 8-14c0-4.5-3.6-8-8-8z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="24" cy="21" r="3" stroke={color} strokeWidth="2" />
    </svg>
  )
}

export function IconRepeat({ size = 28, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.6" />
      <path d="M16 20h12l-3-3M32 28H20l3 3" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 20c2.5 1 4 2.8 4 5M20 28c-2.5-1-4-2.8-4-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
    </svg>
  )
}

export function IconSend({ size = 20, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4l16 8-16 8 3-8-3-8z" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M7 12h10" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function IconClock2({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.7" />
      <path d="M12 7.5v5l3 2" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function IconRefresh({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12a7 7 0 0 1 12-5l2 2M19 12a7 7 0 0 1-12 5l-2-2" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 6v3h-3M5 18v-3h3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconPause({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="7" y="5" width="4" height="14" rx="1" fill={color} />
      <rect x="13" y="5" width="4" height="14" rx="1" fill={color} />
    </svg>
  )
}

export function IconPlay({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M8 5l12 7-12 7V5z" fill={color} />
    </svg>
  )
}

export function IconStar({ size = 22, color = '#c9a227' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l2.6 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.3 2.7 1.1-6.1L3.3 9.4l6.1-.8L12 3z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill={color} fillOpacity="0.15" />
    </svg>
  )
}

export function IconLoan({ size = 28, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.6" />
      <path d="M16 30V18M22 30V14M28 30V20M34 30V16" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M14 34h20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconCertificate({ size = 28, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.6" />
      <rect x="15" y="14" width="18" height="14" rx="1.5" stroke={color} strokeWidth="2" />
      <path d="M18 18h12M18 22h8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24 28v6M20 34l4-1 4 1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="35" r="2" fill={color} />
    </svg>
  )
}

export function IconIdCard({ size = 28, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.6" />
      <rect x="14" y="15" width="20" height="18" rx="2" stroke={color} strokeWidth="2" />
      <circle cx="20" cy="22" r="2.8" stroke={color} strokeWidth="1.8" />
      <path d="M16 30c0-2.8 1.8-4.5 4-4.5s4 1.7 4 4.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M26 20h6M26 24h6M26 28h4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconCalendar({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="5.5" width="16" height="15" rx="2" stroke={color} strokeWidth="1.8" />
      <path d="M4 9.5h16M8 3.5v4M16 3.5v4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 13.5h2M12 13.5h2M8 17h2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconPercent({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M19 5L5 19" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8" cy="8" r="2.5" stroke={color} strokeWidth="1.7" />
      <circle cx="16" cy="16" r="2.5" stroke={color} strokeWidth="1.7" />
    </svg>
  )
}

export function IconDot({ size = 8, color = '#1a9c4a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" fill="none">
      <circle cx="4" cy="4" r="4" fill={color} />
    </svg>
  )
}

export function IconArrowRight({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
