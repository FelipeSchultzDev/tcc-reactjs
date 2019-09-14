import React, { Component } from 'react';

import './Cadastrar.scss';

import ClienteService from '../../../Services/Cliente.service';

import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Primary, Secondary } from '../../../components/Buttons/Buttons';
import Input from '../../../components/Input/Input';


export default class Cadastrar extends Component {
  state = {
    nome: '',
    email: '',
    celular: '',
    cpf: '',
    nascimento: '',
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

  create = async () => {
    const { data } = await ClienteService.post('', {}, { headers: {
      _token: localStorage.getItem('token'),
    } });
    console.log(data);
    return data;
  }

  validate = () => {}

  createAndback= async () => {
    const data = await this.create();
    if (data.success) {
      this.backPage();
    }
  }

  createAndNew = async () => {
    await this.create();
  }

  render() {
    return (
      <div className="cadastrar-wrapper">
        <div className="form-cadastrar-container">
          <div className="cadastrar-content">
            <div className="separator">
              <Input placeholder="Digite o nome" name="nome" value={this.state.nome} errorMsg={this.state.errorMsg} error={this.state.erro} onChange={this.handleChange} />
            </div>
            <div className="separator">
              <Input placeholder="Digite o email" name="email" value={this.state.email} onChange={this.handleChange} />
            </div>
            <div className="separator">
              <Input placeholder="Digite o celular" name="celular" value={this.state.celular} onChange={this.handleChange} />
            </div>
            <div className="separator">
              <Input placeholder="Digite o cpf" name="cpf" value={this.state.cpf} onChange={this.handleChange} />
            </div>
            <div className="separator">
              <Input placeholder="Digite a data de nascimento" name="nascimento" value={this.state.nascimento} onChange={this.handleChange} />
            </div>
          </div>
          <div className="cadastrar-footer">
            <Secondary title="Voltar" color={ButtonsColor.RED} click={this.backPage} />
            <div>
              <Secondary title="Salvar e cadastrar nova" color={ButtonsColor.GREEN} click={this.createAndNew} />
              <Primary title="Cadastrar" color={ButtonsColor.GREEN} click={this.createAndback} />
            </div>
          </div>
        </div>
      </div>

    );
  }
}
