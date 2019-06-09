import React from 'react';

import './Login.css';
import Logo from '../../Assets/images/logo.svg';
import LoginInput from '../../components/LoginInput/LoginInput';
import Button from '../../components/Button/Button';

export default function login() {
  return (
    <div className="wrapper">
      <div className="form-container">
        <div className="logo-container">
          <img src={Logo} alt="logo narguile" />
        </div>
        <div className="title">
          <span>Login</span>
        </div>
        <LoginInput icon="FaUserAlt" placeholder="Usuario" type="text" />
        <LoginInput icon="FaLock" placeholder="Senha" type="password" />
        <Button title="Entrar" background="#EB5757" />
      </div>
    </div>
  );
}
