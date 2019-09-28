import React from 'react';
import { Route } from 'react-router-dom';

import './Movimentacoes.scss';

import Header from '../../components/Header/Header';
import Listar from './Listar/Listar';

const Movimentacoes = props => (
  <>
    <Header />
    <Route path={`${props.match.path}/listar`} component={Listar} />
  </>
);
export default Movimentacoes;
