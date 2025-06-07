import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

export default function PayPalExecutePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get('paymentId');
    const payerId = params.get('PayerID');

    const executePayment = async () => {
      try {
        const res = await api.get('/myPage/paypal/execute-payment', {
          params: {
            paymentId,
            PayerID: payerId,
          },
        });
        console.log('구독 처리 완료:', res.data);
        navigate('/myPage');
      } catch (err) {
        console.error('구독 처리 실패:', err);
        navigate('/myPage'); // 실패 시에도 이동
      }
    };

    if (paymentId && payerId) {
      executePayment();
    }
  }, [navigate]);

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      구독을 처리 중입니다... 잠시만 기다려 주세요.
    </div>
  );
}
