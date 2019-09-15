import React, { Component } from 'react';

import './Editar.scss';

import ClienteService from '../../../Services/Cliente.service';

import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Primary, Secondary } from '../../../components/Buttons/Buttons';
import Input from '../../../components/Input/Input';


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
      nascimento: this.dateConvert(this.state.nascimento.value.trim()),
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

  dateFormat = (date) => {
    let data = new Date(date).toLocaleString('pt-br');
    data = `${data.substring(6, 10)}-${data.substring(3, 5)}-${data.substring(0, 2)}`;
    return data;
  }

  dateConvert = date => new Date(date).toLocaleString('pt-br');

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
          <div className="editar-content">
            <div className="separator">
              <Input placeholder="Digite o nome" name="nome" value={this.state.nome.value} errorMsg={this.state.nome.msg} error={this.state.nome.error} onChange={this.handleChange} />
            </div>
            <div className="separator">
              <Input placeholder="Digite o email" name="email" value={this.state.email.value} errorMsg={this.state.email.msg} error={this.state.email.error} onChange={this.handleChange} />
            </div>
            <div className="separator">
              <Input placeholder="Digite o celular" name="celular" value={this.state.celular.value} errorMsg={this.state.celular.msg} error={this.state.celular.error} onChange={this.handleChange} />
            </div>
            <div className="separator">
              <Input placeholder="Cpf" name="cpf" value={this.state.cpf.value} errorMsg={this.state.cpf.msg} error={this.state.cpf.error} onChange={this.handleChange} />
            </div>
            <div className="separator">
              <Input placeholder="Data de nascimento" type="date" name="nascimento" value={this.state.nascimento.value} errorMsg={this.state.nascimento.msg} error={this.state.nascimento.error} onChange={this.handleChange} />
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
