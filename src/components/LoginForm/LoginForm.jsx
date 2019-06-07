import React, { Component } from 'react';

import './LoginForm.css';
import Logo from '../../Assets/images/logo.svg';

export default class LoginForm extends Component {
  state = {}

  render() {
    return (
      <div className="form-container">
        <div className="logo-container">
          <img src={Logo} alt="logo narguile" />
        </div>
        <h1 className="title">Login</h1>
      </div>
    );
  }
}
