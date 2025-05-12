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
      <p className="loading-text">견적 확인중입니다．．．．．</p>
      <div className="water" />
    </div>
  );
};

export default AIHowMuchLoading;
