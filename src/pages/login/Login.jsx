import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

import './Login.scss';

import Logo from '../../Assets/images/logo.svg';

import LoginInput from '../../components/LoginInput/LoginInput';
import LoadButton from '../../components/LoadButton/LoadButton';
import Colors from '../../Assets/Colors.enum';

import login from '../../Services/login';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      loading: false,
      redirectToHome: false,
    };
  }

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  doLogin = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const { user, password } = this.state;

    const body = {
      usuario: user,
      senha: password,
    };

    login.post('/login', body)
      .then((res) => {
        this.setState({ loading: false });
        if (res.data.success) {
          localStorage.setItem('token', res.data._token);
          this.setState({ redirectToHome: true });
        } else {
          ToastsStore.error('Credenciais inválidas');
        }
      })
      .catch(() => this.setState({ loading: false }));
  }

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/menu/home" />;
    }
    return (
      <div className="wrapper">
        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
        <div className="form-container">
          <div className="logo-container">
            <img src={Logo} alt="logo narguile" />
          </div>
          <div className="title">
            <span>Login</span>
          </div>
          <form onSubmit={this.doLogin}>
            <LoginInput name="user" label="Usuario" placeholder="" type="text" onKeyPress={this.changeValue} />
            <LoginInput name="password" label="Senha" placeholder="" type="password" onKeyPress={this.changeValue} />
            <LoadButton loading={this.state.loading} title="Entrar" background={Colors.RED_NORMAL} />
          </form>
        </div>
      </div>
    );
  }
}
