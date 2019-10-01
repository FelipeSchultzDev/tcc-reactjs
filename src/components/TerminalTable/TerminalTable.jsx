import React from 'react';

import './TerminalTable.scss';

import Delete from '../ActionButtons/Delete/Delete';

const TerminalTable = ({
  data = [],
  onDelete = () => {},
}) => (
  <div className="terminal-table-wrapper">
    <table className="table-component">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Valor unitário</th>
          <th>Quantidade</th>
          <th>Desconto</th>
          <th>Valor final</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.random}>
            <td>
              <span>{row.nome}</span>
            </td>
            <td>
              <span>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(row.valorUnitario)}</span>
            </td>
            <td>
              <span>{row.quantidade}</span>
            </td>
            <td>
              <span>{`${row.desconto}%`}</span>
            </td>
            <td>
              <span>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(row.valorFinal)}</span>
            </td>
            <td>
              <div className="actions">
                <Delete click={() => onDelete(row)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TerminalTable;
