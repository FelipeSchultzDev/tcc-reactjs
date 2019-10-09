import axios from 'axios';
import URL from './config';

const movimento = axios.create({ baseURL: `${URL}/movimento` });

export default movimento;
