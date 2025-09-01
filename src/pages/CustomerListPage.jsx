import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import SearchFilters from '../components/SearchFilters';
import Pagination from '../components/Pagination';

export default function CustomerListPage(){
  const [customers,setCustomers] = useState([]);
  const [filters,setFilters] = useState({});
  const [page,setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(()=>{ fetch(); },[filters,page]);

  function fetch(){
    const params = { page, limit, ...filters };
    api.get('/customers', { params })
      .then(r=> setCustomers(r.data.data || []))
      .catch(err=> console.error(err));
  }

  return (
    <div>
      <h2>Customers</h2>
      <SearchFilters onChange={setFilters} onClear={() => setFilters({})} />
      <table className="table">
        <thead><tr><th>ID</th><th>Name</th><th>Phone</th><th>Only One Address</th><th>Actions</th></tr></thead>
        <tbody>
          {customers.map(c=> (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.first_name} {c.last_name}</td>
              <td>{c.phone_number}</td>
              <td>{c.only_one_address ? 'Yes' : 'No'}</td>
              <td>
                <Link to={`/customers/${c.id}`}>View</Link>
                {' | '}
                <Link to={`/customers/${c.id}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

