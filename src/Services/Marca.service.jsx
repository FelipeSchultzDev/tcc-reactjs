import axios from 'axios';

const marca = axios.create({ baseURL: 'http://localhost:3001/marca' });

export default marca;
