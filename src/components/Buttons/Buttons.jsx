import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont } from '@fortawesome/free-solid-svg-icons';

import './Buttons.scss';

export const Primary = ({ title = 'button', type = 'button', icon = faFont, color = 'green' }) => (
  <button className={`primary-button shadow ripple ${color}`} type={type}>
    <div className="icon">
      <FontAwesomeIcon icon={icon} />
    </div>
    <span>{title}</span>
  </button>
);

export const Secondary = ({ title = 'button', type = 'button', icon = faFont, color = 'green' }) => (
  <button className={`secondary-button shadow ripple ${color}`} type={type}>
    <div className="icon">
      <FontAwesomeIcon icon={icon} />
    </div>
    <span>{title}</span>
  </button>
);
