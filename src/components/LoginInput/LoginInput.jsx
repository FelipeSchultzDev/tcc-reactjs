import React from 'react';
import PropTypes from 'prop-types';
import * as FontAwesome from 'react-icons/fa';

import './LoginInput.css';


const LoginInput = ({
  icon, placeholder, type, onKeyPress, name,
}) => {
  const Icon = FontAwesome[icon];
  return (
    <div className="input-container">
      <div className="icon"><Icon size="22" color="#BDBDBD" /></div>
      <input name={name} onKeyUp={onKeyPress} type={type} placeholder={placeholder} />
    </div>
  );
};

LoginInput.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onKeyPress: PropTypes.func,
  name: PropTypes.string,
};

LoginInput.defaultProps = {
  icon: '',
  placeholder: '',
  type: '',
  onKeyPress: () => {},
  name: '',
};

export default LoginInput;
