import axios from 'axios';

const home = axios.create({ baseURL: 'https://back-end-tcc.herokuapp.com/home' });

export default home;
