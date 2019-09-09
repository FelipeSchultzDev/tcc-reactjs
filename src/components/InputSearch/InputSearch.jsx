import React from 'react';

import './InputSearch.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const InputSearch = ({ value, change }) => (
  <div className="input-search-wrapper">
    <input id="buscar" placeholder="Buscar" type="text" value={value} onKeyUp={change} />
    <div><FontAwesomeIcon icon={faSearch} /></div>
  </div>
);

export default InputSearch;
