import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { faPlusCircle, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './Listar.scss';

import ProdutoService from '../../../Services/Produto.service';

import InputSearch from '../../../components/InputSearch/InputSearch';
import Table from '../../../components/Table/Table';
import ModalControler from '../../../components/Modals/ModalController/ModalController';
import WarningModal from '../../../components/Modals/WarningModal/WarningModal';
import DestructiveModal from '../../../components/Modals/DestructiveModal/DestructiveModal';
import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Primary, Secondary } from '../../../components/Buttons/Buttons';
import TableType from '../../../components/Table/TableType.enum';
import Detalhes from './Detalhes/Detalhes';
import AlterarEstoque from './AlterarEstoque/AlterarEstoque';

const header = [
  { title: 'Nome', col: 'nome' },
  { title: 'Data de cadastro', col: 'createdAt' },
  { title: 'Marca', col: 'marca' },
  { title: 'Quantidade', col: 'quantidade' },
  { title: 'Quantidade mínima', col: 'qtdMinima' },
  { title: 'Valor de venda', col: 'valorVenda' },
];

export default class Listar extends Component {
  state = {
    produtos: [],
    produtosFiltrados: [],
    itemTemp: {},
    changeEstoque: false,
    estoqueId: '',
    [TableType.TYPE.DISABLE]: false,
    [TableType.TYPE.DELETE]: false,
    [TableType.TYPE.DETAIL]: false,
  }


  componentDidMount() {
    this.getProdutos();
  }

  getProdutos = async () => {
    const response = await ProdutoService.get('habilitados', { headers: {
      _token: localStorage.getItem('token'),
    } });
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

  onActionToModal = ({ type, item, action }) => {
    const Type = TableType.TYPE;
    if (action && (type === Type.DETAIL || type === Type.DISABLE || type === Type.DELETE)) {
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
    if (type === TableType.TYPE.EDIT) {
      this.props.history.push(`./editar/${item._id}`);
    }
    this.openModal(type);
    if (item) {
      this.setItemTemp(item);
    }
  }

  [TableType.TYPE.DISABLE] = async () => {
    const response = await ProdutoService.put(`${this.state.itemTemp._id}/desativar`, {}, { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (response.data.success) this.componentDidMount();
  };

  [TableType.TYPE.DELETE] = async () => {
    const response = await ProdutoService.delete(`${this.state.itemTemp._id}`, { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (response.data.success) this.componentDidMount();
  };

  filter = (e) => {
    const { produtos } = this.state;
    if (e) {
      const query = e.target.value.trim().toLowerCase();
      if (query) {
        const filteredProdutos = produtos.filter((produto) => {
          let TMP = false;
          header.forEach((head) => {
            if (produto[head.col].toLowerCase().includes(query)) {
              TMP = true;
            }
          });
          return TMP;
        });
        this.setState({
          produtosFiltrados: filteredProdutos,
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

  backPage = () => this.props.history.push('../home');

  convertCpf = cpf => `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;

  onDoubleClick = (id, col) => {
    if (col === 'quantidade') {
      this.setState({
        estoqueId: id,
        changeEstoque: true,
      });
    }
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

  render() {
    return (
      <div className="listar-produtos" style={{ padding: 24, minWidth: 954 }}>
        {this.state.changeEstoque && (
        <ModalControler>
          <AlterarEstoque
            id={this.state.estoqueId}
            onClose={() => this.setState({ changeEstoque: false, estoqueId: '' })}
            onComplete={() => {
              this.getProdutos();
              this.setState({
                estoqueId: '',
                changeEstoque: false,
              });
            }}
          />
        </ModalControler>
        )}
        {this.state[TableType.TYPE.DETAIL] && (
        <ModalControler>
          <Detalhes
            type={TableType.TYPE.DETAIL}
            onAccept={this.onActionToModal}
            id={this.state.itemTemp._id}
          />
        </ModalControler>
        )}
        {this.state[TableType.TYPE.DISABLE] && (
        <ModalControler>
          <WarningModal
            type={TableType.TYPE.DISABLE}
            onCancel={this.onActionToModal}
            onAccept={this.onActionToModal}
            primaryMsg="Tem certeza?"
            secondaryMsg="Você tem certeza que deseja desabilitar este produto?"
            primaryBtn="Desabilitar"
          />
        </ModalControler>
        )}
        {this.state[TableType.TYPE.DELETE] && (
        <ModalControler>
          <DestructiveModal
            type={TableType.TYPE.DELETE}
            onCancel={this.onActionToModal}
            onAccept={this.onActionToModal}
            primaryMsg="Tem certeza?"
            secondaryMsg="Você tem certeza que deseja deletar este produto? Esta ação não pode ser revertida."
            primaryBtn="Deletar"
          />
        </ModalControler>
        )}
        <div className="top-items">
          <div className="left">
            <div className="cadastrar">
              <Link to="cadastrar" style={{ textDecoration: 'none' }}>
                <Primary title="Cadastrar produto" icon={faPlusCircle} color={ButtonsColor.GREEN} />
              </Link>
            </div>
            <div className="desabilitados">
              <Link to="desabilitados" style={{ textDecoration: 'none' }}>
                <Primary title="Desabilitados" icon={faEyeSlash} color={ButtonsColor.GREY} />
              </Link>
            </div>
          </div>
          <div className="right">
            <div className="busca"><InputSearch change={this.filter} /></div>
          </div>
        </div>
        <div className="table">
          <Table
            header={header}
            data={this.state.produtosFiltrados}
            details="true"
            disable="true"
            edit="true"
            remove="true"
            onDisable={this.onActionToModal}
            onEdit={this.onActionToModal}
            onDelete={this.onActionToModal}
            onDetail={this.onActionToModal}
            onDoubleClick={this.onDoubleClick}
          />
        </div>
        <div className="footer" style={{ marginTop: 24 }}>
          <Secondary title="Voltar" color={ButtonsColor.RED} click={this.backPage} />
        </div>
      </div>

    );
  }
}
