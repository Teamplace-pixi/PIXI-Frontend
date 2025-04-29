import React from 'react';
import './SignUpScreen.css';

function SignUpScreen() {
  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h2 className="signup-title">회원가입</h2>

        <label className="input-label">아이디</label>
        <input type="text" placeholder="아이디를 입력하세요" />

        <label className="input-label">비밀번호</label>
        <input type="password" placeholder="비밀번호를 입력하세요" />

        <label className="input-label">비밀번호 확인</label>
        <input type="password" placeholder="비밀번호를 다시 입력하세요" />

        <label className="input-label">이름</label>
        <input type="text" placeholder="이름을 입력하세요" />

        <label className="input-label">전화번호</label>
        <input type="tel" placeholder="전화번호를 입력하세요" />

        <label className="input-label">이메일 주소</label>
        <input type="email" placeholder="이메일을 입력하세요" />

        <label className="input-label">생년월일</label>
        <input type="date" />

        <button className="signup-button">회원가입 완료</button>
      </div>
    </div>
  );
}

export default SignUpScreen;
