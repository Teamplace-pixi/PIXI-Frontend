import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MobileLayout.css';

function DictionaryScreen2() {
  const navigate = useNavigate();

  return (
    <div className="mobile-wrapper" onClick={() => navigate('/page3')}>
      <div className="mobile-container">
        <p className="section-title">AI 견적</p>
        <h1 className="main-title">
          전자기기의<br />
          예상 수리비용을<br />
          AI 기술과 함께
        </h1>
        <p style={{ color: '#ccc', fontSize: '12px' }}>
          #AI가 분석한 세부적인 원인과 수리가 가능한 수리센터의 정보를 제공해드려요
        </p>
      </div>
    </div>
  );
}

export default DictionaryScreen2;
