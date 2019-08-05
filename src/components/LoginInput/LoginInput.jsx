import React from 'react';

import './LoginInput.scss';


const LoginInput = ({ type, onKeyPress, name, label }) => (
  <div className="input-container">
    <input name={name} onKeyUp={onKeyPress} type={type} required />
    <span>{label}</span>
  </div>
);

export default LoginInput;
