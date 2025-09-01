import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';
import AddressList from '../components/AddressList';

export default function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  function fetch() {
    api
      .get(`/customers/${id}`)
      .then((r) => setCustomer(r.data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetch();
  }, [id]);

  function handleDelete() {
    if (window.confirm('Delete customer?')) {
      api
        .delete(`/customers/${id}`)
        .then(() => {
          alert('Deleted');
          navigate('/customers');
        })
        .catch((err) => console.error(err));
    }
  }

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="detail-page">
      {/* 🔹 Back to List link at top */}
      <div className="back-nav">
        <Link to="/customers" className="back-link">
          ← Back to Customers
        </Link>
      </div>

      <h2>
        {customer.first_name} {customer.last_name}
      </h2>
      <p>Phone: {customer.phone_number}</p>
      <p>Email: {customer.email}</p>

      <div style={{ marginBottom: '15px' }}>
        <button onClick={handleDelete} className="button delete">
          Delete
        </button>
      </div>

      <h3>Addresses</h3>
      <AddressList
        customerId={id}
        onUpdated={fetch}
        addresses={customer.addresses || []}
      />
    </div>
  );
}
