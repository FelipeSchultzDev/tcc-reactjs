import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import './Enable.scss';

const Enable = ({ click }) => (
  <button type="button" onClick={click} className="button-enable">
    <FontAwesomeIcon icon={faEye} />
  </button>
);

export default Enable;
