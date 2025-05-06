import { useNavigate } from 'react-router-dom'
import { logout } from '../lib/api'

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav>
      <button onClick={handleLogout}>Logout</button>
    </nav>
)}

export default Navbar
