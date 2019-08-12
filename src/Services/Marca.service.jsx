import axios from 'axios';

const login = axios.create({ baseURL: 'http://localhost:3001/marca',
  headers: {
    _token: localStorage.getItem('token'),
  } });

export default login;
