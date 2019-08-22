import React, { Fragment } from 'react';

import './Table.scss';

import Edit from '../ActionButtons/Edit/Edit';
import Delete from '../ActionButtons/Delete/Delete';
import Details from '../ActionButtons/Details/Details';
import Disable from '../ActionButtons/Disable/Disable';
import TableType from './TableType.enum';

const Table = ({
  header = [],
  data = [],
  disable,
  edit,
  remove,
  details,
  onDisable = () => {},
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
                  {disable && (
                    <Disable click={() => onDisable({ type: TableType.DISABLE, item: row })} />
                  )}
                  {edit && (
                    <Edit click={() => onEdit({ type: TableType.EDIT, item: row })} />
                  )}
                  {remove && (
                    <Delete click={() => onDelete({ type: TableType.DELETE, item: row })} />
                  )}
                  {details && (
                    <Details click={() => onDetail({ type: TableType.DETAIL, item: row })} />
                  )}
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
