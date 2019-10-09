import React from 'react';
import InputMask from 'react-input-mask';

import './MyInputMask.scss';

const MyInputMask = ({ placeholder, mask, name, value, onChange, error, errorMsg, label }) => (
  <div className={`myInputMask-wrapper ${error ? 'error' : ''}`}>
    <span className="label">{label}</span>
    <InputMask placeholder={placeholder} name={name} mask={mask} className="input" value={value} onChange={onChange} />
    {error && <span className="hint">{errorMsg}</span>}
  </div>
);

export default MyInputMask;
