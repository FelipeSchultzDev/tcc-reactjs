import React, { Component } from 'react';

import './Cadastrar.scss';

import ClienteService from '../../../Services/Cliente.service';

import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Primary, Secondary } from '../../../components/Buttons/Buttons';
import Input from '../../../components/Input/Input';
import MyInputMask from '../../../components/MyInputMask/MyInputMask';

import Loader from '../../../components/Loader/Loader';


export default class Cadastrar extends Component {
  state = {
    showLoader: false,
    nome: {
      value: '',
      error: false,
      msg: '',
    },
    email: {
      value: '',
      error: false,
      msg: '',
    },
    celular: {
      value: '',
      error: false,
      msg: '',
    },
    cpf: {
      value: '',
      error: false,
      msg: '',
    },
    nascimento: {
      value: '',
      error: false,
      msg: '',
    },
  }

  handleChange = (e) => {
    const previousState = this.state[e.target.name];
    this.setState({
      [e.target.name]: {
        ...previousState,
        error: false,
        value: e.target.value,
      },
    });
  }

  backPage = () => {
    this.props.history.push('./listar');
  }

  create = async () => {
    this.setState({
      showLoader: true,
    });
    const { data } = await ClienteService.post('', this.createObj(), { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (typeof data.msg === 'object') {
      this.validate(data.msg);
    }
    return data;
  }

  createObj = () => {
    const person = {
      nome: this.state.nome.value.trim(),
      email: this.state.email.value.trim(),
      celular: this.state.celular.value.trim(),
      cpf: this.state.cpf.value.trim(),
      nascimento: this.dateFormat(this.state.nascimento.value.trim()),
    };
    return person;
  }

  clear = () => {
    Object.keys(this.state).forEach((key) => {
      if (key !== 'showLoader') {
        this.setState({
          [key]: {
            value: '',
            error: false,
            msg: '',
          },
        });
      }
    });
  }

  validate = (errorList = []) => {
    Object.keys(this.state).forEach((key) => {
      if (key !== 'showLoader' && errorList.some(error => error.toLowerCase().includes(key))) {
        const { value } = this.state[key];
        this.setState({
          [key]: {
            value,
            error: true,
            msg: errorList.filter(error => error.toLowerCase().includes(key))[0],
          },
        });
      } else if (key !== 'showLoader') {
        const { value } = this.state[key];
        this.setState({
          [key]: {
            value,
            error: false,
            msg: '',
          },
        });
      }
    });
  }

  createAndback= async () => {
    const data = await this.create();
    this.setState({
      showLoader: false,
    });
    if (data.success) {
      this.backPage();
    }
  }

  createAndNew = async () => {
    const data = await this.create();
    this.setState({
      showLoader: false,
    });
    if (data.success) {
      this.clear();
    }
  }

  dateFormat = (date) => {
    if (date) {
      return `${date.substring(0, 2)}/${date.substring(3, 5)}/${date.substring(6, 10)}`;
    }
    return '';
  };

  render() {
    return (
      <div className="cadastrar-wrapper">
        {this.state.showLoader && <Loader />}
        <div className="form-cadastrar-container">
          <div className="cadastrar-content">
            <div className="separator">
              <Input
                placeholder="Ex. João da silva"
                label="Nome do cliente"
                name="nome"
                value={this.state.nome.value}
                errorMsg={this.state.nome.msg}
                error={this.state.nome.error}
                onChange={this.handleChange}
              />
            </div>
            <div className="separator">
              <Input
                placeholder="Ex. teste@hotmail.com"
                name="email"
                label="E-mail"
                value={this.state.email.value}
                errorMsg={this.state.email.msg}
                error={this.state.email.error}
                onChange={this.handleChange}
              />
            </div>
            <div className="separator">
              <MyInputMask
                placeholder="Ex. (00)00000-0000"
                label="Digite o celular"
                name="celular"
                mask="(99)99999-9999"
                value={this.state.celular.value}
                errorMsg={this.state.celular.msg}
                error={this.state.celular.error}
                onChange={this.handleChange}
              />
            </div>
            <div className="separator">
              <MyInputMask
                placeholder="Ex. 000.000.000-00"
                label="Digite o cpf"
                mask="999.999.999-99"
                name="cpf"
                value={this.state.cpf.value}
                errorMsg={this.state.cpf.msg}
                error={this.state.cpf.error}
                onChange={this.handleChange}
              />
            </div>
            <div className="separator">
              <MyInputMask
                label="Data de nascimento"
                mask="99/99/9999"
                placeholder="Ex. 00/00/0000"
                name="nascimento"
                value={this.state.nascimento.value}
                errorMsg={this.state.nascimento.msg}
                error={this.state.nascimento.error}
                onChange={this.handleChange}
              />
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
