import React from 'react';
import InputMask from 'react-input-mask';

import './MyInputMask.scss';

const MyInputMask = ({ mask, placeholder, name, value, onChange, error, errorMsg, label }) => (
  <div className={`myInputMask-wrapper ${error ? 'error' : ''}`}>
    <span className="label">{label}</span>
    <InputMask placeholder={placeholder} name={name} className="input" value={value} onChange={onChange} mask={mask} />
    {error && <span className="hint">{errorMsg}</span>}
  </div>
);

export default MyInputMask;
