import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Login from './pages/login/Login';
import Home from './pages/Home/Home';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/home" component={Home} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
