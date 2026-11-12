import React, { useState } from 'react';
import axios from 'axios';
import SignupForm from '../components/SignupForm';
import { useNavigate } from 'react-router-dom';

function CustomerSignup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/signup/customer/`, {
        username,
        email,
        password,
        full_name,
        address,
        phone_number,
      });
      console.log('Customer registered:', response.data);
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);
      setIsLoading(false);
      const data = err.response?.data;
      if (err.response?.status === 500) {
        setError('Registration failed: Username or email may already be in use.');
      } else if (typeof data === 'string') {
        setError(data.startsWith('<!DOCTYPE') ? 'Registration failed. Please check your information.' : data);
      } else if (data && typeof data === 'object') {
        const firstKey = Object.keys(data)[0];
        const firstVal = Array.isArray(data[firstKey]) ? data[firstKey][0] : data[firstKey];
        setError(typeof firstVal === 'string' ? `${firstVal}` : 'Signup failed. Please check your information.');
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  return (
    <SignupForm
      title="Customer Sign Up"
      handleSubmit={handleSubmit}
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      full_name={full_name}
      setFullName={setFullName}
      address={address}
      setAddress={setAddress}
      showAddress={true}
      phone_number={phone_number}
      setPhoneNumber={setPhoneNumber}
      error={error}
      isLoading={isLoading}
    />
  );
}

export default CustomerSignup;
