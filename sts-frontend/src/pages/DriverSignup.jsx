import React, { useState } from 'react';
import axios from 'axios';
import SignupForm from '../components/SignupForm';

function DriverSignup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const [vehicle_type, setVehicleType] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const navigate = useNavigate()

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const response = await axios.post(`${apiUrl}/signup/driver/`,  {
      username,
      email,
      password,
      full_name,
      vehicle_type,
      phone_number,
    });
        console.log('Driver registered:', response.data);
        navigate('/login')
    } catch (error) {
        console.error('Signup failed:', error.response?.data || error.message);
    }
  };

  return (
    <SignupForm
      title="Driver Sign Up"
      handleSubmit={handleSubmit}
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      full_name={full_name}
      setFullName={setFullName}
      vehicle_type={vehicle_type}
      setVehicleType={setVehicleType}
      showVehicleType={true}
      phone_number={phone_number}
      setPhoneNumber={setPhoneNumber}
    />
  );
}

export default DriverSignup;
