import React from 'react';

import './Home.scss';

import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

const Home = ({ path }) => (
  <div className="page-wrapper">
    <Sidebar path={path}>
      <Header />
    </Sidebar>
  </div>
);
export default Home;
