import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerSignup from './pages/CustomerSignup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup/customer" element={<CustomerSignup />} />

      </Routes>
    </Router>
  );
}

export default App;