import React from 'react';

import './Clientes.scss';
import Sidebar from '../../components/Sidebar/Sidebar';

const Clientes = ({ path }) => (
  <div className="page-wrapper">
    <Sidebar path={path} />
  </div>
);

export default Clientes;
