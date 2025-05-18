import axios from 'axios';

const apiAI = axios.create({
  baseURL: '/apiAI',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiAI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('토큰:', token);
  }
  return config;
});

export default apiAI;
