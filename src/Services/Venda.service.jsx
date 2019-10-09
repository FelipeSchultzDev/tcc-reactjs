import axios from 'axios';

const venda = axios.create({ baseURL: 'https://back-end-tcc.herokuapp.com/venda' });

export default venda;
