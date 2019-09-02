import React, { Component } from 'react';

import './Editar.scss';

// import MarcaService from '../../../Services/Marca.service';

import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Primary, Secondary } from '../../../components/Buttons/Buttons';
import Input from '../../../components/Input/Input';


export default class Editar extends Component {
  state = {
    erro: false,
    errorMsg: 'O campo nome é obrigatório!',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.value) {
      if (this.state.erro) {
        this.setState({
          erro: false,
        });
      }
    } else {
      this.setState({
        erro: true,
      });
    }
  }

  backPage = () => {
    this.props.history.push('./listar');
  }

  render() {
    return (
      <div className="editar-wrapper">
        <div className="form-editar-container">
          <div className="editar-content">
            <Input placeholder="Digite o nome da marca" name="nome" errorMsg={this.state.errorMsg} error={this.state.erro} onChange={this.handleChange} />
          </div>
          <div className="editar-footer">
            <Secondary title="Voltar" color={ButtonsColor.RED} click={this.backPage} />
            <div>
              <Primary title="Salvar edições" color={ButtonsColor.GREEN} />
            </div>
          </div>
        </div>
      </div>

    );
  }
}
