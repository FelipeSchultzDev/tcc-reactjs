import React from 'react';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

import './Marcas.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

import { Primary } from '../../components/Buttons/Buttons';

const Marcas = ({ path }) => (
  <div className="page-wrapper">
    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    <Sidebar path={path}>
      <Header />
      <Primary title="Cadastrar marca" />
    </Sidebar>
  </div>
);
export default Marcas;
