import React from 'react';

import './Input.scss';

const Input = ({ type, placeholder, name, value, onChange }) => (
  <input type={type} placeholder={placeholder} name={name} className="input" value={value} onChange={onChange} />
);

export default Input;
