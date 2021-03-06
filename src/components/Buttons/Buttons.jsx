import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Buttons.scss';

export const Primary = ({ title = '', type = 'button', disabled, icon, color, click = () => {} }) => (
  <button className="primary-button shadow ripple" disabled={disabled} style={{ backgroundColor: color }} onClick={click} type={type}>
    {icon && (
    <div className="icon">
      <FontAwesomeIcon icon={icon} />
    </div>
    )}
    {title && (
      <span>{title}</span>
    )}
  </button>
);

export const Secondary = ({ title = '', type = 'button', disabled, icon, color, click = () => {} }) => (
  <button className="secondary-button shadow ripple" disabled={disabled} style={{ borderColor: color, color }} onClick={click} type={type}>
    {icon && (
    <div className="icon">
      <FontAwesomeIcon icon={icon} />
    </div>
    )}
    <span>{title}</span>
  </button>
);

export const PrimaryIcon = ({ type = 'button', disabled, icon, color, click = () => {} }) => (
  <button className="primary-button-icon shadow ripple" disabled={disabled} style={{ backgroundColor: color }} onClick={click} type={type}>
    {icon && (
    <div className="icon">
      <FontAwesomeIcon icon={icon} />
    </div>
    )}
  </button>
);
