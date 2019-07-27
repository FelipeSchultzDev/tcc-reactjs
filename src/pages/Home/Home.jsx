import React, { Component } from 'react';

import './Home.css';

import Menu from '../../components/Menu/Menu';

export default class Home extends Component {
  state = {}

  render() {
    return (
      <React.Fragment>
        <Menu />
        <div className="teste" />
      </React.Fragment>
    );
  }
}
