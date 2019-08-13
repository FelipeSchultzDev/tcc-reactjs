import React from 'react';

import './InputSearch.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const InputSearch = () => (
  <div className="input-search-wrapper">
    <input placeholder="Buscar" type="text" />
    <div><FontAwesomeIcon icon={faSearch} /></div>
  </div>
);

export default InputSearch;
