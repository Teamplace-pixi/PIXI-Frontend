import axios from 'axios';

const api = axios.create({
  baseURL: 'http://fixi-env.eba-kpimqmzt.ap-northeast-2.elasticbeanstalk.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (
    !config.url.includes(
      '/users/login') && !config.url.includes('/users/signup')
    
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('토큰:', token);
    }
  }
  return config;
});

export default api;
