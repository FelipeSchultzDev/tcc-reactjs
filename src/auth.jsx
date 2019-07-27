import api from './Services/login';

const isAuthenticated = async () => {
  const body = {
    _token: localStorage.getItem('token'),
  };

  const response = await api.post('/login/validate', body);
  return response.data.success;
};

export default isAuthenticated;
