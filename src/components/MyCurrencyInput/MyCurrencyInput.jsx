import React from 'react';
import CurrencyInput from 'react-currency-input';

import './MyCurrencyInput.scss';

const MyCurrencyInput = ({
  config, placeholder, name, value, onChange, error, errorMsg, label,
}) => {
  function newEvent(e) {
    onChange({ target: { name, value: e } });
  }
  return (
    <div className={`myInputMask-wrapper ${error ? 'error' : ''}`}>
      <span className="label">{label}</span>
      <CurrencyInput
        placeholder={placeholder}
        name={name}
        className="input"
        value={value}
        onChange={e => newEvent(e)}
        {...config}
        decimalSeparator=","
        thousandSeparator="."
      />
      {error && <span className="hint">{errorMsg}</span>}
    </div>
  );
};
export default MyCurrencyInput;
