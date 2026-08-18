import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { setTokens, authorizedRequest } from '../lib/api';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/api/token/`, formData);
      setTokens({
        access: response.data.access,
        refresh: response.data.refresh,
      });

      try {
        const driverProfile = await authorizedRequest('get', '/driver/profile/');
        if (driverProfile?.data) {
          navigate('/DriverDashboard');
        } else {
          navigate('/CustomerDashboard');
        }
      } catch (err) {
        setIsLoading(false);
        if (err?.response?.status === 404) {
          navigate('/CustomerDashboard');
        } else {
          console.error('Unexpected error', err);
          navigate('/login');
        }
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <LoginForm
        title="Login"
        username={formData.username}
        password={formData.password}
        setUsername={(value) => setFormData((prev) => ({ ...prev, username: value }))}
        setPassword={(value) => setFormData((prev) => ({ ...prev, password: value }))}
        handleSubmit={handleSubmit}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Login;
