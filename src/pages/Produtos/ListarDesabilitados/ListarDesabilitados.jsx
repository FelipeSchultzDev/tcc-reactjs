import React, { Component } from 'react';

import './ListarDesabilitados.scss';

import ProdutoService from '../../../Services/Produto.service';

import InputSearch from '../../../components/InputSearch/InputSearch';
import Table from '../../../components/Table/Table';
import ModalControler from '../../../components/Modals/ModalController/ModalController';
import WarningModal from '../../../components/Modals/WarningModal/WarningModal';
import { Secondary } from '../../../components/Buttons/Buttons';
import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import TableType from '../../../components/Table/TableType.enum';

import Loader from '../../../components/Loader/Loader';

const header = [
  { title: 'Nome', col: 'nome' },
  { title: 'Data de cadastro', col: 'createdAt' },
  { title: 'Marca', col: 'marca' },
  { title: 'Quantidade', col: 'quantidade' },
  { title: 'Quantidade mínima', col: 'qtdMinima' },
  { title: 'Valor de venda', col: 'valorVenda' },
];

export default class ListarDesabilitados extends Component {
  state = {
    produtos: [],
    produtosFiltrados: [],
    itemTemp: {},
    [TableType.TYPE.DISABLE]: false,
    [TableType.TYPE.DELETE]: false,
    [TableType.TYPE.DETAIL]: false,
    showLoader: false,
  }

  async componentDidMount() {
    this.setState({
      showLoader: true,
    });
    const response = await ProdutoService.get('desabilitados', { headers: {
      _token: localStorage.getItem('token'),
    } });
    this.setState({
      showLoader: false,
    });
    if (response.data.success) {
      if (response.data.produtos.length === 0) {
        this.setState({
          produtos: [],
        });
      } else {
        const newProdutos = response.data.produtos.map(produto => ({
          ...produto,
          quantidade: `${produto.quantidade} ${produto.unidadeMedida.nome}`,
          qtdMinima: `${produto.qtdMinima} ${produto.unidadeMedida.nome}`,
          valorVenda: new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(produto.valorVenda),
          marca: produto.marca ? produto.marca.nome : '-',
          createdAt: this.dateConvert(produto.createdAt),
        }));
        this.setState({
          produtos: newProdutos,
        });
      }
    }
    this.filter();
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

  onActionToModal = ({ type, item, action }) => {
    if (action && type === TableType.TYPE.ENABLE) {
      switch (action) {
        case TableType.ACTION.CANCEL:
          this.closeModal(type);
          this.clearItemTemp();
          break;
        case TableType.ACTION.ACCEPT:
          this.closeModal(type);
          this[type]();
          break;
        default:
          break;
      }
      return;
    }
    this.openModal(type);
    this.setItemTemp(item);
  }

  [TableType.TYPE.ENABLE] = async () => {
    const _token = localStorage.getItem('token');
    this.setState({
      showLoader: true,
    });
    const response = await ProdutoService.put(`${this.state.itemTemp._id}/ativar`, {}, { headers: { _token } });
    this.setState({
      showLoader: false,
    });
    if (response.data.success) this.componentDidMount();
  };

  filter = (e) => {
    const { produtos } = this.state;
    if (e) {
      const query = e.target.value.trim().toLowerCase();
      if (query) {
        const filteredProducts = produtos.filter((produto) => {
          let TMP = false;
          header.forEach((head) => {
            if (produto[head.col].toLowerCase().includes(query)) {
              TMP = true;
            }
          });
          return TMP;
        });
        this.setState({
          produtosFiltrados: filteredProducts,
        });
      } else {
        this.setState({
          produtosFiltrados: produtos,
        });
      }
    } else {
      this.setState({
        produtosFiltrados: produtos,
      });
    }
  }

  openModal = type => this.setState({ [type]: true });

  closeModal = type => this.setState({ [type]: false });

  setItemTemp = item => this.setState({ itemTemp: item });

  clearItemTemp = () => this.setState({ itemTemp: {} });

  backPage = () => this.props.history.push('./listar');

  convertCpf = cpf => `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;

  render() {
    return (
      <div className="lista-desabilitados" style={{ padding: 24, minWidth: 954 }}>
        {this.state.showLoader && <Loader />}
        {this.state[TableType.TYPE.ENABLE] && (
        <ModalControler>
          <WarningModal
            type={TableType.TYPE.ENABLE}
            onCancel={this.onActionToModal}
            onAccept={this.onActionToModal}
            primaryMsg="Tem certeza?"
            secondaryMsg="Você tem certeza que deseja habilitar este cliente?"
            primaryBtn="Habilitar"
          />
        </ModalControler>
        )}
        <div className="top-items">
          <div className="busca"><InputSearch change={this.filter} /></div>
        </div>
        <div className="table">
          <Table header={header} data={this.state.produtosFiltrados} enable="true" onEnable={this.onActionToModal} />
        </div>
        <div className="footer" style={{ marginTop: 24 }}>
          <Secondary title="Voltar" color={ButtonsColor.RED} click={this.backPage} />
        </div>
      </div>

    );
  }
}
