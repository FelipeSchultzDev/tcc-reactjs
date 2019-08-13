import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Buttons.scss';

export const Primary = ({ title = '', type = 'button', icon, color, click = () => {} }) => (
  <button className="primary-button shadow ripple" style={{ backgroundColor: color }} onClick={click} type={type}>
    {icon && (
    <div className="icon">
      <FontAwesomeIcon icon={icon} />
    </div>
    )}
    <span>{title}</span>
  </button>
);

export const Secondary = ({ title = '', type = 'button', icon, color, click = () => {} }) => (
  <button className="secondary-button shadow ripple" style={{ borderColor: color, color }} onClick={click} type={type}>
    {icon && (
    <div className="icon">
      <FontAwesomeIcon icon={icon} />
    </div>
    )}
    <span>{title}</span>
  </button>
);
