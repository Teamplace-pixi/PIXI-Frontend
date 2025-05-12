import React, { useState } from 'react';
import './SignUpScreen.css';
import { useNavigate } from 'react-router-dom';
import api from './api';

function SignUpScreen() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isPasswordMatch = formData.password === formData.confirmPassword;

  const handleSignUp = async () => {
    try {
      const response = await api.post('/users/signup', {
        loginId: formData.loginId,
        password: formData.password,
        nickname: formData.nickname,
        email: formData.email,
        address: formData.address,
      });
      console.log('회원가입 응답:', response.data);
      if (response.data === '회원가입 성공') {
        console.log('회원가입 성공:', response.data);
        navigate('/startlogin');
      } else {
        console.error('회원가입 실패:', response.data?.errorMessage);
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h2 className="signup-title">회원가입</h2>

        <div className="form-group">
          <label className="input-label">아이디</label>
          <input
            type="loginId"
            placeholder="아이디를 입력하세요"
            value={formData.loginId}
            onChange={handleChange}
            name="loginId"
          />
        </div>

        <div className="form-group">
          <label className="input-label">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />
        </div>

        <div className="form-group">
          <label className="input-label">비밀번호 확인</label>
          <div className="input-container">
            <input
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />
            <span className={`icon ${isPasswordMatch ? 'check' : 'x'}`}>
              {isPasswordMatch ? '✔' : '✘'}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label className="input-label">이름</label>
          <input
            type="nickname"
            placeholder="이름을 입력하세요"
            value={formData.nickname}
            onChange={handleChange}
            name="nickname"
          />
        </div>

        <div className="form-group">
          <label className="input-label">이메일</label>
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
        </div>

        <div className="form-group">
          <label className="input-label">주소</label>
          <input
            type="address"
            placeholder="주소를 입력하세요"
            value={formData.address}
            onChange={handleChange}
            name="address"
          />
        </div>

        <button className="signup-button" onClick={handleSignUp}>
          회원가입 완료
        </button>
      </div>
    </div>
  );
}

export default SignUpScreen;
