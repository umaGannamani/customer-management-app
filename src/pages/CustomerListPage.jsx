import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import SearchFilters from '../components/SearchFilters';
import Pagination from '../components/Pagination';

export default function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => { fetchCustomers(); }, [filters, page]);

  function fetchCustomers() {
    const params = { page, limit, ...filters };
    api.get('/customers', { params })
      .then(r => setCustomers(r.data.data || []))
      .catch(err => console.error(err));
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Customers</h2>
      <SearchFilters onChange={setFilters} onClear={() => setFilters({})} />

      {/* Desktop Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Only One Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.first_name} {c.last_name}</td>
                <td>{c.phone_number}</td>
                <td>{c.only_one_address ? 'Yes' : 'No'}</td>
                <td>
                  <Link to={`/customers/${c.id}`} className="btn-link">View</Link>
                  {' | '}
                  <Link to={`/customers/${c.id}/edit`} className="btn-link">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="card-list">
        {customers.map(c => (
          <div className="card" key={c.id}>
            <p><strong>ID:</strong> {c.id}</p>
            <p><strong>Name:</strong> {c.first_name} {c.last_name}</p>
            <p><strong>Phone:</strong> {c.phone_number}</p>
            <p><strong>Only One Address:</strong> {c.only_one_address ? 'Yes' : 'No'}</p>
            <div className="card-actions">
              <Link to={`/customers/${c.id}`} className="btn">View</Link>
              <Link to={`/customers/${c.id}/edit`} className="btn">Edit</Link>
            </div>
          </div>
        ))}
      </div>

      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
