import React, { useEffect, useRef, useState } from 'react';
import './AIHowMuchResult.css';


const AIHowMuchResult = () => {
  const [showDetails, setShowDetails] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDetails(true);
      audioRef.current && audioRef.current.play();
    }, 1500); // 파란 영역 애니메이션 후에 회색 영역 등장

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="receipt-container">
      <audio ref={audioRef} src="/cashier-sound.mp3" preload="auto" />
      
      <div className="blue-banner slide-in-left">
        <h2>
          FIXI가 예상한 금액은<br />
          <span className="highlight">10만원 ~ 150만원</span>입니다
        </h2>
      </div>

      <div className={`gray-box ${showDetails ? 'slide-up' : ''}`}>
        
        <p className="reason-title">다음과 같은 이유로 가격이 측정되었어요</p>
        <hr />
        <p className="symptom">소리가 안들리고 블루투스 연결이 안되는 문제</p>

        <ul className="price-list">
          <li>
            <span>● 스피커 모듈 (부품 교체)</span>
            <span>- 10만원</span>
          </li>
          <li>
            <span>● 무선통신 칩셋<br /><small>(메인보드 칩셋 수리 또는 교체)</small></span>
            <span>- 10만원</span>
          </li>
        </ul>

        <p className="warning">
          💡 메인보드 자체 불량일 경우엔 칩셋 교체가 불가능해 전체 교체가 필요할 수도 있어요.<br />
          그 경우 수리비는 <strong>20만원 이상</strong>으로 상승할 수 있습니다.
        </p>

        <div className="btn-group">
          <button className="btn-outline">견적서 저장하기</button>
          <button className="btn-primary">구해요로 이동</button>
        </div>
      </div>
    </div>
  );
};

export default AIHowMuchResult;
