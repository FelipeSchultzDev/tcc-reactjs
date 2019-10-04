import React, { Component } from 'react';

export default class VendaTable extends Component {
  state = {
    data: this.props.data ? this.props.data : [],
    expandedRows: [],
  };

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter(id => id !== rowId)
      : currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  renderItem(venda) {
    const clickCallback = () => this.handleRowClick(venda._id);
    const itemRows = [
      <tr onClick={clickCallback} key={`row-data-${venda._id}`}>
        <td>{venda.dataVenda}</td>
        <td>{venda.valorTotal}</td>
        <td>venda.status</td>
      </tr>,
    ];

    if (this.state.expandedRows.includes(venda.id)) {
      itemRows.push(
        <tr key={`row-expanded-${venda._id}`}>
          <td>{venda.name}</td>
          <td>{venda.points}</td>
          <td>{venda.percent}</td>
        </tr>,
      );
    }

    return itemRows;
  }

  render() {
    let allItemRows = [];


    this.state.data.forEach((venda) => {
      const perItemRows = this.renderItem(venda);
      allItemRows = allItemRows.concat(perItemRows);
    });
    console.log(allItemRows);

    return (
      <table border="1">
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
    );
  }
}
