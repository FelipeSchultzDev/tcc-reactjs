import React from 'react';

import './StyledSelect.scss';

const StyledSelect = ({ name, options = [], value = '', onChange, error, errorMsg }) => (
  <div className="styled-select-wrapper">
    <span className="select-label">Teste</span>
    <select name={name} value={value} onChange={onChange}>
      <option disabled value=""> -- select an option -- </option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
    {error && <span className="hint">{errorMsg}</span>}
  </div>
);

export default StyledSelect;
