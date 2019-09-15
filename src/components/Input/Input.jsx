import React from 'react';

import './Input.scss';

const Input = ({ type, placeholder, name, value, onChange, error, errorMsg, label }) => (
  <div className={`input-wrapper ${error ? 'error' : ''}`}>
    <span className="label">{label}</span>
    <input type={type} placeholder={placeholder} name={name} className="input" value={value} onChange={onChange} />
    {error && <span className="hint">{errorMsg}</span>}
  </div>
);

export default Input;
