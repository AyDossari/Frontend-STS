import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerSignup from './pages/CustomerSignup';
import DriverSignup from './pages/DriverSignup';
import Login from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup/customer" element={<CustomerSignup />} />
        <Route path="/signup/driver" element={<DriverSignup />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;