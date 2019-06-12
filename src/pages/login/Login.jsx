import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Login.css';

import Logo from '../../Assets/images/logo.svg';

import LoginInput from '../../components/LoginInput/LoginInput';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';

import login from '../../Services/login';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      loading: false,
      btnDisabled: false,
      redirectToHome: false,
    };
  }

  changeValue = (e) => {
    this.setState({
      [e.target.attributes.name.value]: e.target.value,
    });
  }

  doLogin = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, btnDisabled: true });

    const { user, password } = this.state;

    const body = {
      usuario: user,
      senha: password,
    };

    login.post('/login', body)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem('token', res.data._token);
          this.setState({ redirectToHome: true });
        }
        this.setState({ loading: false, btnDisabled: false });
      });
  }

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="wrapper">
        {this.state.loading
        && <Loading />
        }
        <div className="form-container">
          <div className="logo-container">
            <img src={Logo} alt="logo narguile" />
          </div>
          <div className="title">
            <span>Login</span>
          </div>
          <form onSubmit={this.doLogin}>
            <LoginInput name="user" icon="FaUserAlt" placeholder="Usuario" type="text" onKeyPress={this.changeValue} />
            <LoginInput name="password" icon="FaLock" placeholder="Senha" type="password" onKeyPress={this.changeValue} />
            <Button disabled={this.state.btnDisabled} title="Entrar" background="#EB5757" />
          </form>
        </div>
      </div>
    );
  }
}
