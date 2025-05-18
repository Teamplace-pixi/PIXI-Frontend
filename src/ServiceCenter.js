import React, { useEffect, useState } from 'react';
import {useLocation } from 'react-router-dom';
import api from './api';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

const ServiceCenter = () => {
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const shopId = location.state?.id; // URL 파라미터에서 id 가져오기

  useEffect(() => {
    const fetchCenterData = async () => {
      try {
        const response = await api.get(`/shop/shop_id=${shopId}`);
        console.log('센터 데이터:', response.data);
        setCenter(response.data);
      } catch (error) {
        console.error('센터 API 호출 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCenterData();
  }, [shopId]);

  if (loading) return <div>수리센터 정보를 불러오는 중...</div>;
  if (!center) return <div>센터 정보를 찾을 수 없습니다.</div>;

  return (
    <div style={containerStyle}>
      <Header title="FIX Finder" />
      <div style={{ padding: '20px' , paddingBottom: '80px'}}>
        <CenterInfo center={center} />
        <CenterDetails center={center} />
        <CenterInfoText center={center} />
        <ReviewSection />
        {/* 후기 데이터는 별도 API 연동 필요 */}
      </div>
      <BottomNav />
    </div>
  );
};

const CenterInfo = ({ center }) => (
  <div style={centerInfoStyle}>
    <img
      src={center.thumb || 'FIXIBlackIcon.png'}
      alt="Center Logo"
      style={logoStyle}
    />
    <h2 style={centerNameStyle}>{center.shopName}</h2>
    <button style={contactButtonStyle}>문의하기</button>
  </div>
);

const CenterDetails = ({ center }) => (
  <div style={detailsStyle}>
    <p>📍 {center.shopLoc}</p>
    <p>🕒 {center.shopOpenTime}</p>
    <p>📞 {center.shopCall}</p>
    <p>🧾 {center.shopCertification}</p>
  </div>
);

const CenterInfoText = ({ center }) => (
  <>
    <h3 style={infoTitleStyle}>상세 설명</h3>
    <p style={infoTextStyle}>{center.shopDetail}</p>
  </>
);

const ReviewSection = () => (
  <div style={reviewSectionStyle}>
    <div style={reviewHeaderStyle}>후기 <span style={{ color: '#999', fontWeight: 'normal' }}>100개</span></div>
    <div style={reviewGridStyle}>
      {[...Array(2)].map((_, idx) => (
        <div key={idx} style={reviewCardStyle}>
          <div style={reviewTitleStyle}>아이폰 후면 수리</div>
          <div style={reviewCostStyle}>💰 수리비 200,000</div>
          <div style={reviewTextStyle}>친절하세요 재방문 의사 있습니다</div>
          <div style={reviewStarsStyle}>⭐️⭐️⭐️⭐️⭐️</div>
          <div style={reviewTagsStyle}>
            <div style={reviewTagStyle}>애플</div>
            <div style={reviewTagStyle}>핸드폰</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);


// 스타일 정의는 동일
const containerStyle = {
  paddingTop: '80px',
  fontFamily: 'sans-serif',
  maxWidth: '600px',
  margin: '0 auto',
};

const centerInfoStyle = {
  borderRadius: '8px',
  padding: '20px',
  backgroundColor: '#FFFFFF',
};

const logoStyle = {
  width: '100px',
  height: 'auto',
  display: 'block',
  margin: '0 auto',
};

const centerNameStyle = {
  textAlign: 'center',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '10px 0',
};

const contactButtonStyle = {
  display: 'block',
  margin: '10px auto',
  padding: '5px 180px',
  backgroundColor: '#FFFFFF',
  color: '#2563eb',
  border: '1px solid #2563eb',
  borderRadius: '30px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  
  
  
};

const detailsStyle = {
  margin: '10px 0',
};

const infoTitleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginTop: '20px',
};

const infoTextStyle = {
  margin: '10px ',
  border: '1px solid #D9D9D9',
  padding: '40px',
  borderRadius: '30px',
};

const reviewSectionStyle = {
  marginTop: '40px',
};

const reviewHeaderStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '16px',
};

const reviewGridStyle = {
  display: 'flex',
  overflowX: 'auto',
  gap: '16px',
  paddingBottom: '8px',
};


const reviewCardStyle = {
  flex: '0 0 auto',      
  minWidth: '150px',
  backgroundColor: '#fff',
  padding: '16px',
  borderRadius: '16px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
};


const reviewTitleStyle = {
  fontSize: '15px',
  fontWeight: 'bold',
  marginBottom: '4px',
};

const reviewCostStyle = {
  fontSize: '14px',
  color: '#666',
  marginBottom: '8px',
};

const reviewTextStyle = {
  fontSize: '14px',
  color: '#333',
  marginBottom: '8px',
};

const reviewStarsStyle = {
  fontSize: '18px',
  color: '#2563eb',
  marginBottom: '8px',
};

const reviewTagsStyle = {
  display: 'flex',
  gap: '6px',
};

const reviewTagStyle = {
  padding: '4px 8px',
  backgroundColor: '#e0e7ff',
  color: '#1e40af',
  borderRadius: '12px',
  fontSize: '12px',
};


export default ServiceCenter;
