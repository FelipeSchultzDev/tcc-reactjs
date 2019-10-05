import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import './Table.scss';

import Edit from '../ActionButtons/Edit/Edit';
import Delete from '../ActionButtons/Delete/Delete';
import Details from '../ActionButtons/Details/Details';
import Disable from '../ActionButtons/Disable/Disable';
import Enable from '../ActionButtons/Enable/Enable';
import TableType from './TableType.enum';

const Table = ({
  header = [],
  data = [],
  enable,
  disable,
  edit,
  remove,
  details,
  noAction,
  onEnable = () => {},
  onDisable = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onDetail = () => {},
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [nextButtonState, setNextButtonState] = useState(true);
  const [previousButtonState, setPreviousButtonState] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(10);
  const [page, setPage] = useState(0);

  const filter = (dataTable, currentPage) => {
    const newFrom = 1 + (itemsPerPage * currentPage);
    let newTo = newFrom + itemsPerPage - 1;
    if (newTo > dataTable.length) {
      newTo = dataTable.length;
      setNextButtonState(false);
    } else {
      setNextButtonState(true);
    }

    if (currentPage === 0) {
      setPreviousButtonState(false);
    } else {
      setPreviousButtonState(true);
    }
    setFrom(newFrom);
    setTo(newTo);
    setTableData(dataTable.slice(newFrom - 1, newTo));
  };

  const nextPage = () => {
    setPage(page + 1);
    filter(data, page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
    filter(data, page - 1);
  };

  const getColspan = () => Object.keys(header).length + 1;

  useEffect(() => {
    filter(data, page);
    setTotalItems(data.length);
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    setTotalItems(data.length);
    setPage(0);
    filter(data, 0);
    // eslint-disable-next-line
  }, [itemsPerPage]);

  return (
    <div className="table-wrapper">
      <table className="table-component">
        <thead>
          <tr>
            {header.map(head => <th key={head.title}>{ head.title }</th>)}
            {!noAction && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {!tableData.length && (
            <tr>
              <td colSpan={getColspan()}><span>Sem registros</span></td>
            </tr>
          ) }
          {tableData.map(row => (
            <tr key={row._id}>
              {header.map(head => (
                <td key={head.col}>
                  <span>{row[head.col]}</span>
                </td>
              ))}
              {!noAction && (
              <td>
                <div className="actions">
                  {enable && (
                  <Enable click={() => onEnable({ type: TableType.TYPE.ENABLE, item: row })} />
                  )}
                  {disable && (
                  <Disable click={() => onDisable({ type: TableType.TYPE.DISABLE, item: row })} />
                  )}
                  {edit && (
                  <Edit click={() => onEdit({ type: TableType.TYPE.EDIT, item: row })} />
                  )}
                  {remove && (
                  <Delete click={() => onDelete({ type: TableType.TYPE.DELETE, item: row })} />
                  )}
                  {details && (
                  <Details click={() => onDetail({ type: TableType.TYPE.DETAIL, item: row })} />
                  )}
                </div>
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="paginator">
        <button className="previous" type="button" disabled={!previousButtonState} onClick={previousPage}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="quantidade">
          <span>Registros por paginas: </span>
          <select className="recordsPerPage" onChange={e => setItemsPerPage(Number(e.target.value))}>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <span>{`${from} - ${to} de ${totalItems}`}</span>
        <button className="next" type="button" disabled={!nextButtonState} onClick={nextPage}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default Table;
