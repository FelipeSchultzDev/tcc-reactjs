import React, { Fragment } from 'react';

import './Table.scss';

import Edit from '../ActionButtons/Edit/Edit';
import Delete from '../ActionButtons/Delete/Delete';
import Details from '../ActionButtons/Details/Details';

const Table = ({
  header = [],
  data = [],
  edit,
  remove,
  details,
  onEdit = () => {},
  onDelete = () => {},
  onDetail = () => {},
}) => (
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
            <tr key={row._id}>
              {header.map(head => (
                <td key={head.col}>{row[head.col]}</td>
              ))}
              <td>
                <div className="actions">
                  {edit && <Edit click={() => onEdit(row)} /> }
                  {remove && <Delete click={() => onDelete(row)} /> }
                  {details && <Details click={() => onDetail(row)} /> }
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
