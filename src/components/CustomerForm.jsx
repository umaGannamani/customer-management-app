import React, { useState, useEffect } from 'react';

export default function CustomerForm({ initial, onSubmit }) {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    only_one_address: 0,
  });

  useEffect(() => {
    if (initial) {
      setForm({
        first_name: initial.first_name || '',
        last_name: initial.last_name || '',
        phone_number: initial.phone_number || '',
        email: initial.email || '',
        only_one_address: initial.only_one_address || 0,
      });
    }
  }, [initial]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.phone_number) {
      return alert('❌ Please fill required fields');
    }
    onSubmit(form);
  }

  return (
    <form onSubmit={submit} className="customer-form card">
      <h2 className="form-title">{initial ? "Edit Customer" : "Add Customer"}</h2>

      <div className="form-row">
        <label htmlFor="first_name">First Name <span className="required">*</span></label>
        <input
          id="first_name"
          className="input"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="last_name">Last Name <span className="required">*</span></label>
        <input
          id="last_name"
          className="input"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="phone_number">Phone <span className="required">*</span></label>
        <input
          id="phone_number"
          className="input"
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="input"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-row checkbox-row">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="only_one_address"
            checked={!!form.only_one_address}
            onChange={handleChange}
          />
          Only One Address
        </label>
      </div>

      <div className="form-actions">
        <button className="button primary" type="submit">
          💾 Save
        </button>
      </div>
    </form>
  );
}
