import React, { Fragment } from 'react';

import './Table.scss';

const Table = ({ header, data }) => (
  <Fragment>
    <table border="1">
      <thead>
        <tr>
          {header.map(head => <th key={head.title}>{ head.title }</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            {header.map(head => (
              <td key={head.col}>{row[head.col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </Fragment>
);

export default Table;
