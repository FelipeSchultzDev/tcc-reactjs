import React, { useState, useEffect } from 'react';

import './Detalhes.scss';

import ClienteService from '../../../../Services/Cliente.service';

import { Primary } from '../../../../components/Buttons/Buttons';
import Label from '../../../../components/Label/Label';
import Color from '../../../../components/Buttons/ButtonsColor.enum';
import TableType from '../../../../components/Table/TableType.enum';

import Loader from '../../../../components/Loader/Loader';

const Detalhes = ({ id, type, onAccept }) => {
  const [cliente, setCliente] = useState({
    Nome: '',
  });
  const [showLoader, setShowLoader] = useState(false);

  function dateFormat(date) {
    return `${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(0, 4)}`;
  }

  function formarCpf(cpf = '') {
    return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;
  }

  async function getCliente() {
    const { data } = await ClienteService.get(id, { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (data.success) {
      setShowLoader(false);
      data.cliente = {
        ...data.cliente,
        cpf: formarCpf(data.cliente.cpf),
        nascimento: dateFormat(data.cliente.nascimento),
        createdAt: dateFormat(data.cliente.createdAt),
      };
      setCliente(data.cliente);
    }
  }

  useEffect(() => {
    setShowLoader(true);
    getCliente();
  }, []);


  return (
    <div className="detalhes-wrapper">
      {showLoader && <Loader />}
      <div className="separator">
        <Label>
          <span className="label-title">Nome:</span>
          {' '}
          {cliente.nome}
        </Label>
      </div>
      <div className="separator">
        <Label>
          <span className="label-title">E-mail:</span>
          {' '}
          {cliente.email ? cliente.email : '-'}
        </Label>
      </div>
      <div className="separator">
        <Label>
          <span className="label-title">Celular:</span>
          {' '}
          {cliente.celular ? cliente.celular : '-'}
        </Label>
      </div>
      <div className="separator">
        <Label>
          <span className="label-title">Cpf:</span>
          {' '}
          {cliente.cpf}
        </Label>
      </div>
      <div className="separator">
        <Label>
          <span className="label-title">Data de nascimento:</span>
          {' '}
          {cliente.nascimento}
        </Label>
      </div>
      <div className="separator">
        <Label>
          <span className="label-title">Data de cadastro:</span>
          {' '}
          {cliente.createdAt}
        </Label>
      </div>
      <Primary color={Color.GREEN} title="Ok" click={() => onAccept({ type, action: TableType.ACTION.CANCEL })} />
    </div>
  );
};

export default Detalhes;
