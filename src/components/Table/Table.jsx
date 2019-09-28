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

  const [filterState, setFilterState] = useState({
    from: 1,
    to: 10,
    page: 0,
  });

  function filter() {
    const dataFilter = data.slice(1 - filterState.from, filterState.to);
    setTableData(dataFilter);
  }

  function calculate(page) {
    if (page >= 1) {
      setPreviousButtonState(true);
    } else {
      setPreviousButtonState(false);
    }

    setFilterState({
      from: 1 + (itemsPerPage * page),
      to: (1 + (itemsPerPage * page)) + itemsPerPage - 1,
      page,
    });

    if ((1 + (itemsPerPage * page)) + itemsPerPage - 1 >= totalItems) {
      setFilterState({
        from: 1 + (itemsPerPage * page),
        to: totalItems,
        page,
      });
      setNextButtonState(false);
    } else {
      setNextButtonState(true);
    }
  }

  function previousPage() {
    calculate(filterState.page - 1);
  }

  function nextPage() {
    calculate(filterState.page + 1);
  }

  useEffect(() => {
    setTotalItems(data.length);
    setNextButtonState((data.length > itemsPerPage));
    if (filterState.to > data.length) {
      setFilterState({
        ...filterState,
        to: itemsPerPage,
      });
    }
    filter();
  }, [data]);

  useEffect(() => {
    setFilterState({
      from: 1,
      to: itemsPerPage,
      page: 0,
    });
    setPreviousButtonState(false);
    setNextButtonState(true);
  }, [itemsPerPage]);

  useEffect(() => {
    filter();
  }, [filterState]);

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
          <select className="recordsPerPage" onChange={e => setItemsPerPage(parseInt(e.target.value, 10))}>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <span>{`${filterState.from} - ${filterState.to} de ${totalItems}`}</span>
        <button className="next" type="button" disabled={!nextButtonState} onClick={nextPage}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default Table;
