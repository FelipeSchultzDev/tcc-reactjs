import axios from 'axios';

const movimento = axios.create({ baseURL: 'https://back-end-tcc.herokuapp.com/movimento' });

export default movimento;
