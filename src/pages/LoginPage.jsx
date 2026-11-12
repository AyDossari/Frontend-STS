import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion as Motion } from 'motion/react';
import LoginForm from '../components/LoginForm';
import { setTokens, authorizedRequest } from '../lib/api';

function Login() {
  const [order, setOrder] = useState(initialOrder)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    const timeout = setTimeout(() => setOrder(shuffle(order)), 1000)
    return () => clearTimeout(timeout)
  }, [order])

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
      <div style={wrapper}>
        <ul style={container}>
          {order.map((backgroundColor) => (
            <Motion.li
              key={backgroundColor}
              layout
              transition={spring}
              style={{ ...item, backgroundColor }}
            />
          ))}
        </ul>
        <Motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={projectName}
        >
          Storage Tracker System
        </Motion.p>
      </div>
    </div>


  );
}

const initialOrder = ["hsl(0 0% 98%)", "hsl(240 5% 64.9%)", "hsl(240 5.2% 33.9%)", "hsl(240 3.7% 15.9%)"]

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
}

const wrapper = {
  position: "fixed",
  bottom: "24px",
  left: 0,
  right: 0,
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
}

const container = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  width: 300,
  justifyContent: "center",
  alignItems: "center",
}

const item = {
  width: 48,
  height: 48,
  borderRadius: "10px",
}

const projectName = {
  fontSize: "14px",
  fontWeight: 500,
  color: "hsl(240 5.9% 90%)",
  fontFamily: "monospace",
  letterSpacing: "2px",
  marginTop: "8px",
}

export default Login;
