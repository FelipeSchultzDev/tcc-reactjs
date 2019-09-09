import React from 'react';

import './Input.scss';

const Input = ({ type, placeholder, name, value, onChange, error, errorMsg }) => (
  <div className={`input-wrapper ${error ? 'error' : ''}`}>
    <input type={type} placeholder={placeholder} name={name} className="input" value={value} onChange={onChange} />
    {error && <span>{errorMsg}</span>}
  </div>
);

export default Input;
