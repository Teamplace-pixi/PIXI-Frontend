import React, { useState } from 'react';
import './SignUpScreen.css';

function SignUpScreen() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    email: '',
    birth: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isPasswordMatch = formData.password === formData.confirmPassword;

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h2 className="signup-title">회원가입</h2>

        <div className="form-group">
          <label className="input-label">아이디</label>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={formData.username}
            onChange={handleChange}
            name="username"
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
            type="text"
            placeholder="이름을 입력하세요"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label className="input-label">전화번호</label>
          <input
            type="tel"
            placeholder="전화번호를 입력하세요"
            value={formData.phone}
            onChange={handleChange}
            name="phone"
          />
        </div>

        <div className="form-group">
          <label className="input-label">이메일 주소</label>
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
        </div>

        <div className="form-group">
          <label className="input-label">생년월일</label>
          <input
            type="date"
            value={formData.birth}
            onChange={handleChange}
            name="birth"
          />
        </div>

        <button className="signup-button">회원가입 완료</button>
      </div>
    </div>
  );
}

export default SignUpScreen;
