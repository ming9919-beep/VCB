import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  accounts as seedAccounts,
  alerts as seedAlerts,
  beneficiaries as seedBeneficiaries,
  knownPayees as seedKnown,
  DEFAULT_FAVORITES,
  formatFullDate,
  formatNow,
  transactions as seedTx,
  user as seedUser
} from './data.js'
import { demoPaymentPassword } from './demoAuth.js'

function nextRef(prefix = 'FT') {
  return `${prefix}${Date.now().toString().slice(-10)}`
}

function readStored(key, fallback, isValid) {
  try {
    if (typeof window === 'undefined') return fallback
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    const value = JSON.parse(raw)
    return isValid(value) ? value : fallback
  } catch {
    return fallback
  }
}

function writeStored(key, value) {
  try {
    if (typeof window !== 'undefined') window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // 浏览器存储不可用时，继续使用内存中的演示数据。
  }
}

const OLD_PRIMARY_ACCOUNT = '1001001234567'
const PRIMARY_ACCOUNT = '1234567824333'

function migrateUserAccount(value) {
  if (!value || typeof value !== 'object') return value
  return {
    ...value,
    accountNo: value.accountNo === '100100xxxxxxx' || value.accountNo === OLD_PRIMARY_ACCOUNT
      ? PRIMARY_ACCOUNT
      : value.accountNo,
    accountNoFull: value.accountNoFull === OLD_PRIMARY_ACCOUNT ? PRIMARY_ACCOUNT : value.accountNoFull
  }
}

function migrateAccounts(value) {
  return Array.isArray(value)
    ? value.map((account) => account.id === 'acc-1'
      ? { ...account, number: PRIMARY_ACCOUNT, masked: PRIMARY_ACCOUNT }
      : account)
    : value
}

function migrateTransactions(value) {
  return Array.isArray(value)
    ? value.map((tx) => tx.extra?.source === OLD_PRIMARY_ACCOUNT
      ? { ...tx, extra: { ...tx.extra, source: PRIMARY_ACCOUNT } }
      : tx)
    : value
}

const StoreCtx = createContext(null)

