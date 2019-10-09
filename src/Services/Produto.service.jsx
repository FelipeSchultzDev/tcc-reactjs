import axios from 'axios';
import URL from './config';

const produto = axios.create({ baseURL: `${URL}/produto` });

export default produto;
