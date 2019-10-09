import axios from 'axios';
import URL from './config';

const home = axios.create({ baseURL: `${URL}/home` });

export default home;
