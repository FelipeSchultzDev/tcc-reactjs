import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './Delete.scss';

const Delete = ({ click }) => (
  <button type="button" onClick={click} className="button-delete">
    <FontAwesomeIcon icon={faTrashAlt} />
  </button>
);

export default Delete;
