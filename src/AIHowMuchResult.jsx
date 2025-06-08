import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AIHowMuchResult.css';

const formatPrice = (price) => {
  // 가격을 천 단위로 콤마를 추가하고 '원'을 붙입니다.
  return price.toLocaleString() + '원';
};

const AIHowMuchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { estimate, symptom: initSymptom } = location.state || {};
  const [showDetails, setShowDetails] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDetails(true);
      if (audioRef.current) {
        // 유저 인터랙션 없으면 실패할 수도 있음 → 무시
        audioRef.current.play().catch((err) => {
          console.warn(
            'Audio autoplay failed (possibly due to no user interaction):',
            err
          );
        });
      }
    }, 1500); // 파란 영역 애니메이션 후에 회색 영역 등장

    return () => clearTimeout(timer);
  }, []);

  if (!estimate) {
    return null; // 리디렉션 대기
  }

  const { estimatedCost, repairMethod, partEstimates, caution } = estimate;

  return (
    <div className="receipt-container">
      <audio ref={audioRef} src="/cashier-sound.mp3" preload="auto" />

      <div className="blue-banner slide-in-left">
        <h2>
          FIXI가 예상한 금액은
          <br />
          <span className="highlight">{estimatedCost}</span>입니다
        </h2>
      </div>

      <div className={`gray-box ${showDetails ? 'slide-up' : ''}`}>
        <p className="reason-title">다음과 같은 이유로 가격이 측정되었어요</p>
        <hr />
        <p className="symptom">{repairMethod || initSymptom}</p>

        <ul className="price-list">
          {partEstimates.map((part, idx) => (
            <li key={idx}>
              <span>● {part.partName}</span>
              <span>- {formatPrice(part.price)}</span>
            </li>
          ))}
        </ul>

        {caution && <p className="warning">💡 {caution}</p>}

        <div className="btn-group">
          <button className="btn-outline">견적서 저장하기</button>
          <button
            className="btn-primary"
            onClick={() => navigate('/new-post/')}
          >
            구해요로 이동
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIHowMuchResult;
