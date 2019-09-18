import React from 'react';
import InputMask from 'react-input-mask';

import './MyInputMask.scss';

const MyInputMask = ({ config, placeholder, name, value, onChange, error, errorMsg, label }) => (
  <div className={`myInputMask-wrapper ${error ? 'error' : ''}`}>
    <span className="label">{label}</span>
    <InputMask placeholder={placeholder} name={name} className="input" value={value} onChange={onChange} {...config} />
    {error && <span className="hint">{errorMsg}</span>}
  </div>
);

export default MyInputMask;
