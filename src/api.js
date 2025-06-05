import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (
    !config.url.includes('/users/login') &&
    !config.url.includes('/users/signup')
  ) {
    const token = localStorage.getItem('token');
    const tokenWs = localStorage.getItem('tokenWs');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('일반 토큰:', token);
    }

    if (tokenWs) {
      config.headers['x-websocket-token'] = tokenWs;
      console.log('웹소켓 토큰:', tokenWs);
    }
  }

  return config;
});

export default api;
