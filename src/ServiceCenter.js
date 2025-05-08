import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
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
      <div style={{ padding: '20px', paddingTop: '60px' }}>
        <CenterInfo center={center} />
        <CenterDetails center={center} />
        <CenterInfoText center={center} />
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
  width: '120px',
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
  padding: '5px 0px',
  backgroundColor: '#FFFFFF',
  color: '#2563eb',
  border: '1px solid #2563eb',
  borderRadius: '30px',
  cursor: 'pointer',
  width: '300px'
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

export default ServiceCenter;
