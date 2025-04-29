import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MobileLayout.css';

function DictionaryScreen1() {
  const navigate = useNavigate();

  return (
    <div className="mobile-wrapper" onClick={() => navigate('/page2')}>
      <div className="mobile-container">
        <p className="section-title">AI수리 가이드</p>
        <h1 className="main-title">
          AI 수리가이드를 통해<br />
          수리비를 절감하세요
        </h1>
        <p style={{ color: '#ccc', fontSize: '12px' }}>
          #AI 가이드를 통해 간단한 수리는 집에서 직접 수리 할 수 있어요
        </p>
      </div>
    </div>
  );
}

export default DictionaryScreen1;
