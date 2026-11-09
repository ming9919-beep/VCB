export const user = {
  name: 'Nguyen Van A',
  accountNo: '1234567824333',
  accountNoFull: '1234567824333',
  balance: 128450000,
  cif: '0123456789',
  phone: '0000000000',
  email: 'nva@email.com'
}

export const accounts = [
  {
    id: 'acc-1',
    name: 'Tài khoản thanh toán',
    number: '1234567824333',
    masked: '1234567824333',
    balance: 128450000,
    currency: 'VND',
    type: 'checking',
    primary: true
  },
  {
    id: 'acc-2',
    name: 'Tài khoản tiết kiệm',
    number: '1001007654321',
    masked: '100100xxxxxxx',
    balance: 500000000,
    currency: 'VND',
    type: 'savings',
    rate: '5.6%/năm'
  },
  {
    id: 'acc-3',
    name: 'Tài khoản USD',
    number: '1001009988776',
    masked: '100100xxxxxxx',
    balance: 2450.75,
    currency: 'USD',
    type: 'fx'
  }
]

export const transactions = [
  { id: 'tx-1', title: 'Chuyen tien den TRAN THI B', amount: -2500000, time: '07/11/2026 09:12', type: 'out', status: 'Thành công', ref: 'FT261107091234', channel: 'VCB Digibank' },
  { id: 'tx-2', title: 'Nhan luong T10/2026', amount: 18500000, time: '05/11/2026 08:01', type: 'in', status: 'Thành công', ref: 'FT261105080145', channel: 'Chuyển khoản' },
  { id: 'tx-3', title: 'Thanh toan hoa don dien', amount: -865000, time: '03/11/2026 19:40', type: 'out', status: 'Thành công', ref: 'BL261103194012', channel: 'Thanh toán' },
  { id: 'tx-4', title: 'Nap tien dien thoai 0000000000', amount: -100000, time: '02/11/2026 12:22', type: 'out', status: 'Thành công', ref: 'TP261102122201', channel: 'Nạp tiền' },
  { id: 'tx-5', title: 'Mo tiet kiem online 6 thang', amount: -50000000, time: '28/10/2026 10:05', type: 'out', status: 'Thành công', ref: 'SV261028100511', channel: 'Tiết kiệm' },
  { id: 'tx-6', title: 'Hoan tien VCB Rewards', amount: 125000, time: '25/10/2026 16:18', type: 'in', status: 'Thành công', ref: 'RW261025161833', channel: 'Rewards' },
  { id: 'tx-7', title: 'Thanh toan Shopee', amount: -329000, time: '22/10/2026 21:03', type: 'out', status: 'Thành công', ref: 'QR261022210344', channel: 'QR Pay' },
  { id: 'tx-8', title: 'Lai tiet kiem thang 10', amount: 2340000, time: '20/10/2026 00:05', type: 'in', status: 'Thành công', ref: 'IN261020000512', channel: 'Tiết kiệm' }
]

export const beneficiaries = [
  { id: 'bn-1', name: 'TRAN THI B', bank: 'Vietcombank', account: '0071001234567', last: '2.500.000 VND' },
  { id: 'bn-2', name: 'LE VAN C', bank: 'Techcombank', account: '19031234567890', last: '1.200.000 VND' },
  { id: 'bn-3', name: 'NGUYEN THI D', bank: 'MB Bank', account: '0123456789012', last: '500.000 VND' },
  { id: 'bn-4', name: 'PHAM VAN E', bank: 'VietinBank', account: '108876543210', last: '8.000.000 VND' }
]

export const qrPayee = {
  bank: 'Vietcombank',
  bankFull: 'Vietcombank - Ngân hàng TMCP Ngoại thương Việt Nam',
  name: 'Nguyen Chu Thuy Trang',
  account: '1234567825353',
  accountDisplay: '123 45678 25353',
  amount: 123456
}

export const knownPayees = [
  { account: '8888395821769', name: 'YUKHEANG SOEU', bank: 'Agribank' },
  { account: '1234567825353', name: 'NGUYEN CHU THUY TRANG', bank: 'Vietcombank' },
  { account: '1234567824333', name: 'NGUYEN VAN A', bank: 'Vietcombank' }
]

