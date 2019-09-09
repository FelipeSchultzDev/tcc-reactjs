import React, { Component } from 'react';

import './Cadastrar.scss';

import MarcaService from '../../../Services/Marca.service';

import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Primary, Secondary } from '../../../components/Buttons/Buttons';
import Input from '../../../components/Input/Input';


export default class Cadastrar extends Component {
  state = {
    nome: '',
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

  create = async () => {
    const { nome } = this.state;
    if (nome) {
      const { data } = await MarcaService.post('', { nome }, { headers: {
        _token: localStorage.getItem('token'),
      } });
      if (!data.success) {
        this.setState({
          erro: true,
          errorMsg: data.msg,
        });
      }
      return data;
    }
    this.setState({
      erro: true,
    });
    return { success: false };
  }

  createAndback= async () => {
    const data = await this.create();
    if (data.success) {
      this.backPage();
    }
  }

  createAndNew = async () => {
    const data = await this.create();
    if (data.success) {
      this.setState({
        nome: '',
        erro: false,
      });
    }
  }

  render() {
    return (
      <div className="cadastrar-wrapper">
        <div className="form-cadastrar-container">
          <div className="cadastrar-content">
            <Input placeholder="Digite o nome da marca" name="nome" value={this.state.nome} errorMsg={this.state.errorMsg} error={this.state.erro} onChange={this.handleChange} />
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
