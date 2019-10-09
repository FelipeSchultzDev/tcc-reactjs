import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import './Paginator.scss';

const Paginator = ({ data, onPaginate }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [nextButtonState, setNextButtonState] = useState(true);
  const [previousButtonState, setPreviousButtonState] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(10);
  const [page, setPage] = useState(0);

  const filter = (dataTable, currentPage) => {
    if (!data.length) {
      return;
    }

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
    onPaginate(dataTable.slice((newFrom - 1), (newTo)));
    setFrom(newFrom);
    setTo(newTo);
  };

  const nextPage = () => {
    setPage(page + 1);
    filter(data, page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
    filter(data, page - 1);
  };

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
  );
};

export default Paginator;
