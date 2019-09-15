import React, { Component } from 'react';

import './Cadastrar.scss';

import ClienteService from '../../../Services/Cliente.service';

import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Primary, Secondary } from '../../../components/Buttons/Buttons';
import Input from '../../../components/Input/Input';


export default class Cadastrar extends Component {
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
      this.setState({
        [key]: {
          value: '',
          error: false,
          msg: '',
        },
      });
    });
  }

  validate = (errorList = []) => {
    Object.keys(this.state).forEach((key) => {
      // console.log(key, errorList.some(error => error.toLowerCase().includes(key)));

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


    // errorList.forEach((element) => {
    //   Object.keys(this.state).forEach((key) => {
    //     if (element.toLowerCase().includes(key)) {
    //       const { value } = this.state[key];
    //       this.setState({
    //         [key]: {
    //           value,
    //           error: true,
    //           msg: element,
    //         },
    //       });
    //     }
    //   });
    // });
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
      this.clear();
    }
  }

  dateFormat = date => new Date(date).toLocaleString('pt-br');

  render() {
    return (
      <div className="cadastrar-wrapper">
        <div className="form-cadastrar-container">
          <div className="cadastrar-content">
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
              <Input placeholder="Digite o cpf" name="cpf" value={this.state.cpf.value} errorMsg={this.state.cpf.msg} error={this.state.cpf.error} onChange={this.handleChange} />
            </div>
            <div className="separator">
              <Input placeholder="Digite a data de nascimento" type="date" name="nascimento" value={this.state.nascimento.value} errorMsg={this.state.nascimento.msg} error={this.state.nascimento.error} onChange={this.handleChange} />
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
