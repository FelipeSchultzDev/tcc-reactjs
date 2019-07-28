import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import isAuthenticated from './auth';
import loader from './components/Loading/Loading';

class PrivateRoute extends React.Component {
  state = { loading: true, isAuth: false }

  componentDidMount() {
    isAuthenticated().then((isAuth) => {
      // setTimeout(() => {
      this.setState({ loading: false, isAuth });
      // }, 1000);
    });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    if (this.state.loading) {
      return loader(true);
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
