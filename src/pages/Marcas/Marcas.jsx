import React, { Component } from 'react';
import { faPlusCircle, faEyeSlash, faFilter } from '@fortawesome/free-solid-svg-icons';

import './Marcas.scss';

import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import InputSearch from '../../components/InputSearch/InputSearch';
import Table from '../../components/Table/Table';
import ButtonsColor from '../../components/Buttons/ButtonsColor.enum';
import { Primary } from '../../components/Buttons/Buttons';

export default class Marcas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page-wrapper">
        <Sidebar path={this.props.path}>
          <Header />
          <div style={{ padding: 24, minWidth: 1094 }}>
            <div className="top-items">
              <div className="left">
                <div className="cadastrar"><Primary title="Cadastrar marca" icon={faPlusCircle} color={ButtonsColor.GREEN} click={() => this.openModal('create')} /></div>
                <div className="desabilitados"><Primary title="Desabilitados" icon={faEyeSlash} color={ButtonsColor.GREY} /></div>
              </div>
              <div className="right">
                <div className="busca"><InputSearch /></div>
                <div className="filtro"><Primary title="Filtros" icon={faFilter} color={ButtonsColor.GREY} /></div>
              </div>
            </div>
            <div className="table">
              <Table data={this.state.marcas} disable="true" edit="true" remove="true" onDisable={this.disableItemSelect} onEdit={this.editItemSelect} onDelete={this.deleteItemSelect} />
            </div>
          </div>
        </Sidebar>
      </div>
    );
  }
}
