import React from 'react';
import ReactDOM from 'react-dom';

import './Loader.scss';

const Loader = () => ReactDOM.createPortal(
  <div className="loader-container">
    <div className="loader loader-1" />
    <div className="loader loader-2" />
    <div className="loader loader-3" />
    <div className="loader loader-4" />
  </div>,
  document.getElementById('root'),
);

export default Loader;
