import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';

function CustomerSignup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form test:', {
      username,
      email,
      password,
      full_name,
      address,
      phone_number,
    });
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
