import React, { Component } from 'react';
// import { faPlusCircle, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './Cadastrar.scss';

// import MarcaService from '../../../Services/Marca.service';

import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Primary, Secondary } from '../../../components/Buttons/Buttons';
import Input from '../../../components/Input/Input';


export default class Cadastrar extends Component {
  state = {}

  backPage = () => {
    console.log(this.props.history.push('./listar'));
  }

  render() {
    return (
      <div className="cadastrar-wrapper">
        <Input placeholder="Digite o nome da marca" />
        <div className="cadastrar-footer">
          <Secondary title="Voltar" color={ButtonsColor.RED} click={this.backPage} />
          <div>
            <Secondary title="Salvar e cadastrar nova" color={ButtonsColor.GREEN} />
            <Primary title="Cadastrar" color={ButtonsColor.GREEN} />
          </div>
        </div>
      </div>

    );
  }
}