const DERIVED_SURNAMES = ['NGUYEN', 'TRAN', 'LE', 'PHAM', 'HOANG', 'PHAN', 'VU', 'DANG', 'BUI', 'DO', 'HO', 'NGO', 'DUONG', 'LY', 'TRUONG']
const DERIVED_MIDDLES = ['VAN', 'THI', 'MINH', 'HONG', 'QUANG', 'THU', 'NGOC', 'HUU', 'ANH', 'DINH', 'XUAN', 'KIM']
const DERIVED_GIVENS = ['AN', 'BINH', 'CHI', 'DUNG', 'HOA', 'KHANH', 'LINH', 'LONG', 'MAI', 'NAM', 'PHUC', 'QUAN', 'SON', 'THAO', 'TRANG', 'TUAN', 'VIET', 'YEN']

// 按账号确定性地生成固定姓名：同一账号始终得到同一个名字，保证扫码后一定能显示对方姓名。
export function deriveAccountName(account) {
  const digits = String(account || '').replace(/\D/g, '')
  if (digits.length < 4) return ''
  let seed = 7
  for (let i = 0; i < digits.length; i += 1) {
    seed = (seed * 33 + digits.charCodeAt(i)) % 2147483647
  }
  const surname = DERIVED_SURNAMES[seed % DERIVED_SURNAMES.length]
  const middle = DERIVED_MIDDLES[Math.floor(seed / 31) % DERIVED_MIDDLES.length]
  const given = DERIVED_GIVENS[Math.floor(seed / 97) % DERIVED_GIVENS.length]
  return `${surname} ${middle} ${given}`
}

export { BANKS, bankList } from './banks.js'

export const products = [
  { id: 'p1', title: 'Tiết kiệm online', desc: 'Lãi suất hấp dẫn đến 5.6%/năm', tag: 'Phổ biến', color: '#1a9c4a' },
  { id: 'p2', title: 'Thẻ tín dụng VCB', desc: 'Hoàn tiền đến 5%, miễn phí thường niên năm đầu', tag: 'Ưu đãi', color: '#0b6b32' },
  { id: 'p3', title: 'Vay tiêu dùng', desc: 'Duyệt nhanh, lãi suất từ 7.2%/năm', tag: 'Mới', color: '#148c3e' },
  { id: 'p4', title: 'Bảo hiểm nhân thọ', desc: 'An tâm tài chính cho gia đình', tag: '', color: '#2e7d32' },
  { id: 'p5', title: 'Đầu tư chứng chỉ quỹ', desc: 'Bắt đầu từ 50.000 VND', tag: 'Hot', color: '#1b5e20' },
  { id: 'p6', title: 'VCB Digigold', desc: 'Mua bán vàng miếng SJC trực tuyến', tag: '', color: '#c9a227' }
]

export const bills = [
  { id: 'b1', name: 'Điện EVN', provider: 'EVN HCMC', icon: 'bolt' },
  { id: 'b2', name: 'Nước SAWACO', provider: 'SAWACO', icon: 'water' },
  { id: 'b3', name: 'Internet FPT', provider: 'FPT Telecom', icon: 'wifi' },
  { id: 'b4', name: 'Truyền hình', provider: 'K+', icon: 'tv' },
  { id: 'b5', name: 'Học phí', provider: 'Nhà trường', icon: 'school' },
  { id: 'b6', name: 'Viễn thông', provider: 'Viettel / Mobi / Vina', icon: 'phone' }
]

export const telcos = [
  { id: 'viettel', name: 'Viettel', color: '#ee0033' },
  { id: 'mobi', name: 'Mobifone', color: '#0066b3' },
  { id: 'vina', name: 'Vinaphone', color: '#00a0e3' },
  { id: 'vietnamobile', name: 'Vietnamobile', color: '#f5a623' }
]

export const topupAmounts = [20000, 30000, 50000, 100000, 200000, 500000]

export const savingsTerms = [
  { months: 1, rate: 2.4 },
  { months: 3, rate: 3.2 },
  { months: 6, rate: 4.5 },
  { months: 9, rate: 4.8 },
  { months: 12, rate: 5.6 },
  { months: 24, rate: 5.4 }
]

