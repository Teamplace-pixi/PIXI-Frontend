import React from 'react';
import './StartScreen.css';

const StartScreen = () => {
  return (
    <div className="start-wrapper">
      <div className="start-container">
        <img
          src="/FIXIlogo.png"
          alt="FIXI Logo"
          className="fixi-logo"
        />
        <p className="start-text">
          소중한 나의 전자제품을<br />
          FIXI의 프리미엄 케어와 함께
        </p>
      </div>
    </div>
  );
};

export default StartScreen;
