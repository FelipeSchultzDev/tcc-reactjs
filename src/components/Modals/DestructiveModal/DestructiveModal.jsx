import React from 'react';

import './DestructiveModal.scss';

import { Primary, Secondary } from '../../Buttons/Buttons';
import ButtonsColor from '../../Buttons/ButtonsColor.enum';

const DestructiveModal = ({ onCancel, onAccept }) => (
  <div className="destructive-modal-wrapper">
    <div className="destructive-modal-icon">
      <svg width="100px" height="100px" viewBox="0 0 100 100">
        <circle fill="none" stroke="#000000" strokeWidth="4" cx="50" cy="50" r="47.586" />
        <line fill="none" stroke="#000000" strokeWidth="4" strokeMiterlimit="10" x1="32.321" y1="67.678" x2="67.678" y2="32.322" />
        <line fill="none" stroke="#000000" strokeWidth="4" strokeMiterlimit="10" x1="67.678" y1="67.678" x2="32.322" y2="32.322" />
      </svg>

    </div>
    <div className="destructive-modal-content">
      <h1>Tem certeza?</h1>
      <span>Você tem certeza de que quer deletar este item?</span>
      <span>Esta ação não pode ser revertida.</span>
    </div>
    <div className="destructive-modal-footer">
      <Secondary color={ButtonsColor.GREY_LIGHT} title="Cancelar" click={onCancel} />
      <Primary color={ButtonsColor.RED} title="Deletar" click={onAccept} />
    </div>
  </div>
);

export default DestructiveModal;