export const allFeatures = [
  { id: 'transfer', title: 'Chuyển tiền trong nước', path: '/transfer', group: 'Chuyển tiền' },
  { id: 'intl', title: 'Chuyển tiền quốc tế', path: '/intl-transfer', group: 'Chuyển tiền' },
  { id: 'qr', title: 'QR của tôi', path: '/qr', group: 'Chuyển tiền' },
  { id: 'savings', title: 'Mở tiết kiệm', path: '/savings', group: 'Tiết kiệm & Đầu tư' },
  { id: 'analytics', title: 'Phân tích chi tiêu', path: '/analytics', group: 'Tiết kiệm & Đầu tư' },
  { id: 'rates', title: 'Tỷ giá ngoại tệ', path: '/rates', group: 'Tiết kiệm & Đầu tư' },
  { id: 'topup', title: 'Nạp tiền điện thoại', path: '/topup', group: 'Thanh toán' },
  { id: 'bill', title: 'Thanh toán trong nước', path: '/bills', group: 'Thanh toán' },
  { id: 'card', title: 'Quản lý thẻ', path: '/cards', group: 'Thẻ' },
  { id: 'beneficiaries', title: 'Người thụ hưởng', path: '/beneficiaries', group: 'Chuyển tiền' },
  { id: 'history', title: 'Lịch sử giao dịch', path: '/history', group: 'Tài khoản' },
  { id: 'accounts', title: 'Danh sách tài khoản', path: '/accounts', group: 'Tài khoản' },
  { id: 'settings', title: 'Cài đặt & Bảo mật', path: '/settings', group: 'Tài khoản' },
  { id: 'rewards', title: 'VCB Rewards', path: '/rewards', group: 'Ưu đãi' },
  { id: 'branches', title: 'Chi nhánh & ATM', path: '/branches', group: 'Tài khoản' },
  { id: 'scheduled', title: 'Giao dịch định kỳ', path: '/scheduled', group: 'Chuyển tiền' },
  { id: 'support', title: 'Hỗ trợ trực tuyến', path: '/support', group: 'Tài khoản' },
  { id: 'loans', title: 'Khoản vay', path: '/loans', group: 'Tiết kiệm & Đầu tư' },
  { id: 'certificates', title: 'Sổ tiết kiệm', path: '/certificates', group: 'Tiết kiệm & Đầu tư' },
  { id: 'kyc', title: 'Định danh eKYC', path: '/kyc', group: 'Tài khoản' }
]

export function formatVND(n, hide = false) {
  if (hide) return '*** *** ***'
  return Math.round(n).toLocaleString('vi-VN')
}

export function formatMoney(n, currency = 'VND', hide = false) {
  if (hide) return `*** *** *** ${currency}`
  if (currency === 'USD') {
    return `${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`
  }
  return `${formatVND(n)} ${currency}`
}

