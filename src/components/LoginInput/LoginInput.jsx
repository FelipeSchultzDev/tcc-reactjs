import React from 'react';
import PropTypes from 'prop-types';

import './LoginInput.scss';


const LoginInput = ({ type, onKeyPress, name, label }) => (
  <div className="input-container">
    <input name={name} onKeyUp={onKeyPress} type={type} required />
    <span>{label}</span>
  </div>
);

LoginInput.propTypes = {
  type: PropTypes.string,
  onKeyPress: PropTypes.func,
  name: PropTypes.string,
};

LoginInput.defaultProps = {
  type: '',
  onKeyPress: () => {},
  name: '',
};

export default LoginInput;
