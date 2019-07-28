import React, { Component } from 'react';

import './Menu.scss';

import Sidebar from '../../components/Sidebar/Sidebar';

const pages = [
  { title: 'Home', path: '/menu/home', component: () => <div className="teste" /> },
  { title: 'Clientes', path: '/menu/clientes', component: () => <div className="teste" /> },
  { title: 'Marcas', path: '/menu/marcas', component: () => <div className="teste" /> },
  { title: 'Produtos', path: '/menu/produtos', component: () => <div className="teste" /> },
  { title: 'Movimentação', path: '/menu/movimentaçao', component: () => <div className="teste" /> },
  { title: 'Vendas', path: '/menu/vendas', component: () => <div className="teste" /> },
  { title: 'Terminal de vendas', path: '/terminal', component: () => <div className="teste" /> },
];

export default class Menu extends Component {
  state = {}

  render() {
    return (
      <React.Fragment>
        <Sidebar home="/menu/home" data={pages} />
      </React.Fragment>
    );
  }
}
