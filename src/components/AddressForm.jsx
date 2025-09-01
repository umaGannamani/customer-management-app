import React, { useState, useEffect } from 'react';

export default function AddressForm({ initial = null, onSubmit, onCancel }){
  const [form, setForm] = useState({ address_details:'', city:'', state:'', pin_code:'', is_primary:0 });

  useEffect(()=>{ if(initial) setForm({ address_details: initial.address_details, city: initial.city, state: initial.state, pin_code: initial.pin_code, is_primary: initial.is_primary }); },[initial]);

  function handleChange(e){ const { name, value, type, checked } = e.target; setForm(prev=> ({ ...prev, [name]: type === 'checkbox' ? (checked ? 1 : 0) : value })); }
  function submit(e){ e.preventDefault(); if(!form.address_details || !form.city || !form.state || !form.pin_code){ alert('Please fill required fields'); return; } onSubmit(form); }

  return (
    <form onSubmit={submit} style={{border:'1px solid #eee', padding:8}}>
      <div className="form-row"><label>Address</label><input className="input" name="address_details" value={form.address_details} onChange={handleChange} /></div>
      <div className="form-row"><label>City</label><input className="input" name="city" value={form.city} onChange={handleChange} /></div>
      <div className="form-row"><label>State</label><input className="input" name="state" value={form.state} onChange={handleChange} /></div>
      <div className="form-row"><label>Pincode</label><input className="input" name="pin_code" value={form.pin_code} onChange={handleChange} /></div>
      <div className="form-row"><label><input type="checkbox" name="is_primary" checked={!!form.is_primary} onChange={handleChange} /> Primary</label></div>
      <div className="form-row"><button className="button" type="submit">Save</button> <button type="button" onClick={onCancel}>Cancel</button></div>
    </form>
  );
}
