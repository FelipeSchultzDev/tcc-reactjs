import React, { useState, useEffect } from 'react';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

import './Terminal.scss';

import ProdutoService from '../../Services/Produto.service';
import VendaService from '../../Services/Venda.service';
import ClienteService from '../../Services/Cliente.service';

import Header from '../../components/Header/Header';
import ModalController from '../../components/Modals/ModalController/ModalController';
import TerminalTable from '../../components/TerminalTable/TerminalTable';
import { Primary } from '../../components/Buttons/Buttons';
import Color from '../../components/Buttons/ButtonsColor.enum';
import Add from './add/Add';
import ReferenciarCliente from './ReferenciarCliente/ReferenciarCliente';

const Terminal = () => {
  const [listaCliente, setListaCliente] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [modalCliente, setModalCliente] = useState(false);
  const [valorTotal, setValorTotal] = useState(0);
  const [listaProdutos, setListaProdutos] = useState([]);
  const [clear, setClear] = useState(false);

  const verifyRandom = () => {
    let val = true;
    let number = 0;
    while (val) {
      number = Math.floor(Math.random() * 10000);
      // eslint-disable-next-line no-loop-func
      const t = listaProdutos.filter(produto => produto.random === number);
      if (!t.length) {
        val = false;
        break;
      }
    }
    return number;
  };

  const changeCpf = cpf => `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;

  const getClientes = async () => {
    const { data } = await ClienteService.get('habilitados', { headers: {
      _token: localStorage.getItem('token'),
    } });
    if (data.success) {
      const tmp = data.clientes.map(tmpCliente => ({
        _id: tmpCliente._id,
        nome: tmpCliente.nome,
        email: tmpCliente.email,
        cpf: changeCpf(tmpCliente.cpf),
      }));
      setListaCliente(tmp);
    }
  };

  const calculateFinalValue = (valor, d, q) => (valor - ((d / 100) * valor)) * q;

  const validateQuantidade = async (id, quantidade) => {
    const produtos = listaProdutos.filter(produto => produto.id === id);

    let totalQtd = 0;
    produtos.forEach((produto) => {
      totalQtd += parseInt(produto.quantidade, 10);
    });

    totalQtd += parseInt(quantidade, 10);


    const { data } = await VendaService.get(`validarQuantidade/${id}?qtd=${totalQtd}`, { headers: {
      _token: localStorage.getItem('token'),
    } });
    return data.validate;
  };

  const handleChose = async (produto) => {
    const { data } = await ProdutoService.get(produto.id, { headers: {
      _token: localStorage.getItem('token'),
    } });

    const { valorVenda, desconto, quantidade, id } = produto;

    if (await validateQuantidade(id, quantidade)) {
      const produtoAdd = {
        ...produto,
        random: verifyRandom(),
        nome: data.produto.nome,
        valorUnitario: produto.valorVenda,
        desconto: produto.desconto ? produto.desconto : 0,
        valorFinal: calculateFinalValue(valorVenda, desconto, quantidade),
      };
      setListaProdutos([
        ...listaProdutos,
        produtoAdd,
      ]);
    } else {
      ToastsStore.error('Quantidade excede o limite');
    }
  };

  const handleDelete = (e) => {
    const newLista = listaProdutos.filter(produto => produto.random !== e.random);
    setListaProdutos(newLista);
  };

  const onSelectCliente = (e) => {
    setModalCliente(false);
    setCliente(e);
  };

  const afterClearForm = () => {
    setClear(false);
  };

  const onFinalze = async () => {
    const listProducts = listaProdutos.map(produto => ({
      produto: produto._id,
      quantidade: produto.quantidade,
      valor: produto.valorUnitario,
      desconto: produto.desconto,
    }));
    const body = {
      produtos: listProducts,
      valorTotal,
    };
    if (cliente) {
      body.cliente = cliente._id;
    }
    const { data } = await VendaService.post('vender', body, { headers: {
      _token: localStorage.getItem('token'),
    } });

    if (data.success) {
      setListaProdutos([]);
      setValorTotal(0);
      setCliente(null);
      setClear(true);
      ToastsStore.success('Venda concluida!');
    } else {
      ToastsStore.error('Ocorreu um erro!');
    }
  };

  useEffect(() => {
    getClientes();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let total = 0;
    listaProdutos.forEach((produto) => {
      total += parseFloat(produto.valorFinal, 10);
    });
    setValorTotal(total);
  }, [listaProdutos]);

  return (
    <>
      {modalCliente
      && (
      <ModalController>
        <ReferenciarCliente
          data={listaCliente}
          onSelect={onSelectCliente}
          onCancel={() => setModalCliente(false)}
        />
      </ModalController>
      )
    }
      <Header isBack />
      <div style={{ padding: 24, minWidth: 1240 }}>
        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
        <div className="terminal-wrapper">
          <div className="left">
            <section>
              <TerminalTable onDelete={handleDelete} data={listaProdutos} />
            </section>
            <footer>
              <Primary color={Color.RED} disabled={!listaProdutos.length} title="Finalizar venda" click={onFinalze} />
              {!cliente ? (
                <Primary color={Color.GREY} title="Referenciar cliente" click={() => setModalCliente(true)} />
              ) : (
                <div className="cliente">
                  <Primary color={Color.GREY} title={cliente.nome} click={() => setCliente(null)} />
                </div>
              )}
              <span className="valor-total">
                {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(valorTotal)}
              </span>
            </footer>
          </div>
          <div className="right">
            <Add onChose={handleChose} clearForm={clear} afterClearForm={afterClearForm} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Terminal;
