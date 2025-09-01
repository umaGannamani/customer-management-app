import React, { useState } from 'react';

export default function SearchFilters({ onChange, onClear }) {
  const [q, setQ] = useState('');
  const [city, setCity] = useState('');
  const [stateV, setStateV] = useState('');
  const [pin, setPin] = useState('');

  function apply() {
    onChange({
      search: q || undefined,
      city: city || undefined,
      state: stateV || undefined,
      pin_code: pin || undefined,
    });
  }

  function clear() {
    setQ('');
    setCity('');
    setStateV('');
    setPin('');
    onClear();
  }

  return (
    <div className="filters-container">
      <input
        className="input"
        placeholder="Search name/phone"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <input
        className="input"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        className="input"
        placeholder="State"
        value={stateV}
        onChange={(e) => setStateV(e.target.value)}
      />
      <input
        className="input"
        placeholder="Pincode"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      <div className="filters-actions">
        <button className="button" onClick={apply}>Apply</button>
        <button className="button secondary" onClick={clear}>Clear</button>
      </div>
    </div>
  );
}
