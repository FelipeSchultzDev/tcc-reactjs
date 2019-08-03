import React from 'react';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

import './Terminal.scss';

const Terminal = () => (
  <div className="page-wrapper">
    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
    <h1>Terminal</h1>
  </div>
);
export default Terminal;
