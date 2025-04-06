import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MobileLayout.css';

function DictionaryScreen3() {
  const navigate = useNavigate();

  const handleTouch = () => {
    navigate('/login');
  };

  return (
    <div className="mobile-wrapper" onClick={handleTouch}>
      <div className="mobile-container">
        <p style={{ color: '#FFD700', fontWeight: 'bold' }}>전자기기 보험</p>
        <h1 className="main-title">
          안심하고 <br />
          사용할 수 있도록 <br />
          프리미엄 보험 서비스
        </h1>
        <p style={{ color: '#ccc', fontSize: '12px' }}>
          #합리적인 가격으로 다양한 전자기기의 수리비용을 보상받을 수 있어요
        </p>
      </div>
    </div>
  );
}

export default DictionaryScreen3;
