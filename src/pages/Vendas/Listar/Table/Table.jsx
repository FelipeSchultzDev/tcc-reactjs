import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import './Table.scss';

const Table = ({
  data = [],
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

  const dateConvert = (date) => {
    if (date) {
      const year = date.substring(0, 4);
      const month = date.substring(5, 7);
      const day = date.substring(8, 10);
      const data = `${day}/${month}/${year}`;
      return data;
    }
    return '';
  };

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
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [filterState]);

  return (
    <div className="table-wrapper">
      <table className="table-component">
        <thead>
          <tr>
            <th style={{ width: 200 }}>Data da venda</th>
            <th style={{ width: 300 }}>Valor total</th>
            <th style={{ width: 200 }}>Cliente</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, i) => (
            <>
              <tr key={row._id} data-toggle="collapse" data-target="#accordion">
                <td><span>{dateConvert(row.dataVenda)}</span></td>
                <td><span>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(row.valorTotal)}</span></td>
                <td><span>{row.cliente ? row.cliente.nome : '-'}</span></td>
              </tr>
              {/* eslint-disable-next-line react/no-array-index-key */}
              <tr key={row._id + i}>
                <td>
                  <div id="accordion" />
                </td>
              </tr>
            </>
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
