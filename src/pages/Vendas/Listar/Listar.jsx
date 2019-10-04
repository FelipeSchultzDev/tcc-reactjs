import React, { Component } from 'react';

import './Listar.scss';

import VendaService from '../../../Services/Venda.service';

import InputSearch from '../../../components/InputSearch/InputSearch';
// import Table from './Table/Table';
import VendaTable from './VendaTable/VendaTable';
import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Secondary } from '../../../components/Buttons/Buttons';

export default class Listar extends Component {
  state = {
    vendas: [],
  }

  async componentDidMount() {
    const { data } = await VendaService.get('', { headers: {
      _token: localStorage.getItem('token'),
    } });

    if (data.success) {
      this.setState({
        vendas: data.vendas,
      });
    }
  }


  backPage = () => this.props.history.push('../home');

  render() {
    return (
      <div style={{ padding: 24, minWidth: 954 }}>
        <div className="top-items">
          <div className="busca"><InputSearch change={this.filter} /></div>
        </div>
        <div className="table">
          <VendaTable data={this.state.vendas} />
        </div>
        <div className="footer" style={{ marginTop: 24 }}>
          <Secondary title="Voltar" color={ButtonsColor.RED} click={this.backPage} />
        </div>
      </div>

    );
  }
}
