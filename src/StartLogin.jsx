import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import './MobileLayout.css';

const StartLogin = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const goToSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = async () => {
    console.log('로그인 시도:', loginId, password);
    try {
      const response = await api.post('/users/login', { loginId, password });

      const tokenWs = response.data?.tokenWs;
      if (tokenWs) {
        localStorage.setItem('tokenWs', tokenWs);
        console.log('웹소켓 토큰:', tokenWs);
      } else {
        setErrorMsg('웹소켓 토큰이 없습니다.');
      }

      const token = response.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        console.log('로그인 성공:', token);
        navigate('/home');
      } else {
        setErrorMsg('로그인 실패: 토큰이 없습니다.');
      }
    } catch (error) {
      setErrorMsg('아이디 또는 비밀번호가 잘못되었습니다.');
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div className="mobile-wrapper">
      <div
        className="mobile-container"
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <img
          src="/FIXIlogo.png"
          alt="FIXI Logo"
          style={{ width: '120px', marginBottom: '20px' }}
        />

        <input
          type="text"
          placeholder="Username"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          style={{
            width: '80%',
            padding: '12px',
            margin: '8px 0',
            borderRadius: '10px',
            border: 'none',
            outline: 'none',
            boxSizing: 'border-box',
            height: '40px',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '80%',
            padding: '12px',
            margin: '8px 0',
            borderRadius: '10px',
            border: 'none',
            outline: 'none',
            boxSizing: 'border-box',
            height: '40px',
          }}
        />
        {errorMsg && (
          <div style={{ color: 'red', fontSize: '12px', marginTop: '8px' }}>
            {errorMsg}
          </div>
        )}
        <button
          onClick={handleLogin}
          style={{
            width: '80%',
            padding: '12px',
            marginTop: '16px',
            backgroundColor: '#FFD700',
            color: '#0047BB',
            fontWeight: 'bold',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Sign in
        </button>

        <p
          onClick={goToSignUp}
          style={{
            fontSize: '12px',
            color: '#eee',
            marginTop: '10px',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          회원가입 / 비밀번호찾기
        </p>
      </div>
    </div>
  );
};

export default StartLogin;
