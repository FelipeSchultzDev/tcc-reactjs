import React, { Component } from 'react';
import { faPlusCircle, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './Listar.scss';

import InputSearch from '../../../components/InputSearch/InputSearch';
import Table from '../../../components/Table/Table';
import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Primary } from '../../../components/Buttons/Buttons';

export default class Listar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ padding: 24, minWidth: 954 }}>
        <div className="top-items">
          <div className="left">
            <div className="cadastrar"><Primary title="Cadastrar marca" icon={faPlusCircle} color={ButtonsColor.GREEN} click={() => null} /></div>
            <div className="desabilitados"><Primary title="Desabilitados" icon={faEyeSlash} color={ButtonsColor.GREY} /></div>
          </div>
          <div className="right">
            <div className="busca"><InputSearch /></div>
          </div>
        </div>
        <div className="table">
          <Table data={this.state.marcas} disable="true" edit="true" remove="true" onDisable={() => null} onEdit={() => null} onDelete={() => null} />
        </div>
      </div>

    );
  }
}
