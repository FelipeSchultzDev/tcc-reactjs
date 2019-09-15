import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { faPlusCircle, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './Listar.scss';

import ClienteService from '../../../Services/Cliente.service';

import InputSearch from '../../../components/InputSearch/InputSearch';
import Table from '../../../components/Table/Table';
import ModalControler from '../../../components/Modals/ModalController/ModalController';
import WarningModal from '../../../components/Modals/WarningModal/WarningModal';
import DestructiveModal from '../../../components/Modals/DestructiveModal/DestructiveModal';
import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Primary, Secondary } from '../../../components/Buttons/Buttons';
import TableType from '../../../components/Table/TableType.enum';
import Detalhes from './Detalhes/Detalhes';

const header = [
  { title: 'Nome', col: 'nome' },
  { title: 'Data de cadastro', col: 'createdAt' },
  { title: 'Cpf', col: 'cpf' },
  { title: 'Data de nascimento', col: 'nascimento' },
];

export default class Listar extends Component {
  state = {
    clientes: [],
    clientesFiltrados: [],
    itemTemp: {},
    [TableType.TYPE.DISABLE]: false,
    [TableType.TYPE.DELETE]: false,
    [TableType.TYPE.DETAIL]: false,
  }


  async componentDidMount() {
    const response = await ClienteService.get('habilitados', { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (response.data.success) {
      if (response.data.clientes.length === 0) {
        this.setState({
          clientes: [],
        });
      } else {
        const newClientes = response.data.clientes.map(cliente => ({
          ...cliente,
          createdAt: this.dateConvert(cliente.createdAt),
          nascimento: this.dateConvert(cliente.nascimento, 'asd'),
          cpf: this.convertCpf(cliente.cpf),
        }));
        this.setState({
          clientes: newClientes,
        });
      }
    }
    this.filter();
  }


  onActionToModal = ({ type, item, action }) => {
    if (action && (type === TableType.TYPE.DETAIL || type === TableType.TYPE.DISABLE || type === TableType.TYPE.DELETE)) {
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
    const response = await ClienteService.put(`${this.state.itemTemp._id}/desativar`, {}, { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (response.data.success) this.componentDidMount();
  };

  [TableType.TYPE.DELETE] = async () => {
    const response = await ClienteService.delete(`${this.state.itemTemp._id}`, { headers: {
      _token: localStorage.getItem('token'),
    } });
    console.log(response.data);
    if (response.data.success) this.componentDidMount();
  };

  filter = (e) => {
    const { clientes } = this.state;
    if (e) {
      const query = e.target.value.trim().toLowerCase();
      if (query) {
        const filteredClientes = clientes.filter((cliente) => {
          let TMP = false;
          header.forEach((head) => {
            if (cliente[head.col].toLowerCase().includes(query)) {
              TMP = true;
            }
          });
          return TMP;
        });
        this.setState({
          clientesFiltrados: filteredClientes,
        });
      } else {
        this.setState({
          clientesFiltrados: clientes,
        });
      }
    } else {
      this.setState({
        clientesFiltrados: clientes,
      });
    }
  }

  openModal = type => this.setState({ [type]: true });

  closeModal = type => this.setState({ [type]: false });

  setItemTemp = item => this.setState({ itemTemp: item });

  clearItemTemp = () => this.setState({ itemTemp: {} });

  backPage = () => this.props.history.push('../home');

  convertCpf = cpf => `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;

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
      <div style={{ padding: 24, minWidth: 954 }}>
        {this.state[TableType.TYPE.DETAIL] && (
        <ModalControler>
          <Detalhes type={TableType.TYPE.DETAIL} onAccept={this.onActionToModal} id={this.state.itemTemp._id} />
        </ModalControler>
        )}
        {this.state[TableType.TYPE.DISABLE] && (
        <ModalControler>
          <WarningModal
            type={TableType.TYPE.DISABLE}
            onCancel={this.onActionToModal}
            onAccept={this.onActionToModal}
            primaryMsg="Tem certeza?"
            secondaryMsg="Você tem certeza que deseja desabilitar este cliente?"
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
            secondaryMsg="Você tem certeza que deseja deletar este cliente? Esta ação não pode ser revertida."
            primaryBtn="Deletar"
          />
        </ModalControler>
        )}
        <div className="top-items">
          <div className="left">
            <div className="cadastrar">
              <Link to="cadastrar" style={{ textDecoration: 'none' }}>
                <Primary title="Cadastrar cliente" icon={faPlusCircle} color={ButtonsColor.GREEN} />
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
            data={this.state.clientesFiltrados}
            details="true"
            disable="true"
            edit="true"
            remove="true"
            onDisable={this.onActionToModal}
            onEdit={this.onActionToModal}
            onDelete={this.onActionToModal}
            onDetail={this.onActionToModal}
          />
        </div>
        <div className="footer" style={{ marginTop: 24 }}>
          <Secondary title="Voltar" color={ButtonsColor.RED} click={this.backPage} />
        </div>
      </div>

    );
  }
}