export function formatNow() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`
}

/** Định dạng "09:30, Thứ tư 30/08/2023" */
export function formatFullDate(d = new Date()) {
  const days = ['Chủ Nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
  const p = (n) => String(n).padStart(2, '0')
  return `${p(d.getHours())}:${p(d.getMinutes())}, ${days[d.getDay()]} ${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`
}

/** Đọc số tiền VND bằng chữ */
export function amountToWords(n) {
  const num = Math.round(Math.abs(Number(n) || 0))
  if (num === 0) return 'Không đồng'
  const units = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín']
  const readGroup = (x) => {
    const s = String(x).padStart(3, '0')
    const h = Number(s[0])
    const t = Number(s[1])
    const o = Number(s[2])
    let out = ''
    if (h > 0) out += units[h] + ' trăm'
    if (t > 0) {
      if (out) out += ' '
      if (t === 1 && h === 0) out += 'mốt'
      else if (t === 4 && h === 0) out += 'tư'
      else if (t === 5) out += 'lăm'
      else out += units[t]
    }
    if (o > 0) {
      if (out) out += ' '
      if (o === 1 && t > 0) out += 'một'
      else if (o === 5) out += 'lăm'
      else out += units[o]
    }
    return out
  }
  const scales = ['', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ']
  const groups = []
  let rest = num
  while (rest > 0) {
    groups.push(rest % 1000)
    rest = Math.floor(rest / 1000)
  }
  const parts = []
  for (let i = groups.length - 1; i >= 0; i--) {
    const g = groups[i]
    if (g === 0) continue
    const text = readGroup(g)
    parts.push(`${text}${scales[i]}`)
  }
  let text = parts.join(' ')
  text = text.charAt(0).toUpperCase() + text.slice(1)
  return `${text} đồng`
}

export const alerts = [
  { id: 'n1', title: 'Hoan tien VCB Rewards', body: 'Ban vua nhan 125.000 VND hoan tien vao tai khoan thanh toan.', time: '25/10/2026', unread: true },
  { id: 'n2', title: 'Uu dai the Platinum', body: 'Mien phi thuong nien nam dau khi dang ky phat hanh online.', time: '20/10/2026', unread: true },
  { id: 'n3', title: 'Bao mat tai khoan', body: 'Khong chia se ma PIN/OTP voi bat ky ai, ke ca nhan vien ngan hang.', time: '15/10/2026', unread: false }
]

export const DEFAULT_FAVORITES = ['transfer', 'savings', 'topup', 'card', 'bill', 'intl']

export const exchangeRates = [
  { code: 'USD', name: 'USD', flag: 'US', buy: 24850, transfer: 24870, sell: 25020 },
  { code: 'EUR', name: 'EUR', flag: 'EU', buy: 26480, transfer: 26520, sell: 26850 },
  { code: 'GBP', name: 'GBP', flag: 'GB', buy: 31250, transfer: 31310, sell: 31800 },
  { code: 'JPY', name: 'JPY (100)', flag: 'JP', buy: 16420, transfer: 16470, sell: 16850 },
  { code: 'AUD', name: 'AUD', flag: 'AU', buy: 16120, transfer: 16170, sell: 16480 },
  { code: 'CAD', name: 'CAD', flag: 'CA', buy: 17850, transfer: 17900, sell: 18200 },
  { code: 'CHF', name: 'CHF', flag: 'CH', buy: 28120, transfer: 28170, sell: 28600 },
  { code: 'CNY', name: 'CNY', flag: 'CN', buy: 3420, transfer: 3435, sell: 3490 },
  { code: 'SGD', name: 'SGD', flag: 'SG', buy: 18520, transfer: 18580, sell: 18900 },
  { code: 'KRW', name: 'KRW (100)', flag: 'KR', buy: 1880, transfer: 1890, sell: 1930 },
  { code: 'HKD', name: 'HKD', flag: 'HK', buy: 3180, transfer: 3190, sell: 3240 },
  { code: 'THB', name: 'THB', flag: 'TH', buy: 715, transfer: 720, sell: 745 }
]

export const spendingCategories = [
  { id: 'transfer', label: 'Chuyển tiền', amount: 2500000, color: '#1a9c4a', icon: 'transfer' },
  { id: 'bill', label: 'Thanh toán hoá đơn', amount: 865000, color: '#2196f3', icon: 'bill' },
  { id: 'topup', label: 'Nạp điện thoại', amount: 100000, color: '#ff9800', icon: 'topup' },
  { id: 'savings', label: 'Tiết kiệm', amount: 50000000, color: '#9c27b0', icon: 'savings' },
  { id: 'shopping', label: 'Mua sắm QR Pay', amount: 329000, color: '#e91e63', icon: 'shopping' },
  { id: 'other', label: 'Khác', amount: 0, color: '#607d8b', icon: 'other' }
]

export const monthlySpending = [
  { month: 'T5', amount: 38500000 },
  { month: 'T6', amount: 42100000 },
  { month: 'T7', amount: 31200000 },
  { month: 'T8', amount: 52800000 },
  { month: 'T9', amount: 45600000 },
  { month: 'T10', amount: 58295000 }
]

export const existingCards = [
  {
    id: 'card-1',
    name: 'VCB Platinum',
    type: 'Tín dụng',
    number: '4512 **** **** 7890',
    fullNumber: '4512000000007890',
    holder: 'NGUYEN VAN A',
    expiry: '08/28',
    color: 'platinum',
    balance: 15200000,
    limit: 100000000,
    active: true
  },
  {
    id: 'card-2',
    name: 'VCB Classic',
    type: 'Ghi nợ',
    number: '970436 **** **** 1234',
    fullNumber: '9704360000001234',
    holder: 'NGUYEN VAN A',
    expiry: '05/27',
    color: 'classic',
    balance: 128450000,
    limit: 0,
    active: true
  }
]

/* === VCB Rewards === */
export const rewardsData = {
  points: 2840,
  tier: 'Silver',
  nextTier: 'Gold',
  pointsToNext: 660,
  expiryDate: '31/12/2027'
}

export const rewardCatalog = [
  { id: 'r1', title: 'Voucher Shopee 50.000đ', points: 500, cat: 'Shopping', icon: 'shopping', desc: 'Áp dụng cho đơn hàng từ 100.000đ' },
  { id: 'r2', title: 'Voucher Grab 30.000đ', points: 300, cat: 'Di chuyển', icon: 'car', desc: 'Áp dụng cho tất cả dịch vụ Grab' },
  { id: 'r3', title: 'Thẻ cào Viettel 100.000đ', points: 1000, cat: 'Viễn thông', icon: 'phone', desc: 'Nạp trực tiếp vào số điện thoại' },
  { id: 'r4', title: 'Voucher Highlands Coffee 100.000đ', points: 850, cat: 'F&B', icon: 'coffee', desc: 'Sử dụng tại tất cả cửa hàng Highlands' },
  { id: 'r5', title: 'Voucher Lotte Mart 200.000đ', points: 1800, cat: 'Shopping', icon: 'shopping', desc: 'Áp dụng cho hóa đơn từ 500.000đ' },
  { id: 'r6', title: 'Miễn phí thường niên thẻ Platinum', points: 2500, cat: 'Ngân hàng', icon: 'card', desc: 'Miễn phí thường niên 1 năm cho thẻ VCB Platinum' },
  { id: 'r7', title: 'Voucher CGV Cinema 100.000đ', points: 900, cat: 'Giải trí', icon: 'ticket', desc: 'Áp dụng cho tất cả rạp CGV trên toàn quốc' },
  { id: 'r8', title: 'Tặng 50.000đ vào tài khoản', points: 600, cat: 'Ngân hàng', icon: 'wallet', desc: 'Tiền mặt được cộng vào tài khoản thanh toán' }
]

export const redemptionHistory = [
  { id: 'rd1', title: 'Voucher Shopee 50.000đ', points: 500, date: '15/10/2026', status: 'Đã sử dụng', code: 'SHP-XXXX-XXXX-50K' },
  { id: 'rd2', title: 'Thẻ cào Viettel 50.000đ', points: 500, date: '02/09/2026', status: 'Chưa sử dụng', code: 'VTP-98210345' },
  { id: 'rd3', title: 'Voucher Grab 30.000đ', points: 300, date: '18/08/2026', status: 'Hết hạn', code: 'GRB-XXXX-XXXX-30K' }
]

/* === Branch / ATM Locator === */
export const branches = [
  {
    id: 'br1', name: 'VCB Hội sở', type: 'branch',
    address: '16 Thống Nhất, P.4, Tân Bình, TP.HCM',
    distance: 1.2, hours: '08:00 - 17:00 (T2-T6)',
    phone: '028 3942 1234', lat: 10.8001, lng: 106.6519,
    services: ['Cá nhân', 'Doanh nghiệp', 'FX', 'Safe box'],
    open: true
  },
  {
    id: 'br2', name: 'VCB Quận 1', type: 'branch',
    address: '23 Nguyễn Huệ, P.Bến Nghé, Q.1, TP.HCM',
    distance: 2.8, hours: '08:00 - 17:00 (T2-T6)',
    phone: '028 3829 5678', lat: 10.7763, lng: 106.7023,
    services: ['Cá nhân', 'Doanh nghiệp', 'FX'],
    open: true
  },
  {
    id: 'br3', name: 'VCB ATM Thống Nhất', type: 'atm',
    address: '16 Thống Nhất, P.4, Tân Bình, TP.HCM',
    distance: 1.2, hours: '24/7',
    phone: '', lat: 10.8001, lng: 106.6519,
    services: ['Rút tiền', 'Gửi tiền mặt', 'Chuyển khoản'],
    open: true
  },
  {
    id: 'br4', name: 'VCB ATM Lê Lợi', type: 'atm',
    address: '12 Lê Lợi, P.Bến Thành, Q.1, TP.HCM',
    distance: 3.1, hours: '24/7',
    phone: '', lat: 10.7731, lng: 106.6998,
    services: ['Rút tiền', 'Chuyển khoản'],
    open: true
  },
  {
    id: 'br5', name: 'VCB Quận 3', type: 'branch',
    address: '78 Võ Văn Tần, P.6, Q.3, TP.HCM',
    distance: 4.5, hours: '08:00 - 17:00 (T2-T6)',
    phone: '028 3930 1122', lat: 10.7698, lng: 106.6901,
    services: ['Cá nhân', 'Doanh nghiệp'],
    open: false
  },
  {
    id: 'br6', name: 'VCB ATM Nguyễn Trãi', type: 'atm',
    address: '240 Nguyễn Trãi, P.Nguyễn Cư Trinh, Q.1, TP.HCM',
    distance: 3.6, hours: '24/7',
    phone: '', lat: 10.7561, lng: 106.6651,
    services: ['Rút tiền', 'Gửi tiền mặt'],
    open: true
  }
]

/* === Scheduled Transactions === */
export const scheduledTx = [
  {
    id: 'sch1', title: 'Chuyển tiền cho TRAN THI B',
    amount: 2500000, account: '0071001234567', bank: 'Vietcombank',
    name: 'TRAN THI B', memo: 'Tien an hang thang',
    frequency: 'Hàng tháng', nextDate: '15/11/2026',
    status: 'active', count: 6
  },
  {
    id: 'sch2', title: 'Thanh toán hoá đơn điện EVN',
    amount: 865000, account: '', bank: '',
    name: 'EVN HCMC', memo: 'Thanh toan dien',
    frequency: 'Hàng tháng', nextDate: '10/11/2026',
    status: 'active', count: 12
  },
  {
    id: 'sch3', title: 'Nạp tiền điện thoại 0000000000',
    amount: 100000, account: '', bank: '',
    name: 'Viettel', memo: 'Nap tien thang',
    frequency: 'Hàng tháng', nextDate: '05/11/2026',
    status: 'paused', count: 8
  },
  {
    id: 'sch4', title: 'Chuyển tiền tiết kiệm tự động',
    amount: 10000000, account: '1001007654321', bank: 'Vietcombank',
    name: 'NGUYEN VAN A', memo: 'Tiet kiem tu dong',
    frequency: 'Hàng tháng', nextDate: '28/11/2026',
    status: 'active', count: 3
  }
]

/* === Chat Support quick prompts === */
export const supportQuickPrompts = [
  'Làm thế nào để khoá thẻ?',
  'Tỷ giá USD hôm nay?',
  'Cách đặt lịch chuyển tiền?',
  'Hạn mức chuyển tiền?',
  'Mất điện thoại该怎么办?',
  'Cách mở tiết kiệm online?'
]

export const supportBotReplies = [
  'Chào bạn, tôi là VCB Assistant. Tôi có thể giúp gì cho bạn hôm nay?',
  'Để khoá thẻ: vào Quản lý thẻ → chọn thẻ → Khoá thẻ. Thẻ sẽ bị khoá ngay lập tức.',
  'Tỷ giá USD hôm nay: Mua vào 24.850đ, Bán ra 25.020đ. Bạn có thể xem chi tiết tại mục Tỷ giá ngoại tệ.',
  'Để đặt lịch chuyển tiền: vào Chuyển tiền → chọn người nhận → bật "Lịch chuyển tự động" → chọn tần suất và ngày thực hiện.',
  'Hạn mức chuyển tiền: Tối đa 500.000.000 VND/giao dịch, 2.000.000.000 VND/ngày.',
  'Nếu mất điện thoại, vui lòng gọi ngay 1900 54 54 68 để khoá tạm thời VCB Digibank. Không chia sẻ PIN/OTP với bất kỳ ai.',
  'Để mở tiết kiệm online: vào Sản phẩm → Tiết kiệm online → chọn kỳ hạn → nhập số tiền → xác nhận. Lãi suất lên đến 5.6%/năm.'
]

/* === Loans === */
export const loansData = [
  {
    id: 'ln1',
    name: 'Vay tiêu dùng cá nhân',
    type: 'Tiêu dùng',
    amount: 150000000,
    disbursed: '15/08/2026',
    rate: 7.2,
    termMonths: 36,
    paidMonths: 3,
    monthlyPayment: 4641000,
    remaining: 136077000,
    status: 'active',
    nextDueDate: '15/11/2026',
    account: '1234567824333'
  },
  {
    id: 'ln2',
    name: 'Vay mua ô tô',
    type: 'Mua xe',
    amount: 800000000,
    disbursed: '10/03/2026',
    rate: 8.5,
    termMonths: 60,
    paidMonths: 8,
    monthlyPayment: 16380000,
    remaining: 669600000,
    status: 'active',
    nextDueDate: '10/11/2026',
    account: '1234567824333'
  }
]

export const loanSchedule = [
  { no: 1, dueDate: '15/09/2026', principal: 4178000, interest: 463000, total: 4641000, status: 'paid' },
  { no: 2, dueDate: '15/10/2026', principal: 4201000, interest: 440000, total: 4641000, status: 'paid' },
  { no: 3, dueDate: '15/11/2026', principal: 4225000, interest: 416000, total: 4641000, status: 'due' },
  { no: 4, dueDate: '15/12/2026', principal: 4249000, interest: 392000, total: 4641000, status: 'upcoming' },
  { no: 5, dueDate: '15/01/2027', principal: 4273000, interest: 368000, total: 4641000, status: 'upcoming' },
  { no: 6, dueDate: '15/02/2027', principal: 4297000, interest: 344000, total: 4641000, status: 'upcoming' }
]

/* EMI calculation: P * r * (1+r)^n / ((1+r)^n - 1), r = monthlyRate */
export function calcEMI(principal, annualRate, months) {
  const r = annualRate / 100 / 12
  if (r === 0) return principal / months
  const factor = Math.pow(1 + r, months)
  return Math.round((principal * r * factor) / (factor - 1))
}

/* === Deposit Certificates === */
export const certificates = [
  {
    id: 'cert-1',
    code: 'SV2610280001',
    name: 'Tiết kiệm 6 tháng',
    amount: 50000000,
    rate: 4.5,
    openDate: '28/10/2026',
    maturityDate: '28/04/2027',
    termMonths: 6,
    interestEarned: 0,
    status: 'active',
    autoRenew: true,
    account: 'acc-2'
  },
  {
    id: 'cert-2',
    code: 'SV2604200002',
    name: 'Tiết kiệm 12 tháng',
    amount: 100000000,
    rate: 5.6,
    openDate: '20/04/2026',
    maturityDate: '20/04/2027',
    termMonths: 12,
    interestEarned: 2800000,
    status: 'active',
    autoRenew: false,
    account: 'acc-2'
  },
  {
    id: 'cert-3',
    code: 'SV2506150003',
    name: 'Tiết kiệm 3 tháng',
    amount: 30000000,
    rate: 3.2,
    openDate: '15/06/2025',
    maturityDate: '15/09/2025',
    termMonths: 3,
    interestEarned: 240000,
    status: 'matured',
    autoRenew: false,
    account: 'acc-2'
  }
]

/* === eKYC / Identity === */
export const kycData = {
  status: 'verified',
  verifiedDate: '15/01/2026',
  level: 'eKYC nâng cao',
  cccd: '0123456789',
  cccdIssueDate: '15/06/2021',
  cccdIssuePlace: 'Hà Nội',
  cccdExpiry: '15/06/2041',
  fullName: 'NGUYEN VAN A',
  dob: '01/01/1990',
  gender: 'Nam',
  nationality: 'Việt Nam',
  address: '123 Lê Lợi, Q.1, TP.HCM',
  addressType: 'Thường trú',
  email: 'nva@email.com',
  phone: '0000000000',
  taxCode: '8123456789',
  documents: [
    { id: 'doc1', type: 'CCCD mặt trước', status: 'verified', uploadDate: '15/01/2026' },
    { id: 'doc2', type: 'CCCD mặt sau', status: 'verified', uploadDate: '15/01/2026' },
    { id: 'doc3', type: 'Ảnh chân dung', status: 'verified', uploadDate: '15/01/2026' },
    { id: 'doc4', type: 'Giấy tờ chứng minh thu nhập', status: 'optional', uploadDate: '' }
  ]
}

/* === Home Promotional Banners === */
export const promos = [
  { id: 'promo1', title: 'Hoàn tiền 5% thanh toán QR Pay', subtitle: 'Tối đa 500.000đ/tháng', tag: 'Hot', color: '#1a9c4a' },
  { id: 'promo2', title: 'Miễn phí thường niên thẻ Platinum', subtitle: 'Cho năm đầu tiên', tag: 'Ưu đãi', color: '#0b6b32' },
  { id: 'promo3', title: 'Lãi suất tiết kiệm đến 5.6%/năm', subtitle: 'Kỳ hạn 12 tháng', tag: 'Mới', color: '#148c3e' },
  { id: 'promo4', title: 'Vay tiêu dùng lãi suất từ 7.2%', subtitle: 'Duyệt nhanh 24h', tag: '', color: '#2e7d32' }
]