export function StoreProvider({ children }) {
  const [authed, setAuthed] = useState(false)
  const [user, setUser] = useState(() => migrateUserAccount(readStored('vcb-demo-user', seedUser, (value) => value && typeof value === 'object' && !Array.isArray(value))))
  const [accounts, setAccounts] = useState(() => migrateAccounts(readStored('vcb-demo-accounts', seedAccounts, Array.isArray)))
  const [transactions, setTransactions] = useState(() => migrateTransactions(readStored('vcb-demo-transactions', seedTx, Array.isArray)))
  const [beneficiaries, setBeneficiaries] = useState(seedBeneficiaries)
  const [alerts, setAlerts] = useState(seedAlerts)
  const [favorites, setFavorites] = useState(DEFAULT_FAVORITES)
  const [hideBalance, setHideBalance] = useState(true)
  const [sourceId, setSourceId] = useState('acc-1')
  const [paymentPassword, setPaymentPassword] = useState(() => readStored(
    'vcb-demo-payment-password',
    demoPaymentPassword,
    (value) => typeof value === 'string'
  ))
  const [scannedPayee, setScannedPayee] = useState(null)
  const [knownPayees, setKnownPayees] = useState(seedKnown)

  useEffect(() => writeStored('vcb-demo-user', user), [user])
  useEffect(() => writeStored('vcb-demo-accounts', accounts), [accounts])
  useEffect(() => writeStored('vcb-demo-transactions', transactions), [transactions])
  useEffect(() => writeStored('vcb-demo-payment-password', paymentPassword), [paymentPassword])

  function rememberPayee(account, name, bank) {
    const acc = String(account || '').replace(/\s/g, '')
    const nm = String(name || '').trim()
    if (!acc || !nm) return
    setKnownPayees((prev) => {
      if (prev.some((p) => p.account === acc)) {
        return prev.map((p) => (p.account === acc ? { ...p, name: nm, bank: bank || p.bank } : p))
      }
      return [{ account: acc, name: nm, bank: bank || '' }, ...prev]
    })
  }

  function lookupPayeeName(account) {
    const acc = String(account || '').replace(/\s/g, '')
    return knownPayees.find((p) => p.account === acc)?.name
      || beneficiaries.find((b) => String(b.account).replace(/\s/g, '') === acc)?.name
      || ''
  }

  const source = accounts.find((a) => a.id === sourceId) || accounts[0]

  function login() {
    setAuthed(true)
  }

  function logout() {
    setAuthed(false)
  }

  function debit(accountId, amount, currency = 'VND') {
    setAccounts((prev) => prev.map((a) => {
      if (a.id !== accountId) return a
      return { ...a, balance: Math.max(0, a.balance - amount) }
    }))
    if (accountId === 'acc-1' && currency === 'VND') {
      setUser((u) => ({ ...u, balance: Math.max(0, u.balance - amount) }))
    }
  }

  function credit(accountId, amount) {
    setAccounts((prev) => prev.map((a) => {
      if (a.id !== accountId) return a
      return { ...a, balance: a.balance + amount }
    }))
    if (accountId === 'acc-1') {
      setUser((u) => ({ ...u, balance: u.balance + amount }))
    }
  }

  function addTx(partial) {
    const tx = {
      id: `tx-${Date.now()}`,
      time: formatNow(),
      timeFull: formatFullDate(),
      status: 'Thành công',
      channel: 'VCB Digibank',
      ref: nextRef(partial.refPrefix || 'FT'),
      ...partial
    }
    setTransactions((prev) => [tx, ...prev])
    return tx
  }

  function addAlert(title, body) {
    setAlerts((prev) => [{
      id: `n-${Date.now()}`,
      title,
      body,
      time: formatNow().slice(0, 10),
      unread: true
    }, ...prev])
  }

  function markAlertsRead() {
    setAlerts((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  function saveBeneficiary(item) {
    setBeneficiaries((prev) => {
      const exists = prev.some((b) => b.account === item.account && b.bank === item.bank)
      if (exists) return prev
      return [{
        id: `bn-${Date.now()}`,
        name: item.name,
        bank: item.bank,
        account: item.account,
        last: item.last || ''
      }, ...prev]
    })
  }

  function applyTransfer({ amount, name, bank, account, memo, savePayee, title, channel, type = 'out' }) {
    const src = accounts.find((a) => a.id === sourceId) || accounts[0]
    const value = Number(amount)
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error('Số tiền giao dịch không hợp lệ.')
    }
    if (type !== 'in' && value > src.balance) {
      throw new Error('Số dư không đủ để thực hiện giao dịch.')
    }
    if (channel !== 'Chuyển tiền quốc tế' && value > 500000000) {
      throw new Error('Số tiền vượt hạn mức 500.000.000 VND mỗi giao dịch.')
    }
    if (type !== 'in' && String(account || '').replace(/\D/g, '') === String(src.number).replace(/\D/g, '')) {
      throw new Error('Không thể chuyển tiền vào chính tài khoản nguồn.')
    }
    debit(src.id, value, src.currency)
    const tx = addTx({
      title: title || `Chuyen tien den ${name}`,
      amount: type === 'in' ? value : -value,
      type,
      channel: channel || 'Chuyển khoản',
      accountId: src.id,
      extra: { name, bank, account, memo, source: src.number }
    })
    if (savePayee && name && account) {
      saveBeneficiary({
        name,
        bank,
        account,
        last: `${value.toLocaleString('vi-VN')} ${src.currency}`
      })
    }
    addAlert('Giao dịch thành công', `${title || 'Chuyển tiền'} ${value.toLocaleString('vi-VN')} ${src.currency}`)
    return tx
  }

  function applyBill({ amount, name, provider, code }) {
    debit(sourceId, amount)
    const tx = addTx({
      title: `Thanh toan ${name}`,
      amount: -amount,
      type: 'out',
      channel: 'Thanh toán',
      refPrefix: 'BL',
      extra: { provider, code }
    })
    addAlert('Thanh toán thành công', `${name} · ${amount.toLocaleString('vi-VN')} VND`)
    return tx
  }

  function applyTopup({ amount, phone, telco }) {
    debit(sourceId, amount)
    const tx = addTx({
      title: `Nap tien dien thoai ${phone}`,
      amount: -amount,
      type: 'out',
      channel: 'Nạp tiền',
      refPrefix: 'TP',
      extra: { telco }
    })
    addAlert('Nạp tiền thành công', `${phone} · ${amount.toLocaleString('vi-VN')} VND`)
    return tx
  }

  function applySavings({ amount, term, rate, interest }) {
    debit(sourceId, amount)
    credit('acc-2', amount)
    const tx = addTx({
      title: `Mo tiet kiem online ${term} thang`,
      amount: -amount,
      type: 'out',
      channel: 'Tiết kiệm',
      refPrefix: 'SV',
      extra: { term, rate, interest }
    })
    addAlert('Mở tiết kiệm thành công', `${term} tháng · ${amount.toLocaleString('vi-VN')} VND`)
    return tx
  }

  const value = useMemo(() => ({
    authed,
    login,
    logout,
    user,
    accounts,
    transactions,
    beneficiaries,
    alerts,
    unread: alerts.filter((a) => a.unread).length,
    favorites,
    setFavorites,
    hideBalance,
    setHideBalance,
    sourceId,
    setSourceId,
    paymentPassword,
    setPaymentPassword,
    source,
    scannedPayee,
    setScannedPayee,
    knownPayees,
    rememberPayee,
    lookupPayeeName,
    applyTransfer,
    applyBill,
    applyTopup,
    applySavings,
    markAlertsRead,
    addTx
  }), [authed, user, accounts, transactions, beneficiaries, alerts, favorites, hideBalance, sourceId, paymentPassword, scannedPayee, knownPayees])

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>
}

export function useStore() {
  return useContext(StoreCtx)
}
