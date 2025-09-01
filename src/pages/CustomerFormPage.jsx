import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api';
import CustomerForm from '../components/CustomerForm';

export default function CustomerFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);
  const [message, setMessage] = useState(null); // success or error message
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      api.get(`/customers/${id}`)
        .then(r => setInitial(r.data))
        .catch(err => {
          console.error(err);
          setError("Failed to load customer details.");
        });
    }
  }, [id]);

  async function handleSubmit(data) {
    setMessage(null);
    setError(null);

    try {
      if (id) {
        await api.put(`/customers/${id}`, data);
        setMessage("✅ Updated successfully");
      } else {
        await api.post('/customers', data);
        setMessage("✅ Created successfully");
      }
      setTimeout(() => navigate('/customers'), 1500); // redirect after delay
    } catch (err) {
      console.error(err);
      setError("❌ Something went wrong. Please try again.");
    }
  }

  return (
    <div className="page">
      {/* Back Navigation */}
      <div className="back-nav">
        <Link to="/customers" className="back-link">← Back to Customers List</Link>
      </div>

      {/* Show messages */}
      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}

      <CustomerForm onSubmit={handleSubmit} initial={initial} />
    </div>
  );
}
