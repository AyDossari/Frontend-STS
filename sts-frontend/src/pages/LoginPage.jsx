import { useState } from 'react'
import { setTokens, authorizedRequest } from '../lib/api'
import axios from 'axios'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()


  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    event.preventDefault()
    setError('')

    try {
      const response = await axios.post(`${apiUrl}/api/token/`, formData)
      setTokens({
        access: response.data.access,
        refresh: response.data.refresh
      })

      try {
        const driverProfile = await authorizedRequest('get', '/driver/profile/')
        if (driverProfile?.data) {
          navigate('/DriverDashboard')
        } else {
          navigate('/CustomerDashboard')
        }
      } catch (err) {
        if (err?.response?.status === 404) {
          navigate('/CustomerDashboard')
        } else {
          console.error('Unexpected error', err)
          navigate('/login')
        }
      }

    } catch (err) {
      console.log(err)
      setError('Invalid username or password')
    }
  }

  return (
    <div>
    <LoginForm
      title="Login"
      username={formData.username}
      setUsername={(value) => setFormData({ ...formData, username: value })}
      password={formData.password}
      setPassword={(value) => setFormData({ ...formData, password: value })}
      handleSubmit={handleSubmit}
      error={error}
    />  
    </div>
  )
}

export default Login
