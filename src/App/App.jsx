import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import Login from '../pages/login/Login';
import Home from '../pages/Home/Home';

import login from '../Services/login';

const RedirectRouter = () => <Redirect to="/login" />;

class Teste extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    this.isAuthenticated();
  }

  isAuthenticated = async () => {
    const token = localStorage.getItem('token');
    const result = await login.post('/login/validate', { _token: token });

    this.setState({
      isAuthenticated: result.data.success,
    });
  };


  render() {
    if (this.state.isAuthenticated) return <Home />;
    return <Login />;
  }
}

const PrivateRoute = ({ ...rest }) => (
  <Route
    {...rest}
    render={() => <Teste />}
  />
);


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/home" />
        <PrivateRoute exact path="/login" />
        <Route path="/" render={RedirectRouter} />
        <Route path="*" render={RedirectRouter} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
