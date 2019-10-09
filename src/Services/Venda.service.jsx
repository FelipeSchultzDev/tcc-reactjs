import axios from 'axios';
import URL from './config';

const venda = axios.create({ baseURL: `${URL}/venda` });

export default venda;
