import React, { useState } from 'react';
import axios from 'axios';
import SignupForm from '../components/SignupForm';

function CustomerSignup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const response = await axios.post(`${apiUrl}/signup/customer/`,  {
      username,
      email,
      password,
      full_name,
      address,
      phone_number,
    });
        console.log('Customer registered:', response.data);
    } catch (error) {
        console.error('Signup failed:', error.response?.data || error.message);
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
      phone_number={phone_number}
      setPhoneNumber={setPhoneNumber}
    />
  );
}

export default CustomerSignup;
