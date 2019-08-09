import React, { Fragment } from 'react';

import './Table.scss';

const Table = ({ header, data, edit = true, remove = true, details = true }) => (
  <Fragment>
    <div className="table-wrapper">
      <table className="table-component">
        <thead>
          <tr>
            {header.map(head => <th key={head.title}>{ head.title }</th>)}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              {header.map(head => (
                <td key={head.col}>{row[head.col]}</td>
              ))}
              <td>
                <div className="actions">
                  <div className="edit" style={{ display: !edit ? 'none' : '' }} />
                  <div className="delete" style={{ display: !remove ? 'none' : '' }} />
                  <div className="details" style={{ display: !details ? 'none' : '' }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Fragment>
);

export default Table;
