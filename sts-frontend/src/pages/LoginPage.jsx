import { useState } from 'react'
import { setTokens } from '../lib/api'
import axios from 'axios'
import LoginForm from '../components/LoginForm'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState('')

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
    />
        {error && <p style={{ color: 'red' }}>{error}</p>}    
    </div>
  )
}

export default Login
