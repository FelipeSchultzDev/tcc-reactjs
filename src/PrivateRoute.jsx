import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import isAuthenticated from './auth';

class PrivateRoute extends React.Component {
  state = { loading: true, isAuth: false }

  componentDidMount() {
    isAuthenticated().then((isAuth) => {
      this.setState({ loading: false, isAuth });
    });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    if (this.state.loading) {
      return <div />;
    }
    return (
      <Route
        {...rest}
        render={() => (
          <div>
            {!this.state.isAuth && <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />}
            <Component {...this.props} />
          </div>
        )}
      />
    );
  }
}

export default PrivateRoute;
