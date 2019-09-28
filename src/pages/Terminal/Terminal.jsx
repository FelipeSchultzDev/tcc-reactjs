import React, { useState, useEffect } from 'react';

import './Terminal.scss';

import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import MyCurrencyInput from '../../components/MyCurrencyInput/MyCurrencyInput';
import TerminalTable from '../../components/TerminalTable/TerminalTable';
import { Primary } from '../../components/Buttons/Buttons';
import Color from '../../components/Buttons/ButtonsColor.enum';

const header = [
  { title: 'Código', col: 'barcode' },
  { title: 'Nome', col: 'nome' },
  { title: 'Valor unitário', col: 'valorUnitario' },
  { title: 'Quantidade', col: 'quantidade' },
  { title: 'Desconto', col: 'desconto' },
  { title: 'Valor final', col: 'valorFinal' },
];

const Terminal = () => {
  const [canUseInsert, setCanUseInsert] = useState(false);
  const [listaProduto, setListaProduto] = useState([
    {
      _id: 1,
      barcode: 123123123,
    },
    {
      _id: 2,
      barcode: 123123123,
    },
    {
      _id: 3,
      barcode: 123123123,
    },
    {
      _id: 4,
      barcode: 123123123,
    },
  ]);

  return (
    <>
      <Header />
      <div style={{ padding: 24, minWidth: 1240 }}>
        <div className="terminal-wrapper">
          <div className="left">
            <section>
              <TerminalTable data={listaProduto} header={header} />
            </section>
            <footer>
              <Primary color={Color.RED} title="Finalizar" />
              <Primary color={Color.GREY} title="Referenciar cliente" />
              <div className="tooltip">
                <Primary color={Color.GREY} title="Aplicar desconto" />
              </div>
              <Primary color={Color.GREY} title="Finalizar" />
            </footer>
          </div>
          <div className="right">
            <Input label="Nome do produto" placeholder="Ex. stem" />
            <Input label="Código do produto" placeholder="Ex. 235123235" />
            <Input label="Quantidade" placeholder="Ex. 12" />
            <MyCurrencyInput label="Valor unitário(R$)" />
            <Input label="Desconto(%)" type="number" placeholder="Ex. 15" />
            <Primary color={Color.GREEN} title="Incluir" disabled={!canUseInsert} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Terminal;
