import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Header.scss';

export default class Header extends Component {
  state = {
    logout: false,
  }

  logout = () => {
    localStorage.removeItem('token');
    this.setState({ logout: true });
  }

  render() {
    if (this.state.logout) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="header-wrapper">
        <span className="header-title">Módulo de gestão de estoque e vendas</span>
        <span role="button" tabIndex="0" className="header-logout" onClick={this.logout} onKeyPress={() => {}}>Sair</span>
      </div>
    );
  }
}
