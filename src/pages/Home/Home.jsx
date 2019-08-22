import React from 'react';

import './Home.scss';
import Sidebar from '../../components/Sidebar/Sidebar';

const Home = ({ path }) => (
  <div className="page-wrapper">
    <Sidebar path={path} />
  </div>
);
export default Home;
