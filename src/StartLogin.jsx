import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MobileLayout.css';

function StartLogin() {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup');
  };

  const goToFixiHome = () => {
    navigate('/home');
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
          style={{
            width: '80%',
            padding: '12px',
            margin: '8px 0',
            borderRadius: '10px',
            border: 'none',
            outline: 'none',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          style={{
            width: '80%',
            padding: '12px',
            margin: '8px 0',
            borderRadius: '10px',
            border: 'none',
            outline: 'none',
          }}
        />
        <button
          onClick={goToFixiHome}
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
}

export default StartLogin;
