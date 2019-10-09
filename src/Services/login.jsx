import axios from 'axios';
import URL from './config';

const login = axios.create({ baseURL: URL });

export default login;
