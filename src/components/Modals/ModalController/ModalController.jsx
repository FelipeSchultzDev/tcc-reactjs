/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import ReactDOM from 'react-dom';

import './ModalController.scss';

const ModalController = ({ children }) => ReactDOM.createPortal(
  <div className="modal-wrapper">
    <div className="modal-content modal-content-animation">
      {children && children}
    </div>
  </div>,
  document.getElementById('root'),
);

export default ModalController;
