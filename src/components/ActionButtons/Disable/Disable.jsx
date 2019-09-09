import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './Disable.scss';

const Disable = ({ click }) => (
  <button type="button" onClick={click} className="button-disable">
    <FontAwesomeIcon icon={faEyeSlash} />
  </button>
);

export default Disable;
