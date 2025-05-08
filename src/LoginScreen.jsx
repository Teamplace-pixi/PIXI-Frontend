import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css';

function LoginScreen() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/startlogin');
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img src="/FIXIlogo.png" alt="FIXI Logo" className="fixi-logo" />

        <p className="login-subtitle">
          소중한 나의 전자제품을<br />
          FIXI의 프리미엄 케어와 함께
        </p>

        <div className="button-group">
          <button className="kakao-btn">
            <span className="icon"></span> 카카오로 시작하기
          </button>
          <button className="login-btn" onClick={handleLoginClick}>
            로그인/회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
