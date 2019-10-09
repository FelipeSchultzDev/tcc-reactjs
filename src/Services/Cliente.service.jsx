import axios from 'axios';
import URL from './config';

const cliente = axios.create({ baseURL: `${URL}/cliente` });

export default cliente;
