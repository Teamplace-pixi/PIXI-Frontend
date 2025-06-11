import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SettingHeader from './components/SettingHeader';
import api from './api';

function Estimatehistory() {
  const [loginId, setLoginId] = useState('');
  const navigate = useNavigate();
  const [estimates, setEstimates] = useState([]);
  const { state } = useLocation();
  const { payload, symptom } = state || {};

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchLoginId = async () => {
      try {
        const response = await api.get('/myPage/edit');
        setLoginId(response.data.loginId);
        console.log(loginId);
      } catch (error) {
        console.error('유저 정보 로딩 실패:', error);
      }
    };

    fetchLoginId();
  }, []);

  useEffect(() => {
    if (!loginId) return;
    const fetchEstimates = async () => {
      try {
        const response = await api.get(`/ai/estimate/history/${loginId}`);
        setEstimates(response.data);
      } catch (err) {
        console.error('견적 목록 불러오기 실패:', err);
      }
    };
    fetchEstimates();
  }, [loginId]);

  return (
    <div>
      <SettingHeader title="이전 견적서 목록" />

      <div style={{ padding: '0 20px', marginTop: '30px', paddingTop: '20px' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {estimates.map((estimate, index) => (
            <li
              key={index}
              onClick={() =>
                navigate('/estimate-detail', { state: { estimate, symptom } })
              }
              style={{
                borderBottom: '1px solid #eee',
                padding: '15px 0',
                marginBottom: '10px',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                {estimate.repairMethod || '수리 방법 정보 없음'}
              </div>
              <div style={{ fontSize: '14px', color: '#555' }}>
                예상 금액: {estimate.estimatedCost || '정보 없음'}
              </div>
            </li>
          ))}
        </ul>
        {estimates.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888' }}>
            이전 견적서가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}

export default Estimatehistory;
