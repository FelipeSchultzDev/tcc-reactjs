import React from 'react';

import './Produtos.scss';
import Sidebar from '../../components/Sidebar/Sidebar';

const Produtos = ({ path }) => (
  <div className="page-wrapper">
    <Sidebar path={path} />
  </div>
);
export default Produtos;
