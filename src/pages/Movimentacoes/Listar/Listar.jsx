import React, { Component } from 'react';

import './Listar.scss';

import MovimentacaoService from '../../../Services/Movimentacao.service';

import InputSearch from '../../../components/InputSearch/InputSearch';
import Table from '../../../components/Table/Table';
import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Secondary } from '../../../components/Buttons/Buttons';

import Loader from '../../../components/Loader/Loader';

const header = [
  { title: 'Tipo', col: 'tipo' },
  { title: 'Produto', col: 'produto' },
  { title: 'Valor', col: 'valor' },
  { title: 'Quantidade', col: 'quantidade' },
  { title: 'Data da movimentação', col: 'dataVenda' },
];

export default class Listar extends Component {
  state = {
    movimentos: [],
    movimentosFiltrados: [],
    showLoader: false,
  }


  async componentDidMount() {
    this.setState({
      showLoader: true,
    });
    const response = await MovimentacaoService.get('', { headers: {
      _token: localStorage.getItem('token'),
    } });
    this.setState({
      showLoader: false,
    });
    if (response.data.success) {
      if (response.data.movimentos.length === 0) {
        this.setState({
          movimentos: [],
        });
      } else {
        const newMovimentos = response.data.movimentos.map(movimento => ({
          ...movimento,
          tipo: movimento.tipo.nome,
          produto: movimento.produto.nome,
          valor: new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(movimento.valor),
          dataVenda: this.dateConvert(movimento.dataVenda),
        }));
        this.setState({
          movimentos: newMovimentos,
        });
      }
    }
    this.filter();
  }

  filter = (e) => {
    const { movimentos } = this.state;
    if (e) {
      const query = e.target.value.trim().toLowerCase();
      if (query) {
        const filteredClientes = movimentos.filter((movimento) => {
          let TMP = false;
          header.forEach((head) => {
            if (movimento[head.col].toString().toLowerCase().includes(query.toLowerCase())) {
              TMP = true;
            }
          });
          return TMP;
        });
        this.setState({
          movimentosFiltrados: filteredClientes,
        });
      } else {
        this.setState({
          movimentosFiltrados: movimentos,
        });
      }
    } else {
      this.setState({
        movimentosFiltrados: movimentos,
      });
    }
  }

  backPage = () => this.props.history.push('../home');

  dateConvert = (date) => {
    if (date) {
      const year = date.substring(0, 4);
      const month = date.substring(5, 7);
      const day = date.substring(8, 10);
      const data = `${day}/${month}/${year}`;
      return data;
    }
    return '';
  };

  render() {
    return (
      <div className="movimentacao" style={{ padding: 24, minWidth: 954 }}>
        {this.state.showLoader && <Loader />}
        <div className="top-items">
          <div className="busca"><InputSearch change={this.filter} /></div>
        </div>
        <div className="table">
          <Table
            header={header}
            data={this.state.movimentosFiltrados}
            noAction
          />
        </div>
        <div className="footer" style={{ marginTop: 20 }}>
          <Secondary title="Voltar" color={ButtonsColor.RED} click={this.backPage} />
        </div>
      </div>

    );
  }
}
