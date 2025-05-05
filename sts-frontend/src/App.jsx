import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerSignup from './pages/CustomerSignup';
import DriverSignup from './pages/DriverSignup';
import Login from './pages/LoginPage';
import CustomerDashboard from './pages/CustomerDashboard';
import DriverDashboard from './pages/DriverDashboard';
import AddProduct from './pages/AddProduct';
import AddRequest from './pages/AddRequest';
import ProductDetail from './pages/ProductDetail';
import EditProduct from './pages/EditProduct';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup/customer" element={<CustomerSignup />} />
        <Route path="/signup/driver" element={<DriverSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
        <Route path="/DriverDashboard" element={<DriverDashboard />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/Request/add" element={<AddRequest />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;