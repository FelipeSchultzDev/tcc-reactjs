import axios from 'axios';

const cliente = axios.create({ baseURL: 'http://localhost:3001/cliente' });

export default cliente;
