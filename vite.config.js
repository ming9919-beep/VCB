import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function sendJson(res, status, data) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(data))
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    let size = 0
    let tooLarge = false
    req.setEncoding('utf8')
    req.on('data', (chunk) => {
      size += Buffer.byteLength(chunk)
      if (size > 8192) tooLarge = true
      else if (!tooLarge) body += chunk
    })
    req.on('end', () => {
      if (tooLarge) {
        const error = new Error('Request body is too large')
        error.status = 413
        reject(error)
        return
      }
      try {
        resolve(JSON.parse(body || '{}'))
      } catch {
        const error = new Error('Invalid JSON body')
        error.status = 400
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

const LOOKUP_ERROR_MESSAGES = {
  OUT_OF_CREDIT: 'Tài khoản tra cứu đã hết credit. Vui lòng nạp thêm credit cho dịch vụ BankLookup.',
  IP_NOT_ALLOWED: 'IP hiện tại chưa được cho phép. Vui lòng thêm IP vào whitelist của dịch vụ tra cứu.',
  ACCOUNT_BLACKLIST: 'Số tài khoản này không được phép tra cứu.',
  CANNOT_INVOKE_SERVICE: 'Nhà cung cấp tra cứu tạm thời không phản hồi, vui lòng thử lại sau.',
  TOO_MANY_REQUESTS: 'Quá nhiều yêu cầu tra cứu, vui lòng thử lại sau ít phút.',
  NOT_FOUND: 'Không tìm thấy tên chủ tài khoản cho số tài khoản này.',
  BAD_CREDENTIALS: 'Dịch vụ tra cứu từ chối yêu cầu (BAD_CREDENTIALS). Thường do IP chưa nằm trong whitelist hoặc quyền tra cứu chưa được kích hoạt. Vui lòng kiểm tra tại banklookup.net.',
  API_INFO_NOT_FOUND: 'Không tìm thấy thông tin API Key. Vui lòng kiểm tra lại API Key / API Secret tại banklookup.net.'
}

function mapLookupError(code, msg) {
  const key = String(msg || '').trim().toUpperCase()
  if (LOOKUP_ERROR_MESSAGES[key]) return LOOKUP_ERROR_MESSAGES[key]
  if (code === 402) return LOOKUP_ERROR_MESSAGES.OUT_OF_CREDIT
  if (code === 403) return LOOKUP_ERROR_MESSAGES.IP_NOT_ALLOWED
  if (code === 429) return LOOKUP_ERROR_MESSAGES.TOO_MANY_REQUESTS
  if (code === 422) return LOOKUP_ERROR_MESSAGES.NOT_FOUND
  return 'Không tra cứu được tên chủ tài khoản'
}

function beneficiaryLookupPlugin(env) {
  const apiKey = String(env.BANKLOOKUP_API_KEY || '').trim()
  const apiSecret = String(env.BANKLOOKUP_API_SECRET || '').trim()
  const sandbox = /^(1|true|yes)$/i.test(String(env.BANKLOOKUP_SANDBOX || '').trim())
  const base = sandbox ? 'https://api.banklookup.net/sandbox' : 'https://api.banklookup.net'

  const middleware = async (req, res, next) => {
    const pathname = new URL(req.url || '/', 'http://localhost').pathname
    const verifyEndpoint = pathname === '/api/verify-beneficiary'
    if (pathname !== '/api/vietqr/lookup' && !verifyEndpoint) return next()
    const reject = (status, message) => sendJson(
      res,
      status,
      verifyEndpoint ? { verified: false, error: message } : { message }
    )
    if (req.method !== 'POST') return reject(405, 'Chỉ hỗ trợ POST')
    if (!apiKey || !apiSecret) {
      return reject(503, 'Thiếu cấu hình tra cứu tên tài khoản ở máy chủ. Hãy đặt BANKLOOKUP_API_KEY và BANKLOOKUP_API_SECRET trong .env.local')
    }

    let input
    try {
      input = await readJsonBody(req)
    } catch (error) {
      return reject(error.status || 400, error.status === 413
        ? 'Dữ liệu gửi lên quá lớn'
        : 'Dữ liệu yêu cầu không hợp lệ')
    }

    const content = String(input.content || '').trim()
    const bankCode = String(input.bankCode || '').trim()
    const accountNumber = String(input.accountNumber || '').trim()

    let endpoint = ''
    let payload = null
    if (content) {
      endpoint = `${base}/qr-content`
      payload = { content }
    } else if (bankCode && /^\d{6,30}$/.test(accountNumber)) {
      endpoint = base
      payload = { bank: bankCode, account: accountNumber }
    }
    if (!payload) {
      return reject(400, 'Thiếu nội dung QR hoặc thông tin tài khoản để tra cứu')
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    try {
      const upstream = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'x-api-key': apiKey,
          'x-api-secret': apiSecret
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      })
      const result = await upstream.json().catch(() => ({}))
      const code = Number(result?.code) || upstream.status
      const msg = String(result?.msg || '').trim()
      const accountName = String(result?.data?.ownerName || '').trim()

      if (upstream.ok && result?.success !== false && code === 200 && accountName) {
        const data = { accountName, bankName: String(result?.data?.bank || '') }
        if (verifyEndpoint) return sendJson(res, 200, { verified: true, ...data })
        return sendJson(res, 200, data)
      }

      const status = code === 402 || code === 403 || code === 429 || code === 422 ? code : 502
      return reject(status, mapLookupError(code, msg))
    } catch {
      return reject(502, 'Không thể kết nối dịch vụ tra cứu tên tài khoản')
    } finally {
      clearTimeout(timeout)
    }
  }

  return {
    name: 'beneficiary-lookup',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    }
  }
}

export default defineConfig(({ mode }) => {
  const serverEnv = loadEnv(mode, process.cwd(), '')
  const readerBase = String(serverEnv.VIETQR_READER_BASE_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '')
  const readerProxy = {
    '/vqr': {
      target: readerBase,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/vqr/, '')
    }
  }
  return {
    base: process.env.VITE_BASE || '/',
    plugins: [react(), beneficiaryLookupPlugin(serverEnv)],
    optimizeDeps: {
      include: ['vietqr', 'jsqr', 'tesseract.js']
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: ['.monkeycode-ai.live'],
      proxy: readerProxy
    },
    preview: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: ['.monkeycode-ai.live'],
      proxy: readerProxy
    }
  }
})
