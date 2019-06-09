import React from 'react';
import PropTypes from 'prop-types';
import * as FontAwesome from 'react-icons/fa';

import './LoginInput.css';


const LoginInput = ({
  icon, placeholder, type, onKeyPress,
}) => {
  const Icon = FontAwesome[icon];
  return (
    <div className="input-container">
      <div className="icon"><Icon size="22" color="#BDBDBD" /></div>
      <input onKeyPress={onKeyPress} type={type} placeholder={placeholder} />
    </div>
  );
};

LoginInput.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onKeyPress: PropTypes.func,
};

LoginInput.defaultProps = {
  icon: '',
  placeholder: '',
  type: '',
  onKeyPress: () => {},
};

export default LoginInput;
