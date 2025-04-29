import axios from 'axios';

const api = axios.create({
  method: 'POST',
  baseURL: 'http://localhost:8080/',
  withCredentials: true,
});

export default api;
