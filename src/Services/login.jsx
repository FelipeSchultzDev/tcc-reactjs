import axios from 'axios';

const login = axios.create({ baseURL: 'https://back-end-tcc.herokuapp.com/' });

export default login;
