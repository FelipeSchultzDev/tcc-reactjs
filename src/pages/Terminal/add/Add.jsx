import React, { useState, useEffect } from 'react';

import './Add.scss';

import Input from '../../../components/Input/Input';
import MyCurrencyInput from '../../../components/MyCurrencyInput/MyCurrencyInput';
import Autocomplete from '../../../components/Autocomplete/Autocomplete';
import { Primary, Secondary } from '../../../components/Buttons/Buttons';
import Color from '../../../components/Buttons/ButtonsColor.enum';
import VendaService from '../../../Services/Venda.service';

const Add = ({ onChose }) => {
  const [options, setOptions] = useState([]);
  const [qtdError, setQtdError] = useState(false);
  const [canUseInsert, setCanUseInsert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [produto, setProduto] = useState({
    id: '',
    barcode: '',
    quantidade: '',
    desconto: '',
    valorVenda: '',
  });

  const [clearAutocomplete, setClearAutocomplete] = useState(false);

  const retrieveOptions = async () => {
    const { data } = await VendaService.get('listaProduto', { headers: {
      _token: localStorage.getItem('token'),
    } });

    if (data.success && data.produtos.length) {
      setOptions(data.produtos);
    } else {
      setOptions([]);
    }
  };

  const selectProduct = async (id) => {
    const { data } = await VendaService.get(`listaProduto/${id}`, { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (data.success) {
      const previousProduto = produto;
      setProduto({
        ...previousProduto,
        ...data.produto,
        id: data.produto._id,
      });
      setCanUseInsert(true);
      setSelectedProduct(true);
    }
  };

  const onSelectItem = (e, { suggestion }) => selectProduct(suggestion.value);

  const changeHandle = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    const previousProduto = produto;
    if (name === 'quantidade' && value) {
      setQtdError(false);
    }
    setProduto({
      ...previousProduto,
      [name]: value,
    });
  };

  const resetProduct = () => {
    setProduto({
      id: '',
      barcode: '',
      quantidade: '',
      desconto: '',
      valorVenda: '',
    });
    setCanUseInsert(false);
    setClearAutocomplete(true);
  };

  const afterClear = () => {
    setClearAutocomplete(false);
  };

  const onInclud = () => {
    if (produto.quantidade) {
      resetProduct();
      onChose(produto);
      setSelectedProduct(false);
    } else {
      setQtdError(true);
    }
  };

  const clear = () => {
    setProduto({
      id: '',
      barcode: '',
      quantidade: '',
      desconto: '',
      valorVenda: '',
    });
    setCanUseInsert(false);
    setSelectedProduct(false);
    setClearAutocomplete(true);
  };

  useEffect(() => {
    retrieveOptions();
  }, []);

  return (
    <>
      <Autocomplete
        label="Nome do produto"
        placeholder="Ex. stem"
        field="label"
        options={options}
        disabled={selectedProduct}
        onSelect={onSelectItem}
        afterClear={afterClear}
        clear={clearAutocomplete}
      />
      <Input
        label="Quantidade"
        error={qtdError}
        errorMsg="Quantidade é obrigatória"
        name="quantidade"
        type="number"
        value={produto.quantidade}
        onChange={changeHandle}
        placeholder="Ex. 12"
      />
      <MyCurrencyInput
        label="Valor unitário(R$)"
        value={produto.valorVenda}
        onChange={changeHandle}
        name="valorVenda"
      />
      <Input
        label="Desconto(%)"
        type="number"
        name="desconto"
        value={produto.desconto}
        onChange={changeHandle}
        min="0"
        max="100"
        placeholder="Ex. 15"
      />
      <Secondary
        color={Color.YELLOW}
        title="Limpar"
        click={clear}
        disabled={!selectedProduct}
      />
      <Primary
        color={Color.GREEN}
        title="Incluir"
        click={onInclud}
        disabled={!canUseInsert}
      />
    </>
  );
};
export default Add;
