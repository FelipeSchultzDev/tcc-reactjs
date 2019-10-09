import axios from 'axios';
import URL from './config';

const marca = axios.create({ baseURL: `${URL}/marca` });

export default marca;
