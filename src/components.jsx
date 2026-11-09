import { useNavigate } from 'react-router-dom'
import { IconPower } from './icons.jsx'
import { useStore } from './store.jsx'

export function ExitDemo() {
  const nav = useNavigate()
  const { logout } = useStore()
  return (
    <button className="exit-btn" onClick={() => { logout(); nav('/', { replace: true }) }}>
      <IconPower />
      Đóng trải nghiệm
    </button>
  )
}
