import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ title, background, disabled }) => (
  <div className="button">
    <button disabled={disabled} type="submit" style={{ backgroundColor: background }}>{title}</button>
  </div>
);

Button.propTypes = {
  title: PropTypes.string,
  background: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  title: '',
  background: '',
  disabled: false,
};

export default Button;
