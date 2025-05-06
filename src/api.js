import axios from 'axios';

// const api = axios.create({
//   method: 'POST',
//   baseURL: 'http://fixi-env.eba-kpimqmzt.ap-northeast-2.elasticbeanstalk.com',
//   withCredentials: true,
// });
const api = axios.create({
  baseURL: 'http://fixi-env.eba-kpimqmzt.ap-northeast-2.elasticbeanstalk.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
