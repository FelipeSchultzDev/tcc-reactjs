import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import HomeService from '../../Services/Home.service';

import './Home.scss';

import Header from '../../components/Header/Header';
import HomeTable from './HomeTable/HomeTable';

import Loader from '../../components/Loader/Loader';

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [totalHoje, setTotalHoje] = useState('00');
  const [totalMes, setTotalMes] = useState('00');
  const [totalAtention, setTotalAtention] = useState(0);
  const [totalDanger, setTotalDanger] = useState(0);

  const [showLoader, setShowLoader] = useState(false);

  const retrieveProdutos = async () => {
    const { data } = await HomeService.get('', { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (data && data.success) {
      setShowLoader(false);
      setProdutos(data.listaProdutos.produtos);
      setTotalHoje(data.totalVendasHoje);
      setTotalMes(data.totalVendasMes);
      setTotalDanger(data.listaProdutos.vazio);
      setTotalAtention(data.listaProdutos.quantidadeBaixa);
    }
  };

  useEffect(() => {
    setShowLoader(true);
    retrieveProdutos();
  }, []);

  return (
    <>
      {showLoader && <Loader />}
      <Header />
      <div className="home-container">
        <div className="quantidades">
          <div className="total-dia">
            <div className="total-title">Total de vendas de hoje</div>
            <div className="value">{totalHoje}</div>
          </div>
          <div className="total-mes">
            <div className="total-title">Total de vendas do mês</div>
            <div className="value">{totalMes}</div>
          </div>
        </div>
        <div className="table">
          <header>
            <div className="atention">
              <FontAwesomeIcon icon={faInfoCircle} />
              <span>{totalAtention}</span>
            </div>
            <div className="danger">
              <FontAwesomeIcon icon={faTimesCircle} />
              <span>{totalDanger}</span>
            </div>
          </header>
          <section>
            <HomeTable data={produtos} />
          </section>
        </div>
      </div>
    </>
  );
};
export default Home;
