import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MobileLayout.css';

function DictionaryScreen() {
  const navigate = useNavigate();

  return (
    <div className="mobile-wrapper" onClick={() => navigate('/page1')}>
      <div className="mobile-container">
        <p style={{ color: '#FFD700', fontWeight: 'bold' }}>백과사전</p>
        <h1 className="main-title">
          나의 전자기기의<br />
          문제와 솔루션을 한 번에
        </h1>
        <p style={{ color: '#ccc', fontSize: '12px' }}>
          #1만여개의 전문가와 유저들이 작성한 정보가 담겨있어요
        </p>
      </div>
    </div>
  );
}

export default DictionaryScreen;
