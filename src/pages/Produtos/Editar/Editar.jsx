import React, { Component } from 'react';

import './Editar.scss';

import ProdutoService from '../../../Services/Produto.service';

import ButtonsColor from '../../../components/Buttons/ButtonsColor.enum';
import { Primary, Secondary } from '../../../components/Buttons/Buttons';
import Input from '../../../components/Input/Input';
import StyledSelect from '../../../components/StyledSelect/StyledSelect';
import MyCurrencyInput from '../../../components/MyCurrencyInput/MyCurrencyInput';


export default class Editar extends Component {
  state = {
    barcode: {
      value: '',
      error: false,
      msg: '',
    },
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
    const { data } = await ProdutoService.get(this.props.match.params.id, { headers: {
      _token: localStorage.getItem('token'),
    } });
    this.setState({
      combo: data.combo,
    });
    const produto = {
      barcode: data.produto.barcode,
      nome: data.produto.nome,
      valorVenda: data.produto.valorVenda,
      quantidade: data.produto.quantidade,
      descricao: data.produto.descricao,
      marca: data.produto.marca._id,
      unidadeMedida: data.produto.unidadeMedida._id,
      qtdMinima: data.produto.qtdMinima,
    };
    Object.keys(produto).forEach((key) => {
      const previouState = this.state[key];
      this.setState({
        [key]: {
          ...previouState,
          value: produto[key],
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
    const { data } = await ProdutoService.put(id, this.createObj(), { headers: {
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
    const product = {
      barcode: this.state.barcode.value.trim(),
      nome: this.state.nome.value.trim(),
      valorVenda: this.convertCurrency(this.state.valorVenda.value),
      quantidade: this.state.quantidade.value,
      descricao: this.state.descricao.value.trim(),
      unidadeMedida: this.state.unidadeMedida.value,
      qtdMinima: this.state.qtdMinima.value,
    };
    if (this.state.marca.value) {
      product.marca = this.state.marca.value;
    }
    return product;
  }

  convertCurrency = (value) => {
    if (typeof value === 'string') {
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
    return value;
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

  render() {
    return (
      <div className="editar-wrapper">
        <div className="form-editar-container">
          <div className="cadastrar-content">
            <div className="separator">
              <Input
                placeholder="Ex. 0000000000000000000000"
                label="Código de barras(Identificação)"
                name="barcode"
                value={this.state.barcode.value}
                errorMsg={this.state.barcode.msg}
                error={this.state.barcode.error}
                onChange={this.handleChange}
              />
            </div>
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
