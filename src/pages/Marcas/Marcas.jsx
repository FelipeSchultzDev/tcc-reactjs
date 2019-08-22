/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

import './Marcas.scss';

import Sidebar from '../../components/Sidebar/Sidebar';

export default class Marcas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page-wrapper">
        <Sidebar path={this.props.path} />
      </div>
    );
  }
}
