import axios from 'axios';

const home = axios.create({ baseURL: 'http://localhost:3001/home' });

export default home;
