import React from 'react';

import './DestructiveModal.scss';

import { Primary, Secondary } from '../../Buttons/Buttons';
import ButtonsColor from '../../Buttons/ButtonsColor.enum';
import TableType from '../../Table/TableType.enum';

const DestructiveModal = ({
  onCancel = () => {},
  onAccept = () => {},
  primaryMsg = '',
  secondaryMsg = '',
  primaryBtn = '',
  type,
}) => (
  <div className="destructive-modal-wrapper">
    <div className="destructive-modal-icon">
      <svg width="100px" height="100px" viewBox="0 0 100 100">
        <circle fill="none" stroke="#000000" strokeWidth="4" cx="50" cy="50" r="47.586" />
        <line fill="none" stroke="#000000" strokeWidth="4" strokeMiterlimit="10" x1="32.321" y1="67.678" x2="67.678" y2="32.322" />
        <line fill="none" stroke="#000000" strokeWidth="4" strokeMiterlimit="10" x1="67.678" y1="67.678" x2="32.322" y2="32.322" />
      </svg>

    </div>
    <div className="destructive-modal-content">
      <h1>{primaryMsg}</h1>
      <span>{secondaryMsg}</span>
    </div>
    <div className="destructive-modal-footer">
      <Secondary
        color={ButtonsColor.GREY_LIGHT}
        title="Cancelar"
        click={() => onCancel({ type, action: TableType.ACTION.CANCEL })}
      />
      <Primary
        color={ButtonsColor.RED}
        title={primaryBtn}
        click={() => onAccept({ type, action: TableType.ACTION.ACCEPT })}
      />
    </div>
  </div>
);

export default DestructiveModal;
