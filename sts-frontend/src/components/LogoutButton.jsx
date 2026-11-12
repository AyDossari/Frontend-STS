import { useNavigate } from 'react-router-dom'
import { logout } from '../lib/api'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

function LogoutButton({ variant = "outline", size = "default", className }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      className={className}
    >
      <LogOut className="size-4 mr-1.5" />
      Logout
    </Button>
  )
}

export default LogoutButton
