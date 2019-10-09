import axios from 'axios';

const marca = axios.create({ baseURL: 'https://back-end-tcc.herokuapp.com/marca' });

export default marca;
