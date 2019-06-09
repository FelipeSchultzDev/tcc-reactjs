import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ title, background }) => (
  <div className="button">
    <button type="submit" style={{ backgroundColor: background }}>{title}</button>
  </div>
);

Button.propTypes = {
  title: PropTypes.string,
  background: PropTypes.string,
};

Button.defaultProps = {
  title: '',
  background: '',
};

export default Button;
