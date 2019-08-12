import React from 'react';

import './DeleteModal.scss';

import { Primary, Secondary } from '../Buttons/Buttons';
import ButtonsColor from '../Buttons/ButtonsColor.enum';

const DeleteModal = ({ onCancel, onAccept }) => (
  <div className="delete-modal-wrapper">
    <div className="delete-modal-icon">
      {/* <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="circle" fill="#EB5757" strokeWidth="4" stroke="#ffffff" d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50ZM2.5 50C2.5 76.2335 23.7665 97.5 50 97.5C76.2335 97.5 97.5 76.2335 97.5 50C97.5 23.7665 76.2335 2.5 50 2.5C23.7665 2.5 2.5 23.7665 2.5 50Z" />
        <path id="error" strokeWidth="4" stroke="#ffffff" d="M48.5858 50L31.6152 33.0294L33.0294 31.6152L50 48.5858L66.9706 31.6152L68.3848 33.0294L51.4142 50L68.3848 66.9706L66.9706 68.3848L50 51.4142L33.0294 68.3848L31.6152 66.9706L48.5858 50Z" fill="#EB5757" />
      </svg> */}
      <svg width="100px" height="100px" viewBox="0 0 100 100">
        <circle fill="none" stroke="#000000" strokeWidth="4" cx="50" cy="50" r="47.586" />
        <line fill="none" stroke="#000000" strokeWidth="4" strokeMiterlimit="10" x1="32.321" y1="67.678" x2="67.678" y2="32.322" />
        <line fill="none" stroke="#000000" strokeWidth="4" strokeMiterlimit="10" x1="67.678" y1="67.678" x2="32.322" y2="32.322" />
      </svg>

    </div>
    <div className="delete-modal-content">
      <h1>Tem certeza?</h1>
      <span>Você tem certeza de que quer deletar este item?</span>
      <span>Esta ação não pode ser revertida.</span>
    </div>
    <div className="delete-modal-footer">
      <Secondary color={ButtonsColor.GREY_LIGHT} title="Cancelar" click={onCancel} />
      <Primary color={ButtonsColor.RED} title="Deletar" click={onAccept} />
    </div>
  </div>
);

export default DeleteModal;
