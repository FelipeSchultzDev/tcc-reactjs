import axios from 'axios';

const produto = axios.create({ baseURL: 'https://back-end-tcc.herokuapp.com/produto' });

export default produto;
