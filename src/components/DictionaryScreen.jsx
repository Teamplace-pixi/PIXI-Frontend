import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../MobileLayout.css';
import ProgressBar from './ProgressBar'; // ✅ 컴포넌트 분리 활용

function DictionaryScreen({
  title = '제품가격 확인',
  mainTitle = '실시간으로 업데이트되는\n제품가격 확인',
  description = '#실시간으로 변동되는 제품 가격을 바탕으로 예상 수리 비용 정보를 제공해드려요',
  path = '/',
  step = 1,
  
  titleColor = '#FFD700',
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div className="mobile-wrapper" onClick={handleClick} style={{ backgroundColor: '#fffff', minHeight: '100vh' }}>
      
      {/* ✅ 고정된 상단 프로그레스 바 */}
      <ProgressBar step={step} />

      {/* ✅ 메인 컨텐츠 */}
      <div className="mobile-container" style={{ padding: '0 16px', color: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', marginTop: '60px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#FDC500', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✔</div>
          <p style={{ color: titleColor, fontWeight: 'bold', fontSize: '14px' }}>{title}</p>
        </div>

        <h1 style={{ fontSize: '22px', fontWeight: '800', color: titleColor, whiteSpace: 'pre-line', lineHeight: '1.4', marginBottom: '12px' }}>
          {mainTitle}
        </h1>

        <p style={{ fontSize: '12px', color: '#D1D5DB', lineHeight: '1.6' }}>{description}</p>
        
        <img
        src="FIXIicon.png" // 실제 경로로 바꿔줘야 함
        alt="제품 이미지"
        className="floating-image"
      />
      </div>
    </div>
  );
}

export default DictionaryScreen;
