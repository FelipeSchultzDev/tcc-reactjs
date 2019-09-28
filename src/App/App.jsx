import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';

import PrivateRoute from '../PrivateRoute';
import Login from '../pages/login/Login';
import Sidebar from '../components/Sidebar/Sidebar';
import Marcas from '../pages/Marcas/Marcas';
import Clientes from '../pages/Clientes/Clientes';
import Terminal from '../pages/Terminal/Terminal';
import Produtos from '../pages/Produtos/Produtos';
import Movimentacoes from '../pages/Movimentacoes/Movimentacoes';

const container = props => (
  <div>
    <Sidebar {...props} />
    <div style={{ width: 'calc(100% - 224px)', position: 'absolute', right: 0 }}>
      <Route path={`${props.path}/home`} component={() => <h1>Home</h1>} />
      <Route path={`${props.path}/marcas`} component={Marcas} />
      <Route path={`${props.path}/clientes`} component={Clientes} />
      <Route path={`${props.path}/produtos`} component={Produtos} />
      <Route path={`${props.path}/movimentacoes`} component={Movimentacoes} />
    </div>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={Login} />
      <PrivateRoute path="/menu" component={container} />
      <PrivateRoute path="/terminal" component={Terminal} />
      <Redirect from="*" to="/login" />
    </Switch>
  </BrowserRouter>
);

export default App;
