import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../Assets/images/logo-green.svg';
import './Sidebar.scss';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  activeStyle = path => (this.props.location.pathname.search(path) > 1 ? 'active' : '');

  render() {
    return (
      <>
        <div className="sidebar-container">
          <div className="logo">
            <img src={Logo} alt="narguile" />
          </div>
          <Link to={`${this.props.path}/home`}>
            <div className={`link ${this.activeStyle('home')}`}>
              <span>Home</span>
            </div>
          </Link>
          <Link to={`${this.props.path}/clientes/listar`}>
            <div className={`link ${this.activeStyle('clientes')}`}>
              <span>clientes</span>
            </div>
          </Link>
          <Link to={`${this.props.path}/marcas/listar`}>
            <div className={`link ${this.activeStyle('marca')}`}>
              <span>Marcas</span>
            </div>
          </Link>
          <Link to={`${this.props.path}/produtos/listar`}>
            <div className={`link ${this.activeStyle('produtos')}`}>
              <span>produtos</span>
            </div>
          </Link>
          <Link to={`${this.props.path}/movimentacoes/listar`}>
            <div className={`link ${this.activeStyle('movimentacoes')}`}>
              <span>movimentacoes</span>
            </div>
          </Link>
          <Link to={`${this.props.path}/vendas/listar`}>
            <div className={`link ${this.activeStyle('vendas')}`}>
              <span>vendas</span>
            </div>
          </Link>
          <Link to={`${this.props.path}/terminal`}>
            <div className={`link ${this.activeStyle('terminal')}`}>
              <span>terminal</span>
            </div>
          </Link>
        </div>
      </>
    );
  }
}
