/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { faPlusCircle, faEye, faFilter } from '@fortawesome/free-solid-svg-icons';

import './Marcas.scss';

import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import InputSearch from '../../components/InputSearch/InputSearch';
import Table from '../../components/Table/Table';
import ButtonsColor from '../../components/Buttons/ButtonsColor.enum';
import ModalController from '../../components/ModalController/ModalController';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import CreateModal from './CreateModal/CreateModal';
import EditModal from './EditModal/EditModal';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import PositiveModal from '../../components/PositiveModal/PositiveModal';
import { Primary } from '../../components/Buttons/Buttons';

import MarcaService from '../../Services/Marca.service';

const tableHead = [
  { title: 'Nome', col: 'nome' },
  { title: 'Data de cadastro', col: 'createdAt' },
];

export default class Marcas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemTemp: {},
      delete: false,
      create: false,
      error: false,
      conclued: false,
      edit: false,
      errorMsg: '',
      marcas: [],
    };
  }

  async componentDidMount() {
    console.log(1);

    const response = await MarcaService.get('/habilitados');
    const { marcas } = response.data;
    if (response.data.success) {
      this.setState({
        marcas: marcas.map(marca => ({
          ...marca,
          createdAt: new Date(marca.createdAt).toLocaleDateString('pt-br'),
        })),
      });
    }
  }

  handleCreateMarca = async (e) => {
    if (e.nome.length > 0) {
      const response = await MarcaService.post('', e);
      const { data } = response;
      if (data.success) {
        this.componentDidMount();
        this.closeModal('create');
        this.openModal('conclued');
      } else {
        this.setState({
          errorMsg: data.msg,
        });
        this.openModal('error');
      }
    } else {
      this.setState({
        errorMsg: 'O campo nome não pode ficar vazio!',
      });
      this.openModal('error');
    }
  };

  closeModal = (modal) => {
    this.setState({
      [modal]: false,
    });
  }

  openModal = (modal) => {
    this.setState({
      [modal]: true,
    });
  }

  deleteItemSelect = (item) => {
    this.setState({
      itemTemp: item,
    });
    this.openModal('delete');
  }

  clearItemSelect = () => {
    this.setState({
      itemTemp: {},
    });
    this.closeModal('delete');
  }

  deleteItem = async () => {
    this.closeModal('delete');

    const id = this.state.itemTemp._id;
    if (id) {
      const response = await MarcaService.delete(`${id}`);
      if (response.data.success) {
        this.componentDidMount();
        this.openModal('conclued');
      }
    }
  }

  openCreateModal = () => {
    this.setState({
      create: true,
    });
  }

  render() {
    return (
      <div className="page-wrapper">
        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
        {this.state.delete && (
        <ModalController>
          <DeleteModal onCancel={this.clearItemSelect} onAccept={this.deleteItem} />
        </ModalController>
        )}
        {this.state.create && (
        <ModalController>
          <CreateModal handleBack={() => this.closeModal('create')} submit={this.handleCreateMarca} />
        </ModalController>
        )}
        {this.state.error && (
        <ModalController>
          <ErrorModal onAccept={() => this.closeModal('error')} msg={this.state.errorMsg} />
        </ModalController>
        )}
        {this.state.conclued && (
        <ModalController>
          <PositiveModal onAccept={() => this.closeModal('conclued')} />
        </ModalController>
        )}
        {this.state.edit && (
        <ModalController>
          <EditModal onCancel={this.clearItemSelect} onAccept={this.editItem} />
        </ModalController>
        )}
        <Sidebar path={this.props.path}>
          <Header />
          <div style={{ padding: 24, minWidth: 1094 }}>
            <div className="top-items">
              <div className="left">
                <div className="cadastrar"><Primary title="Cadastrar marca" icon={faPlusCircle} color={ButtonsColor.GREEN} click={() => this.openModal('create')} /></div>
                <div className="desabilitados"><Primary title="Desabilitados" icon={faEye} color={ButtonsColor.GREY} /></div>
              </div>
              <div className="right">
                <div className="busca"><InputSearch /></div>
                <div className="filtro"><Primary title="Filtros" icon={faFilter} color={ButtonsColor.GREY} /></div>
              </div>
            </div>
            <div className="table">
              <Table header={tableHead} data={this.state.marcas} edit="true" remove="true" onEdit={this.teste} onDelete={this.deleteItemSelect} onDetail={this.teste} />
            </div>
          </div>
        </Sidebar>
      </div>
    );
  }
}
