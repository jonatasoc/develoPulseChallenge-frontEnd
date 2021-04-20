import axios from 'axios';

const api = axios.create({
  baseURL: 'https://imc-hiring-test.azurewebsites.net/Contact',
  timeout: 8000,
});

export default api;
