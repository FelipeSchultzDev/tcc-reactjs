import React from 'react';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

import './Vendas.scss';
import Sidebar from '../../components/Sidebar/Sidebar';

const Vendas = ({ path }) => (
  <div className="page-wrapper">
    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    <Sidebar path={path} />
  </div>
);
export default Vendas;