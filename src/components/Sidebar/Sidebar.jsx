import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import Logo from '../../Assets/images/logo-green.svg';
import './Sidebar.scss';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: this.props.path ? this.props.path : '/home',
    };
  }

  redirect = path => this.setState({ path });

  render() {
    return (
      <Fragment>
        <Redirect to={this.state.path} />
        <div className="sidebar-container">
          <div className="logo">
            <img src={Logo} alt="narguile" />
          </div>
          <button type="button" onClick={() => this.redirect('/home')} className="sidebar-link">Home</button>
          <button type="button" onClick={() => this.redirect('/clientes')} className="sidebar-link">Clientes</button>
          <button type="button" onClick={() => this.redirect('/marcas')} className="sidebar-link">Marcas</button>
          <button type="button" onClick={() => this.redirect('/produtos')} className="sidebar-link">Produtos</button>
          <button type="button" onClick={() => this.redirect('/movimentacoes')} className="sidebar-link">Movimentação</button>
          <button type="button" onClick={() => this.redirect('/vendas')} className="sidebar-link">Vendas</button>
          <button type="button" onClick={() => this.redirect('/terminal')} className="sidebar-link">TERMINAL DE VENDAS</button>
        </div>
        <div className="page">
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}
