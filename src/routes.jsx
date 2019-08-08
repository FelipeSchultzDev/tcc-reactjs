import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Login from './pages/login/Login';
import Home from './pages/Home/Home';
import Clientes from './pages/Clientes/Clientes';
import Marcas from './pages/Marcas/Marcas';
import Produtos from './pages/Produtos/Produtos';
import Movimentacoes from './pages/Movimentacoes/Movimentacoes';
import Vendas from './pages/Vendas/Vendas';
import Terminal from './pages/Terminal/Terminal';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/clientes" component={Clientes} />
      <PrivateRoute path="/marcas" component={Marcas} />
      <PrivateRoute path="/produtos" component={Produtos} />
      <PrivateRoute path="/movimentacoes" component={Movimentacoes} />
      <PrivateRoute path="/vendas" component={Vendas} />
      <PrivateRoute path="/terminal" component={Terminal} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
