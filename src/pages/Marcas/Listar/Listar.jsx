import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { faPlusCircle, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './Listar.scss';

import MarcaService from '../../../Services/Marca.service';

import InputSearch from '../../../components/InputSearch/InputSearch';
import Table from '../../../components/Table/Table';
import ModalControler from '../../../components/Modals/ModalController/ModalController';
import WarningModal from '../../../components/Modals/WarningModal/WarningModal';
import DestructiveModal from '../../../components/Modals/DestructiveModal/DestructiveModal';
import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Primary } from '../../../components/Buttons/Buttons';
import TableType from '../../../components/Table/TableType.enum';

const header = [
  { title: 'Nome', col: 'nome' },
  { title: 'Data de cadastro', col: 'createdAt' },
];

export default class Listar extends Component {
  state = {
    marcas: [],
    itemTemp: {},
    [TableType.TYPE.DISABLE]: false,
  }

  async componentDidMount() {
    const response = await MarcaService.get('habilitados');
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
  }

  onActionToModal = ({ type, item, action }) => {
    if (action && (type === TableType.TYPE.DISABLE || type === TableType.TYPE.DELETE)) {
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
    } if (type === TableType.TYPE.EDIT) {
      this.props.history.push('./editar');
    }
    this.openModal(type);
    this.setItemTemp(item);
  }

  [TableType.TYPE.DISABLE] = async () => {
    const response = await MarcaService.put(`${this.state.itemTemp._id}/desativar`);
    if (response.data.success) this.componentDidMount();
  };

  [TableType.TYPE.DELETE] = async () => {
    const response = await MarcaService.delete(`${this.state.itemTemp._id}`);
    if (response.data.success) this.componentDidMount();
  };

  openModal = type => this.setState({ [type]: true });

  closeModal = type => this.setState({ [type]: false });

  setItemTemp = item => this.setState({ itemTemp: item });

  clearItemTemp = () => this.setState({ itemTemp: {} });

  render() {
    return (
      <div style={{ padding: 24, minWidth: 954 }}>
        {this.state[TableType.TYPE.DISABLE] && (
        <ModalControler>
          <WarningModal
            type={TableType.TYPE.DISABLE}
            onCancel={this.onActionToModal}
            onAccept={this.onActionToModal}
            primaryMsg="Tem certeza?"
            secondaryMsg="Você tem certeza que deseja desabilitar esta marca?"
            primaryBtn="Deletar"
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
            secondaryMsg="Você tem certeza que deseja desabilitar esta marca? Esta ação não pode ser revertida."
            primaryBtn="Deletar"
          />
        </ModalControler>
        )}
        <div className="top-items">
          <div className="left">
            <div className="cadastrar">
              <Link to="cadastrar" style={{ textDecoration: 'none' }}>
                <Primary title="Cadastrar marca" icon={faPlusCircle} color={ButtonsColor.GREEN} />
              </Link>
            </div>
            <div className="desabilitados">
              <Link to="desabilitados" style={{ textDecoration: 'none' }}>
                <Primary title="Desabilitados" icon={faEyeSlash} color={ButtonsColor.GREY} />
              </Link>
            </div>
          </div>
          <div className="right">
            <div className="busca"><InputSearch /></div>
          </div>
        </div>
        <div className="table">
          <Table header={header} data={this.state.marcas} disable="true" edit="true" remove="true" onDisable={this.onActionToModal} onEdit={this.onActionToModal} onDelete={this.onActionToModal} />
        </div>
      </div>

    );
  }
}
