import React, { Component } from 'react';

import './Editar.scss';

import ClienteService from '../../../Services/Cliente.service';

import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Primary, Secondary } from '../../../components/Buttons/Buttons';
import Input from '../../../components/Input/Input';
import MyInputMask from '../../../components/MyInputMask/MyInputMask';


export default class Editar extends Component {
  state = {
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

  async componentDidMount() {
    const { data } = await ClienteService.get(this.props.match.params.id, { headers: {
      _token: localStorage.getItem('token'),
    } });
    const cliente = {
      nome: data.cliente.nome,
      email: data.cliente.email,
      celular: data.cliente.celular,
      cpf: data.cliente.cpf,
      nascimento: this.dateFormat(data.cliente.nascimento),
    };
    Object.keys(cliente).forEach((key) => {
      const previouState = this.state[key];
      this.setState({
        [key]: {
          ...previouState,
          value: cliente[key],
        },
      });
    });
  }

  backPage = () => {
    this.props.history.push('../listar');
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

  edit = async () => {
    const { id } = this.props.match.params;
    const { data } = await ClienteService.put(id, this.createObj(), { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (typeof data.msg === 'object') {
      this.validate(data.msg);
    }
    if (data.success) {
      this.props.history.push('../listar');
    }
  }

  createObj = () => {
    const person = {
      nome: this.state.nome.value.trim(),
      email: this.state.email.value.trim(),
      celular: this.state.celular.value.trim(),
      cpf: this.state.cpf.value.trim(),
      nascimento: this.state.nascimento.value.trim(),
    };
    return person;
  }

  clear = () => {
    Object.keys(this.state).forEach((key) => {
      this.setState({
        [key]: {
          value: '',
          error: false,
          msg: '',
        },
      });
    });
  }

  dateFormat = date => `${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(0, 4)}`;

  validate = (errorList = []) => {
    Object.keys(this.state).forEach((key) => {
      if (errorList.some(error => error.toLowerCase().includes(key))) {
        const { value } = this.state[key];
        this.setState({
          [key]: {
            value,
            error: true,
            msg: errorList.filter(error => error.toLowerCase().includes(key))[0],
          },
        });
      } else {
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

  render() {
    return (

      <div className="editar-wrapper">
        <div className="form-editar-container">
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
          <div className="editar-footer">
            <Secondary title="Voltar" color={ButtonsColor.RED} click={this.backPage} />
            <div>
              <Primary title="Salvar edições" color={ButtonsColor.GREEN} click={this.edit} />
            </div>
          </div>
        </div>
      </div>

    );
  }
}
