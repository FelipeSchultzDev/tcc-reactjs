import React, { useState, useEffect } from 'react';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import ProdutoService from '../../../../Services/Produto.service';

import './AlterarEstoque.scss';

import { Primary, Secondary, PrimaryIcon } from '../../../../components/Buttons/Buttons';
import Color from '../../../../components/Buttons/ButtonsColor.enum';
import MyCurrencyInput from '../../../../components/MyCurrencyInput/MyCurrencyInput';

import Loader from '../../../../components/Loader/Loader';

const StateEnum = {
  RETIRAR: 'RETIRAR',
  ADICIONAR: 'ADICIONAR',
};

const AlterarEstoque = ({ id, onClose, onComplete }) => {
  const [inputValue, setInputValue] = useState(0);
  const [valor, setValor] = useState('');
  const [minValue, setMinValue] = useState(0);
  const [selectState, setSelectState] = useState(true);
  const [state, setState] = useState('');

  const [showLoader, setShowLoader] = useState(false);

  const handleChange = (e) => {
    e.persist();
    const { inputType, data } = e.nativeEvent;
    if ('1234567890'.includes(data) || inputType === 'deleteContentBackward') {
      setInputValue(e.target.value);
    } else {
      e.preventDefault();
    }
  };

  const getMinValue = async () => {
    const { data } = await ProdutoService.get(`${id}/valorMinimo`, { headers: {
      _token: localStorage.getItem('token'),
    } });

    setMinValue(data.quantidade);
  };

  useEffect(() => {
    getMinValue();
    // eslint-disable-next-line
  }, []);

  const plus = () => setInputValue(Number(inputValue) ? Number(inputValue) + 1 : 1);

  const minus = () => setInputValue(Number(inputValue) ? Number(inputValue) - 1 : 0);

  const retirar = async () => {
    setShowLoader(true);
    const { data } = await ProdutoService.put(`${id}/retirada_estoque`, { quantidade: Number(inputValue) }, { headers: {
      _token: localStorage.getItem('token'),
    } });
    setShowLoader(false);
    if (data && data.success) {
      onComplete();
    }
  };

  const adicionar = async () => {
    const tmpValor = valor.replace('.', '').replace('.', '').replace('.', '').replace('.', '')
      .replace(',', '.');
    setShowLoader(true);
    const { data } = await ProdutoService.put(`${id}/entrada_estoque`,
      { quantidade: Number(inputValue), valor: tmpValor },
      { headers: {
        _token: localStorage.getItem('token'),
      } });
    setShowLoader(false);
    if (data && data.success) {
      onComplete();
    }
  };

  const validateValor = () => {
    const tmpValor = valor.replace('.', '').replace('.', '').replace('.', '').replace('.', '')
      .replace(',', '.');
    return tmpValor > 0;
  };

  return (
    <div className="alterar-estoque-wrapper">
      {showLoader && <Loader />}
      <header>Alterar estoque</header>
      {selectState ? (
        <>
          <section>
            <Primary color={Color.GREEN} disabled={minValue === 0} click={() => { setState(StateEnum.RETIRAR); setSelectState(false); setInputValue(0); }} title="Retirar do estoque" />
            <Primary color={Color.GREEN} click={() => { setState(StateEnum.ADICIONAR); setSelectState(false); setInputValue(0); }} title="Adicionar ao estoque" />
          </section>
          <footer className="cancel">
            <Secondary color={Color.RED} click={onClose} title="Cancelar" />
          </footer>
        </>
      ) : (
        <>
          <section>
            <PrimaryIcon
              color={Color.GREEN}
              click={minus}
              disabled={!Number(inputValue)}
              icon={faMinus}
            />
            {(state === StateEnum.RETIRAR) ? (
              <>
                <div className="minValue">
                  <input type="text" value={inputValue} disabled={Number(inputValue) === minValue} onChange={handleChange} />
                  <span>
                    Valor máximo:
                    {' '}
                    {minValue}
                  </span>
                </div>
                <PrimaryIcon
                  color={Color.GREEN}
                  disabled={Number(inputValue) === minValue}
                  click={plus}
                  icon={faPlus}
                />
              </>
            ) : (
              <>
                <input type="text" value={inputValue} onChange={handleChange} />
                <PrimaryIcon color={Color.GREEN} click={plus} icon={faPlus} />
              </>
            )}
          </section>
          {(state === StateEnum.ADICIONAR) && (
          <div className="value">
            <MyCurrencyInput label="Valor da entrada" onChange={e => setValor(e.target.value)} value={valor} />
          </div>
          )}
          <footer>
            <Secondary color={Color.RED} title="Voltar" click={() => setSelectState(true)} />
            {(state === StateEnum.ADICIONAR) && (
              <Primary color={Color.GREEN} click={adicionar} disabled={Number(inputValue) === 0 || !validateValor()} title="Adicionar ao estoque" />
            )}
            {(state === StateEnum.RETIRAR) && (
              <Primary color={Color.GREEN} click={retirar} disabled={!(Number(inputValue) > 0 && Number(inputValue) <= minValue)} title="Retirar do estoque" />
            )}
          </footer>
        </>
      )}
    </div>
  );
};

export default AlterarEstoque;
