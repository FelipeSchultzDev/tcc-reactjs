import React from 'react';

import './TerminalTable.scss';

import Delete from '../ActionButtons/Delete/Delete';

const TerminalTable = ({
  header = [],
  data = [],
  onDelete = () => {},
}) => (
  <div className="terminal-table-wrapper">
    <table className="table-component">
      <thead>
        <tr>
          {header.map(head => <th key={head.title}>{ head.title }</th>)}
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row._id}>
            {header.map(head => (
              <td key={head.col}>
                <span>{row[head.col]}</span>
              </td>
            ))}
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
