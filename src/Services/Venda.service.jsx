import axios from 'axios';

const venda = axios.create({ baseURL: 'http://localhost:3001/venda' });

export default venda;
