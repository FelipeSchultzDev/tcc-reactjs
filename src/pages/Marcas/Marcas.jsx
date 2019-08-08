import React from 'react';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { faPlusCircle, faEye, faFilter } from '@fortawesome/free-solid-svg-icons';

import './Marcas.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import InputSearch from '../../components/InputSearch/InputSearch';
import Table from '../../components/Table/Table';
import { Primary } from '../../components/Buttons/Buttons';

import ButtonsColor from '../../components/Buttons/ButtonsColor.enum';

const tableHead = [
  { title: 'Nome', col: 'title' },
  { title: 'Data de cadastro', col: 'data' },
];

const dataMock = [
  { id: 1, title: 'teste', data: (new Date()).toLocaleDateString('pt-br') },
  { id: 2, title: 'teste', data: (new Date()).toLocaleDateString('pt-br') },
  { id: 3, title: 'teste', data: (new Date()).toLocaleDateString('pt-br') },
  { id: 4, title: 'teste', data: (new Date()).toLocaleDateString('pt-br') },
  { id: 5, title: 'teste', data: (new Date()).toLocaleDateString('pt-br') },
  { id: 6, title: 'teste', data: (new Date()).toLocaleDateString('pt-br') },
  { id: 7, title: 'teste', data: (new Date()).toLocaleDateString('pt-br') },
];

const Marcas = ({ path }) => (
  <div className="page-wrapper">
    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    <Sidebar path={path}>
      <Header />
      <div style={{ padding: 24 }}>
        <div className="top-items">
          <div className="left">
            <div className="cadastrar"><Primary title="Cadastrar marca" icon={faPlusCircle} color={ButtonsColor.GREEN} /></div>
            <div className="desabilitados"><Primary title="Desabilitados" icon={faEye} color={ButtonsColor.GREY} /></div>
          </div>
          <div className="right">
            <div className="busca"><InputSearch /></div>
            <div className="filtro"><Primary title="Filtros" icon={faFilter} color={ButtonsColor.GREY} /></div>
          </div>
        </div>
        <div className="table">
          <Table header={tableHead} data={dataMock} />
        </div>
      </div>
    </Sidebar>
  </div>
);
export default Marcas;
