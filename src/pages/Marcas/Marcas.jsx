import React from 'react';
import { Route } from 'react-router-dom';

import './Marcas.scss';

import Header from '../../components/Header/Header';
import Listar from './Listar/Listar';
import Cadastrar from './Cadastrar/Cadastrar';
import Editar from './Editar/Editar';
import ListarDesabilitados from './ListarDesabilitados/ListarDesabilitados';

const Marcas = props => (
  <>
    <Header />
    <Route path={`${props.match.path}/listar`} component={Listar} />
    <Route path={`${props.match.path}/cadastrar`} component={Cadastrar} />
    <Route path={`${props.match.path}/desabilitados`} component={ListarDesabilitados} />
    <Route path={`${props.match.path}/editar/:id`} component={Editar} />
  </>
);
export default Marcas;
