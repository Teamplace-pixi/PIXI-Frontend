import React, { useEffect } from 'react';
import './AIHowMuchLoading.css';
import { useLocation, useNavigate } from 'react-router-dom';
import api from './api';

const AIHowMuchLoading = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { payload, symptom } = state || {};

  useEffect(() => {
    let timer;
    const fetchEstimate = async () => {
      try {
        const res = await api.post('/ai/estimate/generate', payload);
        // 5초 후 결과 화면으로 이동
        timer = setTimeout(() => {
          navigate('/result', {
            state: {
              estimate: res.data,
              symptom,
            },
          });
        }, 5000);
      } catch (err) {
        console.error('견적 생성 실패:', err);
        // 실패 시 홈으로
        navigate('/');
      }
    };

    fetchEstimate();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [payload, symptom, navigate]);

  return (
    <div className="loading-container">
      <img
        src="/loadinging-unscreen.gif"
        alt="Loading..."
        className="loading-gif"
      />{' '}
      {/* GIF 이미지 추가 */}
      <p className="loading-text">견적 확인중입니다．．．</p>
    </div>
  );
};

export default AIHowMuchLoading;
