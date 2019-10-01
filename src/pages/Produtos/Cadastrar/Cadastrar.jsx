import React, { Component } from 'react';

import './Cadastrar.scss';

import ProdutoService from '../../../Services/Produto.service';

import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Primary, Secondary } from '../../../components/Buttons/Buttons';
import Input from '../../../components/Input/Input';
import MyCurrencyInput from '../../../components/MyCurrencyInput/MyCurrencyInput';
import StyledSelect from '../../../components/StyledSelect/StyledSelect';

export default class Cadastrar extends Component {
  state = {
    nome: {
      value: '',
      error: false,
      msg: '',
    },
    valorVenda: {
      value: '',
      error: false,
      msg: '',
    },
    quantidade: {
      value: '',
      error: false,
      msg: '',
    },
    descricao: {
      value: '',
      error: false,
      msg: '',
    },
    marca: {
      value: '',
      error: false,
      msg: '',
    },
    unidadeMedida: {
      value: '',
      error: false,
      msg: '',
    },
    qtdMinima: {
      value: '',
      error: false,
      msg: '',
    },
    combo: {
      marcas: [],
      tipos: [],
    },
  }

  async componentDidMount() {
    const { data } = await ProdutoService.get('comboOptions', { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (data.success) {
      this.setState({
        combo: data.combo,
      });
    }
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
    const { data } = await ProdutoService.post('', this.createObj(), { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (typeof data.msg === 'object') {
      this.validate(data.msg);
    }
    return data;
  }

  createObj = () => {
    const product = {
      nome: this.state.nome.value,
      valorVenda: this.convertCurrency(this.state.valorVenda.value),
      quantidade: this.state.quantidade.value,
      descricao: this.state.descricao.value,
      unidadeMedida: this.state.unidadeMedida.value,
      qtdMinima: this.state.qtdMinima.value,
    };
    if (this.state.marca.value) {
      product.marca = this.state.marca.value;
    }
    return product;
  }

  convertCurrency = (value = '') => {
    const newValue = value
      .replace('.', '')
      .replace('.', '')
      .replace('.', '')
      .replace('.', '')
      .replace('.', '')
      .replace('.', '')
      .replace(',', '.');
    return newValue;
  }

  clear = () => {
    Object.keys(this.state).forEach((key) => {
      if (key !== 'combo') {
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
      if (key !== 'combo') {
        if (errorList.some(error => error.toLowerCase().includes(key.toLocaleLowerCase()))) {
          const { value } = this.state[key];
          this.setState({
            [key]: {
              value,
              error: true,
              msg: errorList.filter(err => err.toLowerCase().includes(key.toLocaleLowerCase()))[0],
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
      }
    });
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

  dateFormat = (date) => {
    if (date) {
      return `${date.substring(0, 2)}/${date.substring(3, 5)}/${date.substring(6, 10)}`;
    }
    return '';
  };

  render() {
    return (
      <div className="cadastrar-wrapper">
        <div className="form-cadastrar-container">
          <div className="cadastrar-content">
            <div className="separator">
              <Input
                placeholder="Ex. rosh"
                label="Nome do produto"
                name="nome"
                value={this.state.nome.value}
                errorMsg={this.state.nome.msg}
                error={this.state.nome.error}
                onChange={this.handleChange}
              />
            </div>
            <div className="separator">
              <MyCurrencyInput
                placeholder="Ex. 55,90"
                name="valorVenda"
                label="Valor de venda"
                value={this.state.valorVenda.value}
                errorMsg={this.state.valorVenda.msg}
                error={this.state.valorVenda.error}
                onChange={this.handleChange}
              />
            </div>
            <div className="separator">
              <StyledSelect
                options={this.state.combo.marcas}
                value={this.state.marca.value}
                name="marca"
                label="Marca"
                onChange={this.handleChange}
                errorMsg={this.state.marca.msg}
                error={this.state.marca.error}
              />
            </div>
            <div className="separator">
              <StyledSelect
                required
                options={this.state.combo.tipos}
                value={this.state.unidadeMedida.value}
                name="unidadeMedida"
                label="Unidade de medida"
                onChange={this.handleChange}
                errorMsg={this.state.unidadeMedida.msg}
                error={this.state.unidadeMedida.error}
              />
            </div>
            <div className="separator">
              <Input
                placeholder="Ex. 12"
                label="Quantidade"
                name="quantidade"
                type="number"
                config={{ min: 0 }}
                value={this.state.quantidade.value}
                errorMsg={this.state.quantidade.msg}
                error={this.state.quantidade.error}
                onChange={this.handleChange}
              />
            </div>
            <div className="separator">
              <Input
                placeholder="Ex. incenso natural"
                label="Descrição do produto"
                name="descricao"
                type="text"
                value={this.state.descricao.value}
                errorMsg={this.state.descricao.msg}
                error={this.state.descricao.error}
                onChange={this.handleChange}
              />
            </div>
            <div className="separator">
              <Input
                placeholder="Ex. 5"
                label="Quantidade mínima"
                name="qtdMinima"
                type="number"
                config={{ min: 0 }}
                value={this.state.qtdMinima.value}
                errorMsg={this.state.qtdMinima.msg}
                error={this.state.qtdMinima.error}
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
