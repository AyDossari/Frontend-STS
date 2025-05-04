import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerSignup from './pages/CustomerSignup';
import DriverSignup from './pages/DriverSignup';
import Login from './pages/LoginPage';
import CustomerDashboard from './pages/CustomerDashboard';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup/customer" element={<CustomerSignup />} />
        <Route path="/signup/driver" element={<DriverSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
        <Route path="/products/add" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;