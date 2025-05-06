import axios from 'axios';

// const api = axios.create({
//   method: 'POST',
//   baseURL: 'http://fixi-env.eba-kpimqmzt.ap-northeast-2.elasticbeanstalk.com',
//   withCredentials: true,
// });
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
