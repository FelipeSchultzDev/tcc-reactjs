import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Logo from '../../Assets/images/logo-green.svg';
import './Sidebar.scss';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '/home',
    };
  }

  redirect = path => this.setState({ path });

  activeStyle = path => (this.state.path === path ? 'active' : '');

  render() {
    return (
      <>
        <Redirect to={`/menu${this.state.path}`} />
        <div className="sidebar-container">
          <div className="logo">
            <img src={Logo} alt="narguile" />
          </div>
          <button type="button" onClick={() => this.redirect('/home')} className={`sidebar-link ${this.activeStyle('home')}`}>Home</button>
          <button type="button" onClick={() => this.redirect('/clientes')} className={`sidebar-link ${this.activeStyle('clientes')}`}>Clientes</button>
          <button type="button" onClick={() => this.redirect('/marcas/listar')} className={`sidebar-link ${this.activeStyle('marcas')}`}>Marcas</button>
          <button type="button" onClick={() => this.redirect('/produtos')} className={`sidebar-link ${this.activeStyle('produtos')}`}>Produtos</button>
          <button type="button" onClick={() => this.redirect('/movimentacoes')} className={`sidebar-link ${this.activeStyle('movimentacoes')}`}>Movimentação</button>
          <button type="button" onClick={() => this.redirect('/vendas')} className={`sidebar-link ${this.activeStyle('vendas')}`}>Vendas</button>
          <button type="button" onClick={() => this.redirect('/terminal')} className="sidebar-link">TERMINAL DE VENDAS</button>
        </div>
      </>
    );
  }
}
