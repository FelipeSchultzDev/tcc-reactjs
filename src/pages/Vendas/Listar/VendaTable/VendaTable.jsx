import React, { Component } from 'react';

import './VendaTable.scss';

import Paginator from './Paginator/Paginator';

export default class VendaTable extends Component {
  state = {
    vendas: [],
    vendasFiltradas: [],
    expandedRows: [],
  };

  componentWillReceiveProps(e) {
    if (e.data && e.data.length) {
      this.setState({
        vendas: e.data,
      });
    }
  }

  isEven = index => index % 2 === 0

  onPaginate = (e) => {
    this.setState({
      vendasFiltradas: e,
    });
  }

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

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter(id => id !== rowId)
      : currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  renderItem(venda, index) {
    const clickCallback = () => this.handleRowClick(venda._id);
    const itemRows = [
      <tr onClick={clickCallback} key={`row-data-${venda._id}`} className={`row ${index ? 'even' : ''}`}>
        <td>{this.dateConvert(venda.dataVenda)}</td>
        <td>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(venda.valorTotal)}</td>
        <td>{venda.cliente ? venda.cliente.nome : '-'}</td>
      </tr>,
    ];

    if (this.state.expandedRows.includes(venda._id)) {
      venda.produtos.forEach((produto) => {
        itemRows.push(
          <tr className={`expendedRow ${index ? 'even' : ''}`} key={`row-expanded-${produto._id}`}>
            <td colSpan="3">
              <div>
                <span>
                  Produto:
                  {' '}
                  {produto.produto.nome}
                </span>
                <span>
                    Quantidade:
                  {' '}
                  {produto.quantidade}
                </span>
                <span>
                  Desconto:
                  {' '}
                  {`${produto.desconto}%`}
                </span>
                <span>
                  Valor:
                  {' '}
                  {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(produto.valor)}
                </span>
              </div>
            </td>
          </tr>,
        );
      });
    }

    return itemRows;
  }

  render() {
    let allItemRows = [];

    this.state.vendasFiltradas.forEach((venda, index) => {
      allItemRows = allItemRows.concat(this.renderItem(venda, this.isEven(index + 1)));
    });

    return (
      <div className="venda-table-wrapper">
        <table className="table-component">
          <thead>
            <tr>
              <th style={{ width: 200 }}>Data da venda</th>
              <th style={{ width: 300 }}>Valor total</th>
              <th style={{ width: 200 }}>Cliente</th>
            </tr>
          </thead>
          <tbody>
            {allItemRows}
          </tbody>
        </table>
        <Paginator data={this.state.vendas} onPaginate={this.onPaginate} />
      </div>
    );
  }
}
