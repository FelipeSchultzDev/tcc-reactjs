import React, { Component, Fragment } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import PrivateRoute from '../../PrivateRoute';

import Logo from '../../Assets/images/logo-green.svg';
import './Sidebar.scss';

export default class Sidebar extends Component {
  constructor(props) {
    super();
    this.state = {
      path: props.home ? props.home : '/menu',
    };
  }

  redirect = path => this.setState({ path });

  render() {
    return (
      <Fragment>
        <div className="sidebar-container">
          <div className="logo">
            <img src={Logo} alt="narguile" />
          </div>
          {this.props.data.map(page => (
            <button
              type="button"
              onClick={() => this.redirect(page.path)}
              className={`sidebar-link ${(page.path === this.state.path ? 'active' : '')}`}
              key={page.path}
            >
              {page.title}
            </button>
          ))}
        </div>
        <div className="screen">
          <Redirect to={this.state.path} />
          <Switch>
            {this.props.data.map(page => <PrivateRoute key={page.path} path={`/menu${page.path}`} component={page.component} />)}
            <Redirect from="/menu/*" to="/menu/home" />
          </Switch>
        </div>
      </Fragment>
    );
  }
}
