import React, { useEffect, useState } from 'react';
import api from '../api';
import AddressForm from './AddressForm';

export default function AddressList({ customerId, addresses: initial = [], onUpdated }) {
  const [addresses, setAddresses] = useState(initial);
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => setAddresses(initial), [initial]);

  function remove(id) {
    if (window.confirm('Delete address?')) {
      api.delete(`/addresses/${id}`)
        .then(() => { onUpdated(); })
        .catch(console.error);
    }
  }

  function handleAdd(data) {
    api.post(`/customers/${customerId}/addresses`, data)
      .then(() => {
        setAdding(false);
        onUpdated();
      })
      .catch(console.error);
  }

  function handleUpdate(id, data) {
    api.put(`/addresses/${id}`, data)
      .then(() => {
        setEditing(null);
        onUpdated();
      })
      .catch(console.error);
  }

  return (
    <div className="address-list">
      {addresses.map(a => (
        <div key={a.id} className="address-card">
          <div className="address-line">{a.address_details}</div>
          <div className="address-line">{a.city}, {a.state} - {a.pin_code}</div>
          <div className="address-line">
            <strong>Primary:</strong> {a.is_primary ? 'Yes' : 'No'}
          </div>
          <div className="address-actions">
            <button className="button small" onClick={() => setEditing(a)}>Edit</button>
            <button className="button small danger" onClick={() => remove(a.id)}>Delete</button>
          </div>
        </div>
      ))}

      {adding ? (
        <AddressForm
          onCancel={() => setAdding(false)}
          onSubmit={handleAdd}
        />
      ) : (
        <button className="button primary" onClick={() => setAdding(true)}>Add Address</button>
      )}

      {editing && (
        <AddressForm
          initial={editing}
          onCancel={() => setEditing(null)}
          onSubmit={(data) => handleUpdate(editing.id, data)}
        />
      )}
    </div>
  );
}
