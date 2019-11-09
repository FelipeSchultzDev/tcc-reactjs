import React, { Component } from 'react';

import './Listar.scss';

import VendaService from '../../../Services/Venda.service';

import InputSearch from '../../../components/InputSearch/InputSearch';
// import Table from './Table/Table';
import VendaTable from './VendaTable/VendaTable';
import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Secondary } from '../../../components/Buttons/Buttons';

import Loader from '../../../components/Loader/Loader';

const header = [
  'dataVenda',
  'valorTotal',
  'cliente',
];

export default class Listar extends Component {
  state = {
    vendas: [],
    vendasFiltradas: [],
    showLoader: false,
  }

  async componentDidMount() {
    this.setState({
      showLoader: true,
    });
    const { data } = await VendaService.get('', { headers: {
      _token: localStorage.getItem('token'),
    } });
    this.setState({
      showLoader: false,
    });
    if (data.success) {
      this.setState({
        vendas: data.vendas,
        vendasFiltradas: data.vendas,
      });
    }
  }

  filter = (e) => {
    const { vendas } = this.state;
    if (e) {
      const query = e.target.value.trim().toLowerCase();
      if (query) {
        const filteredVendas = vendas.filter((venda) => {
          let TMP = false;
          header.forEach((head) => {
            if (venda[head] && venda[head].toString().toLowerCase().includes(query)) {
              TMP = true;
            } else if (venda[head] && venda[head].nome) {
              TMP = true;
            }
          });
          return TMP;
        });
        this.setState({
          vendasFiltradas: filteredVendas,
        });
      } else {
        this.setState({
          vendasFiltradas: vendas,
        });
      }
    } else {
      this.setState({
        vendasFiltradas: vendas,
      });
    }
  }

  backPage = () => this.props.history.push('../home');

  render() {
    return (
      <div style={{ padding: 24, minWidth: 954 }}>
        {this.state.showLoader && <Loader />}
        <div className="top-items">
          <div className="busca"><InputSearch change={this.filter} /></div>
        </div>
        <div className="table">
          <VendaTable data={this.state.vendasFiltradas} />
        </div>
        <div className="footer" style={{ marginTop: 20 }}>
          <Secondary title="Voltar" color={ButtonsColor.RED} click={this.backPage} />
        </div>
      </div>

    );
  }
}
