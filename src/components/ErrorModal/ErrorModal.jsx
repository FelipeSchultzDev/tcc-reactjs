import React from 'react';

import { Primary } from '../Buttons/Buttons';
import ButtonsColor from '../Buttons/ButtonsColor.enum';

import './ErrorModal.scss';

const ErrorModal = ({ onAccept, msg }) => (
  <div className="error-modal-wrapper">
    <div className="error-modal-icon">
      <svg viewBox="0 0 1000 1000">
        <path id="triangle" strokeWidth="4" stroke="#ffffff" d="M979.5,835.6L554,98.7c-11.1-19.3-31.8-31.3-54.1-31.3c-22.3,0-43,12-54.2,31.3L18.4,838.9c-11.1,19.3-11.1,43.2,0,62.5c11.1,19.3,31.9,31.3,54.1,31.3h855.1c34.4,0,62.5-28.1,62.5-62.5C990,857.3,986.2,844.9,979.5,835.6z M927.5,896.5h-855c-9.4,0-18.1-5-22.8-13.1c-4.7-8.1-4.7-18.2,0-26.3l427.4-740.3c4.7-8.1,13.4-13.1,22.8-13.1c9.4,0,18.2,5.1,22.8,13.1L949.1,855c3.1,4.4,4.8,9.7,4.8,15.1C953.9,884.7,942,896.5,927.5,896.5z" />
        <polygon id="atention" strokeWidth="4" stroke="#ffffff" points="519.6,680.8 529.4,344.3 455.9,344.3 465.7,680.8 " />
        <path id="atention" strokeWidth="4" stroke="#ffffff" d="M492.7,729c-25.6,0-44.1,19.4-44.1,46.1c0,26.8,18.6,46.2,44.1,46.2c26,0,44.2-19,44.2-46.2C536.8,748,518.7,729,492.7,729z" />
      </svg>
    </div>
    <div className="error-modal-content">
      <h1>Houve um erro!</h1>
      <span>{msg}</span>
    </div>
    <div className="error-modal-footer">
      <Primary color={ButtonsColor.YELLOW} title="Voltar" click={onAccept} />
    </div>
  </div>
);

export default ErrorModal;
