import React from 'react';

import { Primary } from '../../Buttons/Buttons';
import ButtonsColor from '../../Buttons/ButtonsColor.enum';

import './PositiveModal.scss';

const PositiveModal = ({ onAccept }) => (
  <div className="positive-modal-wrapper">
    <div className="positive-modal-icon">
      <svg x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100">
        <polyline fill="#ff000000" stroke="#ffffff" strokeWidth="4" strokeMiterlimit="10" points="93.431,23.076 39.583,76.925 6.569,43.912" />
      </svg>
    </div>
    <div className="positive-modal-content">
      <h1>Ação concluida!</h1>
      <span>A sua ação foi concluida com sucesso</span>
    </div>
    <div className="positive-modal-footer">
      <Primary color={ButtonsColor.GREEN} title="OK" click={onAccept} />
    </div>
  </div>
);

export default PositiveModal;
