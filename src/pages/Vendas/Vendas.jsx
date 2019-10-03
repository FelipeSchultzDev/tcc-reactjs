import React from 'react';
import { Route } from 'react-router-dom';

import './Vendas.scss';

import Header from '../../components/Header/Header';
import Listar from './Listar/Listar';

const Vendas = props => (
  <>
    <Header />
    <Route path={`${props.match.path}/listar`} component={Listar} />
    {/* <Route path={`${props.match.path}/cadastrar`} component={Cadastrar} /> */}
    {/* <Route path={`${props.match.path}/desabilitados`} component={ListarDesabilitados} /> */}
    {/* <Route path={`${props.match.path}/editar/:id`} component={Editar} /> */}
  </>
);
export default Vendas;
