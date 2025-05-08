import axios from 'axios';

const api = axios.create({
  baseURL: 'http://fixi-env.eba-kpimqmzt.ap-northeast-2.elasticbeanstalk.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('토큰:', token);
  }
  return config;
});

export default api;
