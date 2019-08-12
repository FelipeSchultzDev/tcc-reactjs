import React, { Component } from 'react';

import './CreateModal.scss';

import { Primary, Secondary } from '../../../components/Buttons/Buttons';
import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import Input from '../../../components/Input/Input';

export default class CreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
    };
  }

  handleChange = (e) => {
    const { value } = e.target;
    const { name } = e.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submit(this.state);
  }

  render() {
    return (
      <div className="create-marca-modal">
        <form onSubmit={this.handleSubmit}>
          <div className="create-modal-content">
            <Input type="text" placeholder="Digite o nome da marca" name="nome" onChange={this.handleChange} value={this.state.nome} />
          </div>
          <div className="create-modal-footer">
            <Secondary click={this.props.handleBack} color={ButtonsColor.RED} title="Voltar" />
            <Primary type="submit" color={ButtonsColor.GREEN} title="Cadastrar" />
          </div>
        </form>
      </div>
    );
  }
}
