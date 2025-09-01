import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api";
import AddressList from "../components/AddressList";

export default function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  function fetch() {
    setLoading(true);
    setError(null);
    api
      .get(`/customers/${id}`)
      .then((r) => {
        setCustomer(r.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Customer not found or failed to load.");
        setLoading(false);
      });
  }

  useEffect(() => {
    fetch();
  }, [id]);

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      api
        .delete(`/customers/${id}`)
        .then(() => {
          navigate("/customers", {
            state: { message: "Customer deleted successfully" },
          });
        })
        .catch((err) => console.error(err));
    }
  }

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading customer details...</p>
      </div>
    );
  }

  if (error) return <div className="error-message">{error}</div>;

  if (!customer) return <div className="error-message">Customer not found.</div>;

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
      <p>
        <strong>Phone:</strong> {customer.phone_number}
      </p>
      <p>
        <strong>Email:</strong> {customer.email}
      </p>

      <div className="action-buttons">
        <Link to={`/customers/${id}/edit`} className="button edit">
          ✏️ Edit
        </Link>
        <button onClick={handleDelete} className="button delete">
          🗑️ Delete
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
