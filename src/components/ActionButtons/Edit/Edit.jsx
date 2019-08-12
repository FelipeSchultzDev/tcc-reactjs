import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import './Edit.scss';

const Edit = ({ click }) => (
  <button type="button" onClick={click} className="button-edit">
    <FontAwesomeIcon icon={faEdit} />
  </button>
);

export default Edit;
