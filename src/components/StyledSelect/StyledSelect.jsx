import React from 'react';

import './StyledSelect.scss';

const StyledSelect = ({ label, name, options = [], value = '', onChange, error, errorMsg, required = false }) => (
  <div className="styled-select-wrapper">
    <span className="select-label">{label}</span>
    <select name={name} value={value} onChange={onChange}>
      <option disabled={required} value=""> -- select an option -- </option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
    {error && <span className="hint">{errorMsg}</span>}
  </div>
);

export default StyledSelect;
