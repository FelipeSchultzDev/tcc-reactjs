import React from 'react';

import './Vendas.scss';

import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

const Vendas = ({ path }) => (
  <div className="page-wrapper">
    <Sidebar path={path}>
      <Header />
    </Sidebar>
  </div>
);
export default Vendas;
