import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Header.scss';

export default class Header extends Component {
  state = {
    logout: false,
    back: false,
  }

  logout = () => {
    localStorage.removeItem('token');
    this.setState({ logout: true });
  }

  back = () => {
    console.log(this.props);
    this.setState({ back: true });
  }

  render() {
    if (this.state.logout) {
      return <Redirect to="/login" />;
    }
    if (this.state.back) {
      return <Redirect to="/menu/home" />;
    }
    return (
      <div className="header-wrapper">
        <span className="header-title">Módulo de gestão de estoque e vendas</span>
        {this.props.isBack && (
          <span role="button" tabIndex="0" className="header-logout" onClick={this.back} onKeyPress={() => {}}>Voltar</span>
        )}
        {!this.props.isBack && (
          <span role="button" tabIndex="0" className="header-logout" onClick={this.logout} onKeyPress={() => {}}>Sair</span>
        )}
      </div>
    );
  }
}
