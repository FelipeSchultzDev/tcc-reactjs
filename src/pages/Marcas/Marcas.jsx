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
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import { Primary } from '../../components/Buttons/Buttons';

import MarcaService from '../../Services/Marca.service';

const tableHead = [
  { title: 'Nome', col: 'title' },
  { title: 'Data de cadastro', col: 'data' },
];

const dataMock = [
  { id: 1, title: 'teste', data: (new Date()).toLocaleDateString('pt-br') },
  { id: 2, title: 'teste', data: (new Date()).toLocaleDateString('pt-br') },
  { id: 3, title: 'teste', data: (new Date()).toLocaleDateString('pt-br') },
  { id: 4, title: 'teste', data: (new Date()).toLocaleDateString('pt-br') },
  { id: 5, title: 'teste', data: (new Date()).toLocaleDateString('pt-br') },
  { id: 6, title: 'teste', data: (new Date()).toLocaleDateString('pt-br') },
  { id: 7, title: 'teste', data: (new Date()).toLocaleDateString('pt-br') },
];

export default class Marcas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: false,
      deleteItemTemp: {},
      create: false,
      error: false,
      errorMsg: '',
    };
  }

  handleCreateMarca = async (e) => {
    if (e.nome.length > 0) {
      const response = await MarcaService.post('/cadastrar', e);
      const { data } = response;
      if (data.success) {
        // this.closeModal('create');
      } else {
        // this.closeModal('create');
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
      deleteItemTemp: item,
    });
    this.openModal('delete');
  }

  clearDeleteItemSelect = () => {
    this.setState({
      deleteItemTemp: {},
    });
    this.closeModal('delete');
  }

  deleteItem = () => {
    this.closeModal('delete');
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
          <DeleteModal onCancel={this.clearDeleteItemSelect} onAccept={this.deleteItem} />
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
              <Table header={tableHead} data={dataMock} edit="true" remove="true" onEdit={this.teste} onDelete={this.deleteItemSelect} onDetail={this.teste} />
            </div>
          </div>
        </Sidebar>
      </div>
    );
  }
}
