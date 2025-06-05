import axios from 'axios';

// .env에서 설정한 baseURL 사용
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,  // /api → 환경별 주소로
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (토큰 자동 삽입)
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