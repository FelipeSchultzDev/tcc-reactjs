import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Login from './pages/login/Login';
import Menu from './pages/Menu/Menu';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/menu" component={Menu} />
      <PrivateRoute path="/terminal" component={() => <div><h1>teste</h1></div>} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
