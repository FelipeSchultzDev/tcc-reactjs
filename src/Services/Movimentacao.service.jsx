import axios from 'axios';

const movimento = axios.create({ baseURL: 'http://localhost:3001/movimento' });

export default movimento;
