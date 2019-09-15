import React, { useState, useEffect } from 'react';

import './Detalhes.scss';

import ClienteService from '../../../../Services/Cliente.service';

import { Primary } from '../../../../components/Buttons/Buttons';
import Label from '../../../../components/Label/Label';
import Color from '../../../../components/Buttons/ButtonsColor.enum';
import TableType from '../../../../components/Table/TableType.enum';

const Detalhes = ({ id, type, onAccept }) => {
  const [cliente, setCliente] = useState({
    Nome: '',
  });

  function dateFormat(date) {
    return `${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(0, 4)}`;
  }

  async function getCliente() {
    const { data } = await ClienteService.get(id, { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (data.success) {
      data.cliente = {
        ...data.cliente,
        nascimento: dateFormat(data.cliente.nascimento),
        createdAt: dateFormat(data.cliente.createdAt),
      };
      setCliente(data.cliente);
    }
  }

  useEffect(() => {
    getCliente();
  }, []);


  return (
    <div className="detalhes-wrapper">
      <div className="separator">
        <Label>
          Nome:
          {' '}
          {cliente.nome}
        </Label>
      </div>
      <div className="separator">
        <Label>
        E-mail:
          {' '}
          {cliente.email ? cliente.email : '-'}
        </Label>
      </div>
      <div className="separator">
        <Label>
        Celular:
          {' '}
          {cliente.celular ? cliente.celular : '-'}
        </Label>
      </div>
      <div className="separator">
        <Label>
        Cpf:
          {' '}
          {cliente.cpf}
        </Label>
      </div>
      <div className="separator">
        <Label>
          Data de nascimento:
          {' '}
          {cliente.nascimento}
        </Label>
      </div>
      <div className="separator">
        <Label>
        Data de criação:
          {' '}
          {cliente.createdAt}
        </Label>
      </div>
      <Primary color={Color.GREEN} title="Ok" click={() => onAccept({ type, action: TableType.ACTION.CANCEL })} />
    </div>
  );
};

export default Detalhes;
