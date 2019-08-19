import React, { Component } from 'react';

import './EditModal.scss';

import { Primary, Secondary } from '../../../components/Buttons/Buttons';
import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import Input from '../../../components/Input/Input';

export default class EditModal extends Component {
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
      <div className="edit-marca-modal">
        <form onSubmit={this.handleSubmit}>
          <div className="edit-modal-content">
            <Input type="text" placeholder="Digite o novo nome da marca" name="nome" onChange={this.handleChange} value={this.state.nome} />
          </div>
          <div className="edit-modal-footer">
            <Secondary click={this.props.handleBack} color={ButtonsColor.RED} title="Voltar" />
            <Primary type="submit" color={ButtonsColor.GREEN} title="Salvar alterações" />
          </div>
        </form>
      </div>
    );
  }
}
