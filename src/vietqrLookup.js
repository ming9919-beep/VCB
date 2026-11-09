export async function lookupVietQrAccountName({ content, bankCode, accountNumber, signal }) {
  const response = await fetch('/api/verify-beneficiary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, bankCode, accountNumber }),
    signal
  })
  const result = await response.json().catch(() => ({}))

  if (!response.ok || result.verified !== true || !result.accountName) {
    throw new Error(result.error || result.message || 'Không thể xác minh tên tài khoản')
  }

  return {
    verified: true,
    accountName: String(result.accountName).trim(),
    bankName: String(result.bankName || '').trim()
  }
}

export async function lookupVietQrRecipientName({ bankBin, accountNumber, signal }) {
  const response = await fetch(`${READER_BASE}/api/v1/lookup-account`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ bank_bin: bankBin, account_number: accountNumber }),
    signal
  })
  const result = await response.json().catch(() => ({}))

  if (!response.ok || !result.recipient_name) {
    throw new Error(readerError(result, 'Không thể tra cứu tên người nhận qua VietQR'))
  }

  return {
    verified: true,
    accountName: String(result.recipient_name).trim(),
    bankName: ''
  }
}

// VietQR Reader API is proxied through Vite to avoid browser CORS configuration.
const READER_BASE = '/vqr'

function readerError(result, fallback) {
  const detail = result?.detail
  if (typeof detail === 'string' && detail.trim()) return detail
  if (Array.isArray(detail) && detail[0]?.msg) return String(detail[0].msg)
  return fallback
}

export async function parseVietQrPayload(payload, signal) {
  const response = await fetch(`${READER_BASE}/api/v1/parse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ payload }),
    signal
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(readerError(result, 'Không giải mã được nội dung QR'))
  return result
}

export async function parseVietQrImage(file, signal) {
  const form = new FormData()
  form.append('image', file)
  const response = await fetch(`${READER_BASE}/api/v1/parse-image`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: form,
    signal
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(readerError(result, 'Không đọc được mã QR trong ảnh'))
  return result
}
