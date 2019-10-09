import React, { useState, useEffect } from 'react';

import './ReferenciarCliente.scss';

import { Primary } from '../../../components/Buttons/Buttons';
import Color from '../../../components/Buttons/ButtonsColor.enum';
import InputSearch from '../../../components/InputSearch/InputSearch';

const ReferenciarCliente = ({ onSelect, onCancel, data }) => {
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrado, setClientesFiltrado] = useState([]);


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
    setClientes(data);
    setClientesFiltrado(data);
  }, [data]);

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
