import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CustomerListPage from './pages/CustomerListPage';
import CustomerFormPage from './pages/CustomerFormPage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import "./App.css";


export default function App() {
  return (
    <BrowserRouter>
      <nav className="topnav">
        <Link to="/">Home</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/customers/new">Add Customer</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<h2>Welcome — Customer Management</h2>} />
          <Route path="/customers" element={<CustomerListPage />} />
          <Route path="/customers/new" element={<CustomerFormPage />} />
          <Route path="/customers/:id/edit" element={<CustomerFormPage />} />
          <Route path="/customers/:id" element={<CustomerDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
