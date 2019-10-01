import React, { useState, useEffect } from 'react';

import './ReferenciarCliente.scss';

import ClienteService from '../../../Services/Cliente.service';

import { Primary } from '../../../components/Buttons/Buttons';
import Color from '../../../components/Buttons/ButtonsColor.enum';
import InputSearch from '../../../components/InputSearch/InputSearch';

const ReferenciarCliente = ({ onSelect, onCancel }) => {
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrado, setClientesFiltrado] = useState([]);

  const changeCpf = cpf => `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;

  const getClientes = async () => {
    const { data } = await ClienteService.get('habilitados', { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (data.success) {
      const tmp = data.clientes.map(cliente => ({
        _id: cliente._id,
        nome: cliente.nome,
        email: cliente.email,
        cpf: changeCpf(cliente.cpf),
      }));
      setClientes(tmp);
      setClientesFiltrado(tmp);
    }
  };

  const filter = (e = '') => {
    const { value } = e.target;

    if (value) {
      const clienteFiltered = clientes.filter((cliente) => {
        let cont = false;
        Object.keys(cliente).forEach((key) => {
          if (key !== '_id' && cliente[key].toString().toLowerCase().includes(value.toLowerCase())) {
            cont = true;
          }
        });
        return cont;
      });
      setClientesFiltrado(clienteFiltered);
    } else {
      setClientesFiltrado(clientes);
    }
  };

  useEffect(() => {
    getClientes();
  });

  return (
    <div className="referenciar-cliente">
      <InputSearch change={filter} />
      <div className="list-wrapper">
        {clientesFiltrado.map(cliente => (
          <div key={cliente._id} onDoubleClick={() => onSelect(cliente)} className="content">
            <div>
              <span>
                {cliente.nome}
              </span>
            </div>
            <div>
              <span>
                {cliente.cpf}
              </span>
            </div>
            <div>
              <span>
                {cliente.email}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Primary color={Color.RED} title="Cancelar" click={onCancel} />
      <span className="hint">
        Clique duas vezes para selecionar
      </span>
    </div>
  );
};

export default ReferenciarCliente;
