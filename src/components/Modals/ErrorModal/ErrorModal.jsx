import React from 'react';

import { Primary } from '../../Buttons/Buttons';
import ButtonsColor from '../../Buttons/ButtonsColor.enum';

import './ErrorModal.scss';

const ErrorModal = ({ onAccept, msg }) => (
  <div className="error-modal-wrapper">
    <div className="error-modal-icon">
      <svg x="0px" y="0px" width="100px" height="85px" viewBox="0 0 100 85">
        <g>
          <path id="triangle" fill="#FFFFFF" d="M5.684,80.499c-0.055,0-0.078-0.039-0.05-0.086L49.95,4.586c0.027-0.047,0.073-0.047,0.101,0l44.315,75.827 c0.028,0.047,0.006,0.086-0.049,0.086H5.684z" />
          <path id="triangle" fill="none" stroke="#000000" strokeWidth="4" strokeMiterlimit="10" d="M5.684,80.499c-0.055,0-0.078-0.039-0.05-0.086 L49.95,4.586c0.027-0.047,0.073-0.047,0.101,0l44.315,75.827c0.028,0.047,0.006,0.086-0.049,0.086H5.684z" />
        </g>
        <polygon id="line" stroke="#000000" strokeMiterlimit="10" points="52.594,56.25 47.406,56.25 45.406,30.5 54.594,30.5 " />
        <circle id="line" stroke="#000000" strokeMiterlimit="10" cx="50" cy="63.813" r="4.5" />
      </svg>
    </div>
    <div className="error-modal-content">
      <h1>Houve um erro!</h1>
      <span>{msg}</span>
    </div>
    <div className="error-modal-footer">
      <Primary color={ButtonsColor.RED} title="Voltar" click={onAccept} />
    </div>
  </div>
);

export default ErrorModal;
