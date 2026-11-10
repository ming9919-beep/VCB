import { useState } from 'react'
import { useStore } from '../store.jsx'
import { IconLock, IconUser } from '../icons.jsx'
import { demoUsername, demoPhone, isDemoLoginValid } from '../demoAuth.js'

export default function Login() {
  const { login } = useStore()
  const [language, setLanguage] = useState('en')
  const [identity, setIdentity] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const english = language === 'en'
  const copy = english
    ? {
        welcome: 'Welcome',
        enterInfo: 'Sign in to your account',
        identity: 'Username or phone number',
        password: 'Login password',
        signIn: 'Sign in',
        invalid: 'The username, phone number, or password is incorrect.',
        missing: 'Demo login is not configured on this device.'
      }
    : {
        welcome: 'Xin chào',
        enterInfo: 'Đăng nhập tài khoản của bạn',
        identity: 'Tên đăng nhập hoặc số điện thoại',
        password: 'Mật khẩu đăng nhập',
        signIn: 'Đăng nhập',
        invalid: 'Tên đăng nhập, số điện thoại hoặc mật khẩu không chính xác.',
        missing: 'Thiết bị chưa được cấu hình tài khoản demo.'
      }

  function submit(event) {
    event.preventDefault()
    const hasDemoIdentity = Boolean(demoUsername || demoPhone)
    if (!hasDemoIdentity || !isDemoLoginValid(identity, password)) {
      setErr(hasDemoIdentity ? copy.invalid : copy.missing)
      return
    }
    setErr('')
    login()
  }

  return (
    <div className="login-page">
      <button
        className="login-language"
        type="button"
        aria-label={english ? 'Switch to Vietnamese' : 'Switch to English'}
        onClick={() => setLanguage(english ? 'vi' : 'en')}
      >
        <span className="login-vn-flag"><span>★</span></span>
      </button>

      <div className="login-hero">
        <div className="login-brand"><span className="g">VCB</span><span>Digibank</span></div>
        <div className="login-welcome">{copy.welcome}</div>
      </div>

      <form className="login-bottom" onSubmit={submit}>
        <label className="login-instruction" htmlFor="login-identity">{copy.enterInfo}</label>
        <div className="login-input-wrap">
          <IconUser size={22} color="#707a7d" />
          <input
            id="login-identity"
            type="text"
            autoComplete="username"
            value={identity}
            onChange={(event) => { setIdentity(event.target.value); setErr('') }}
            placeholder={copy.identity}
            required
          />
        </div>
        <div className="login-input-wrap login-password-wrap">
          <IconLock size={22} color="#707a7d" />
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(event) => { setPassword(event.target.value); setErr('') }}
            placeholder={copy.password}
            required
          />
          <button
            className="login-password-toggle"
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Ẩn' : 'Hiện'}
          </button>
        </div>
        {err && <div className="login-err" role="alert">{err}</div>}
        <button className="login-guest" type="submit">{copy.signIn}</button>
      </form>
    </div>
  )
}
