import axios from 'axios';

const produto = axios.create({ baseURL: 'http://localhost:3001/produto' });

export default produto;
