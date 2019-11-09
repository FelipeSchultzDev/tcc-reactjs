import React, { Component } from 'react';

import './ListarDesabilitados.scss';

import ClienteService from '../../../Services/Cliente.service';

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
  { title: 'Cpf', col: 'cpf' },
  { title: 'Data de nascimento', col: 'nascimento' },
];

export default class ListarDesabilitados extends Component {
  state = {
    clientes: [],
    clientesFiltrados: [],
    itemTemp: {},
    [TableType.TYPE.DISABLE]: false,
    [TableType.TYPE.DELETE]: false,
    showLoader: false,
  }

  async componentDidMount() {
    this.setState({
      showLoader: true,
    });
    const response = await ClienteService.get('desabilitados', { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (response.data.success) {
      this.setState({
        showLoader: false,
      });
      if (response.data.clientes.length === 0) {
        this.setState({
          clientes: [],
        });
      } else {
        const newClientes = response.data.clientes.map(cliente => ({
          ...cliente,
          createdAt: this.dateConvert(cliente.createdAt),
          nascimento: this.dateConvert(cliente.nascimento),
          cpf: this.convertCpf(cliente.cpf),
        }));
        this.setState({
          clientes: newClientes,
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
    const response = await ClienteService.put(`${this.state.itemTemp._id}/ativar`, {}, { headers: { _token } });
    if (response.data.success) {
      this.componentDidMount();
      this.setState({
        showLoader: false,
      });
    }
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
          <Table header={header} data={this.state.clientesFiltrados} enable="true" onEnable={this.onActionToModal} />
        </div>
        <div className="footer" style={{ marginTop: 24 }}>
          <Secondary title="Voltar" color={ButtonsColor.RED} click={this.backPage} />
        </div>
      </div>

    );
  }
}
