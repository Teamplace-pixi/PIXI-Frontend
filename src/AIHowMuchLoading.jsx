import React, { useEffect } from 'react';
import './AIHowMuchLoading.css';
import { useNavigate } from 'react-router-dom';

const AIHowMuchLoading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/result');
    }, 5000); // 5초 후 이동

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-container">
      
      <img src="/AIChatgif.gif" alt="Loading..." className="loading-gif" /> {/* GIF 이미지 추가 */}
      <p className="loading-text">견적 확인중입니다．．．</p>
    </div>
  );
};

export default AIHowMuchLoading;
