import { useNavigate } from 'react-router-dom'
import { logout } from '../lib/api'

function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <button onClick={handleLogout} className="btn btn-dark">
      Logout
    </button>
  )
}

export default LogoutButton
