import axios from 'axios';

const api = axios.create({
  method: 'POST',
  baseURL: 'http://fixi-env.eba-kpimqmzt.ap-northeast-2.elasticbeanstalk.com',
  withCredentials: true,
});

export default api;
