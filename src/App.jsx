import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { loadBanks } from './banks.js'
import { IconHome, IconProducts, IconQr } from './icons.jsx'
import { useStore } from './store.jsx'
import Splash from './screens/Splash.jsx'
import Login from './screens/Login.jsx'
import Home from './screens/Home.jsx'
import Transfer from './screens/Transfer.jsx'
import History from './screens/History.jsx'
import Accounts from './screens/Accounts.jsx'
import MyQR from './screens/MyQR.jsx'
import ScanQR from './screens/ScanQR.jsx'
import Savings from './screens/Savings.jsx'
import Topup from './screens/Topup.jsx'
import Bills from './screens/Bills.jsx'
import Cards from './screens/Cards.jsx'
import IntlTransfer from './screens/IntlTransfer.jsx'
import Products from './screens/Products.jsx'
import AllFeatures from './screens/AllFeatures.jsx'
import TransactionDetail from './screens/TransactionDetail.jsx'
import Result from './screens/Result.jsx'
import Confirm from './screens/Confirm.jsx'
import Notifications from './screens/Notifications.jsx'
import Profile from './screens/Profile.jsx'
import ExchangeRates from './screens/ExchangeRates.jsx'
import Analytics from './screens/Analytics.jsx'
import Beneficiaries from './screens/Beneficiaries.jsx'
import Settings from './screens/Settings.jsx'
import Support from './screens/Support.jsx'
import Branches from './screens/Branches.jsx'
import Rewards from './screens/Rewards.jsx'
import Scheduled from './screens/Scheduled.jsx'
import Loans from './screens/Loans.jsx'
import Certificates from './screens/Certificates.jsx'
import KYC from './screens/KYC.jsx'

function TabBar() {
  const nav = useNavigate()
  const loc = useLocation()
  const onHome = loc.pathname === '/home'
  const onProducts = loc.pathname === '/products'
  return (
    <div className="tabbar">
      <button className={`tab ${onHome ? 'active' : ''}`} onClick={() => nav('/home')}>
        <IconHome filled={onHome} color={onHome ? '#1a9c4a' : '#9aa3a0'} />
        Trang chủ
      </button>
      <button className="tab-qr" onClick={() => nav('/scan')} aria-label="QR">
        <IconQr size={26} color="#fff" />
      </button>
      <button className={`tab ${onProducts ? 'active' : ''}`} onClick={() => nav('/products')}>
        <IconProducts color={onProducts ? '#1a9c4a' : '#9aa3a0'} />
        Sản phẩm
      </button>
    </div>
  )
}

function Shell({ children, tabs = false, splash = false }) {
  const loc = useLocation()
  const showTabs = tabs && ['/home', '/products'].includes(loc.pathname)
  return (
    <div className="app-shell">
      <div className={`screen ${splash ? 'splash' : ''}`}>
        {children}
        {showTabs && <TabBar />}
      </div>
    </div>
  )
}

export default function App() {
  const [booting, setBooting] = useState(true)
  const nav = useNavigate()
  const loc = useLocation()
  const { authed } = useStore()

  useEffect(() => {
    loadBanks()
    const t = setTimeout(() => setBooting(false), 1400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (booting) return
    if (!authed && loc.pathname !== '/login') nav('/login', { replace: true })
    if (authed && (loc.pathname === '/' || loc.pathname === '/login')) nav('/home', { replace: true })
  }, [booting, authed, loc.pathname, nav])

  if (booting || loc.pathname === '/') {
    return (
      <Shell splash>
        <Splash />
      </Shell>
    )
  }

  if (!authed) {
    return (
      <Shell>
        <Login />
      </Shell>
    )
  }

  return (
    <Shell tabs>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/intl-transfer" element={<IntlTransfer />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:id" element={<TransactionDetail />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/qr" element={<MyQR />} />
        <Route path="/scan" element={<ScanQR />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/topup" element={<Topup />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/products" element={<Products />} />
        <Route path="/features" element={<AllFeatures />} />
        <Route path="/result" element={<Result />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/notify" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rates" element={<ExchangeRates />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/beneficiaries" element={<Beneficiaries />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/scheduled" element={<Scheduled />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/kyc" element={<KYC />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Shell>
  )
}
