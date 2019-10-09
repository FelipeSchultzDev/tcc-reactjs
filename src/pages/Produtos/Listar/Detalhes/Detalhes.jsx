import React, { useState, useEffect } from 'react';

import './Detalhes.scss';

import ProdutoService from '../../../../Services/Produto.service';

import { Primary } from '../../../../components/Buttons/Buttons';
import Label from '../../../../components/Label/Label';
import Color from '../../../../components/Buttons/ButtonsColor.enum';
import TableType from '../../../../components/Table/TableType.enum';

const Detalhes = ({ id, type, onAccept }) => {
  const [produto, setProduto] = useState({
  });

  function dateFormat(date) {
    return `${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(0, 4)}`;
  }

  async function getCliente() {
    const { data } = await ProdutoService.get(id, { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (data.success) {
      data.produto = {
        ...data.produto,
        createdAt: dateFormat(data.produto.createdAt),
      };
      setProduto(data.produto);
    }
  }

  useEffect(() => {
    getCliente();
  });


  return (
    <div className="detalhes-produto-wrapper">
      <div className="separator">
        <Label>
          <span className="label-title">Nome:</span>
          {' '}
          {produto.nome}
        </Label>
      </div>
      <div className="separator">
        <Label>
          <span className="label-title">Valor de venda:</span>
          {' '}
          {produto.valorVenda}
        </Label>
      </div>
      <div className="separator">
        <Label>
          <span className="label-title">Marca:</span>
          {' '}
          {produto.marca && produto.marca.nome}
        </Label>
      </div>
      <div className="separator">
        <Label>
          <span className="label-title">Unidade de medida:</span>
          {' '}
          {produto.unidadeMedida && produto.unidadeMedida.nome}
        </Label>
      </div>
      <div className="separator">
        <Label>
          <span className="label-title">Quantidade:</span>
          {' '}
          {produto.quantidade}
        </Label>
      </div>
      <div className="separator">
        <Label>
          <span className="label-title">Quantidade mínima:</span>
          {' '}
          {produto.qtdMinima}
        </Label>
      </div>
      <div className="separator">
        <Label>
          <span className="label-title">Descricao:</span>
          {' '}
          {produto.descricao}
        </Label>
      </div>
      <div className="separator">
        <Label>
          <span className="label-title">Data de cadastro:</span>
          {' '}
          {produto.createdAt}
        </Label>
      </div>
      <Primary color={Color.GREEN} title="Ok" click={() => onAccept({ type, action: TableType.ACTION.CANCEL })} />
    </div>
  );
};

export default Detalhes;
