import React, { Component } from 'react';

import './ListarDesabilitados.scss';

import MarcaService from '../../../Services/Marca.service';

import InputSearch from '../../../components/InputSearch/InputSearch';
import Table from '../../../components/Table/Table';
import ModalControler from '../../../components/Modals/ModalController/ModalController';
import WarningModal from '../../../components/Modals/WarningModal/WarningModal';
import { Secondary } from '../../../components/Buttons/Buttons';
import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import TableType from '../../../components/Table/TableType.enum';

const header = [
  { title: 'Nome', col: 'nome' },
  { title: 'Data de cadastro', col: 'createdAt' },
];

export default class ListarDesabilitados extends Component {
  state = {
    marcas: [],
    marcasFiltradas: [],
    itemTemp: {},
    [TableType.TYPE.ENABLE]: false,
  }

  async componentDidMount() {
    const response = await MarcaService.get('desabilitados', { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (response.data.success) {
      if (response.data.marcas.length === 0) {
        this.setState({
          marcas: [],
        });
      } else {
        const newMarca = response.data.marcas.map(marca => ({
          ...marca,
          createdAt: new Date(marca.createdAt).toLocaleDateString('pt-br'),
        }));
        this.setState({
          marcas: newMarca,
        });
      }
    }
    this.filter();
  }

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
    const response = await MarcaService.put(`${this.state.itemTemp._id}/ativar`, {}, { headers: { _token } });
    if (response.data.success) this.componentDidMount();
  };

  filter = (e) => {
    const { marcas } = this.state;
    if (e) {
      const query = e.target.value.trim();
      if (query) {
        const filteredMarcas = marcas.filter((marca) => {
          let TMP = false;
          header.forEach((head) => {
            if (marca[head.col].includes(query)) {
              TMP = true;
            }
          });
          return TMP;
        });
        this.setState({
          marcasFiltradas: filteredMarcas,
        });
      } else {
        this.setState({
          marcasFiltradas: marcas,
        });
      }
    } else {
      this.setState({
        marcasFiltradas: marcas,
      });
    }
  }

  openModal = type => this.setState({ [type]: true });

  closeModal = type => this.setState({ [type]: false });

  setItemTemp = item => this.setState({ itemTemp: item });

  clearItemTemp = () => this.setState({ itemTemp: {} });

  backPage = () => this.props.history.push('./listar');

  render() {
    return (
      <div className="lista-desabilitados" style={{ padding: 24, minWidth: 954 }}>
        {this.state[TableType.TYPE.ENABLE] && (
        <ModalControler>
          <WarningModal
            type={TableType.TYPE.ENABLE}
            onCancel={this.onActionToModal}
            onAccept={this.onActionToModal}
            primaryMsg="Tem certeza?"
            secondaryMsg="Você tem certeza que deseja habilitar esta marca?"
            primaryBtn="Habilitar"
          />
        </ModalControler>
        )}
        <div className="top-items">
          <div className="busca"><InputSearch change={this.filter} /></div>
        </div>
        <div className="table">
          <Table header={header} data={this.state.marcasFiltradas} enable="true" onEnable={this.onActionToModal} />
        </div>
        <div className="footer" style={{ marginTop: 20 }}>
          <Secondary title="Voltar" color={ButtonsColor.RED} click={this.backPage} />
        </div>
      </div>

    );
  }
}
