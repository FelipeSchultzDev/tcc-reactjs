import axios from 'axios';

const cliente = axios.create({ baseURL: 'https://back-end-tcc.herokuapp.com/cliente' });

export default cliente;
