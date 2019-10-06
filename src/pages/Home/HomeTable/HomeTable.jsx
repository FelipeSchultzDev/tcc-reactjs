import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './HomeTable.scss';

const HomeTable = ({
  data = [],
}) => (
  <div className="home-table-wrapper">
    <table className="table-component">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Quantidade</th>
          <th>qtdMinima</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {!data.length && (
          <tr>
            <td colSpan="4">Sem registros</td>
          </tr>
        )}
        {data.map(row => (
          <tr key={row._id}>
            <td>
              <span>{row.nome}</span>
            </td>
            <td>
              <span>{row.quantidade}</span>
            </td>
            <td>
              <span>{row.qtdMinima}</span>
            </td>
            <td className="status">
              {(row.quantidade <= row.qtdMinima && row.quantidade > 0) && (
                <div className="atention">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </div>
              )}
              {!row.quantidade && (
                <div className="danger">
                  <FontAwesomeIcon icon={faTimesCircle} />
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default HomeTable;
