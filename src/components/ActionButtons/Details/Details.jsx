import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import './Details.scss';

const Details = ({ click }) => (
  <button type="button" onClick={click} className="button-details">
    <FontAwesomeIcon icon={faCaretDown} />
  </button>
);

export default Details;
