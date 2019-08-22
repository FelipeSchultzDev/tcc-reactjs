import React from 'react';

import './Clientes.scss';

import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

const Clientes = ({ path }) => (
  <div className="page-wrapper">
    <Sidebar path={path}>
      <Header />
    </Sidebar>
  </div>
);

export default Clientes;
