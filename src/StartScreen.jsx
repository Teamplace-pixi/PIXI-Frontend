
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartScreen.css';

function StartScreen() {
  const navigate = useNavigate();

  const handleTouch = () => {
    navigate('/dictionary');
  };

  return (
    <div className="start-wrapper" onClick={handleTouch}>
      <div className="start-container">
        <img src="/FIXIlogo.png" alt="FIXI Logo" className="fixi-logo" />
        <div className="start-text">
          소중한 나의 전자제품을<br />
          FIXI의 프리미엄 케어와 함께
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
