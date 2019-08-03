import React from 'react';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

import './Movimentacoes.scss';
import Menu from '../../components/Sidebar/Sidebar';

const Movimentacoes = ({ path }) => (
  <div className="page-wrapper">
    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    <Menu path={path} />
  </div>
);
export default Movimentacoes;
