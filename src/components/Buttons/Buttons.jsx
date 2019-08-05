import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Buttons.scss';

export const Primary = ({ title = 'button', type = 'button' }) => (
  <button className="primary-button" type={type}>
    <div className="icon">
      {/* <FontAwesomeIcon icon="coffee" /> */}
    </div>
    <span>{title}</span>
  </button>
);

export const Secondary = () => <div />;
