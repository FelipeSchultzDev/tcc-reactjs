import React, { Component } from 'react';

import './Editar.scss';

import MarcaService from '../../../Services/Marca.service';

import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Primary, Secondary } from '../../../components/Buttons/Buttons';
import Input from '../../../components/Input/Input';

import Loader from '../../../components/Loader/Loader';

export default class Editar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: localStorage.getItem('marca'),
      erro: false,
      errorMsg: 'O campo nome é obrigatório!',
      showLoader: false,
    };
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
    this.props.history.push('../listar');
  }

  edit = async () => {
    this.setState({
      showLoader: true,
    });
    const { nome } = this.state;
    const response = await MarcaService.put(this.props.match.params.id, { nome }, { headers: {
      _token: localStorage.getItem('token'),
    } });
    this.setState({
      showLoader: false,
    });
    if (response.data.success) {
      this.backPage();
    } else {
      this.setState({
        errorMsg: response.data.msg,
        erro: true,
      });
    }
  }

  render() {
    return (
      <div className="editar-wrapper">
        {this.state.showLoader && <Loader />}
        <div className="form-editar-container">
          <div className="editar-content">
            <Input placeholder="Digite o nome da marca" name="nome" value={this.state.nome} errorMsg={this.state.errorMsg} error={this.state.erro} onChange={this.handleChange} />
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
