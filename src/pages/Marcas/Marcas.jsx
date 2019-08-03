import React from 'react';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

import './Marcas.scss';
import Menu from '../../components/Sidebar/Sidebar';

const Marcas = ({ path }) => (
  <div className="page-wrapper">
    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    <Menu path={path}>
      <h1>testeeeeeeeeeeeeee</h1>
    </Menu>
  </div>
);
export default Marcas;
