import React from 'react';

import './Produtos.scss';

import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

const Produtos = ({ path }) => (
  <div className="page-wrapper">
    <Sidebar path={path}>
      <Header />
    </Sidebar>
  </div>
);
export default Produtos;
