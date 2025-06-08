import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from './api';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

const FIXI_CENTER_ID = 'fixi-001'; // 고정 센터의 ID
const FIXI_CENTER_DATA = {
  shopId: FIXI_CENTER_ID,
  shopName: '아이수리 용산점',
  shopLoc: '서울시 용산구',
  shopOpenTime: '10:00 ~ 20:00',
  shopCall: '010-8020-8882',
  shopCertification: 'FIXI 공식 인증업체',
  shopDetail: '기존 전자상가 지점에서 용산역 앞 레미안 더 센터 지하 1층으로 이전하였습니다^^ 방문시 주차권 2~4시간 주차권이 제공됩니다! 편하게 방문해주세요!',
  thumb: '/goodfixer.png',
};

const ServiceCenter = () => {
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);

  const location = useLocation();
  const shopId = location.state?.id;

  // 센터 정보 불러오기
  useEffect(() => {
    const fetchCenterData = async () => {
      // 고정된 센터일 경우, API 호출하지 않고 직접 데이터 설정
      if (shopId === FIXI_CENTER_ID) {
        setCenter(FIXI_CENTER_DATA);
        setLoading(false);
        return;
      }
  
      try {
        const response = await api.get(`/shop/shop_id=${shopId}`);
        console.log('센터 데이터:', response.data);
        setCenter(response.data);
      } catch (error) {
        console.error('센터 정보 API 호출 실패:', error);
      } finally {
        setLoading(false);
      }
    };


    if (shopId) fetchCenterData();

  }, [shopId]);
  

  // 리뷰 정보 불러오기
  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const revRef = await api.get(`/shop/review/shop_id=${shopId}`);
        console.log('리뷰 데이터:', revRef.data);
        setReviews(revRef.data);
      } catch (error) {
        console.error('리뷰 API 호출 실패:', error);
      }
    };

    if (shopId) fetchReviewData();
  }, [shopId]);

  const ReviewSection = () => (
    <div style={reviewSectionStyle}>
      <div style={reviewHeaderStyle}>
        후기{' '}
        <span style={{ color: '#999', fontWeight: 'normal' }}>
          {reviews.length}개
        </span>
      </div>
      {reviews.length === 0 && (
        <div style={reviewGridStyle}>리뷰가 없습니다.</div>
      )}
      {reviews.length > 0 && (
        <div style={reviewGridStyle}>
          {reviews.map((review) => (
            <div key={review.reviewId} style={reviewCardStyle}>
              <div style={reviewTitleStyle}>{review.reviewTitle}</div>
              <div style={reviewCostStyle}>
                💰 수리비 {review.reviewMoney.toLocaleString()}원
              </div>
              <div style={reviewTextStyle}>{review.reviewContent}</div>
              <div style={reviewStarsStyle}>
                {'⭐️'.repeat(review.reviewStar)}
              </div>
              <div style={reviewTagsStyle}>
                {(review.category || []).map((cat, idx) => (
                  <div key={idx} style={reviewTagStyle}>
                    {cat}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (loading) return <div>수리센터 정보를 불러오는 중...</div>;
  if (!center) return <div>센터 정보를 찾을 수 없습니다.</div>;

  return (
    <div style={containerStyle}>
      <Header title="FIX Finder" />
      <div style={{ padding: '20px', paddingBottom: '80px' }}>
        <CenterInfo center={center} />
        <CenterDetails center={center} />
        <CenterInfoText center={center} />
        <ReviewSection />
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
    <p>
      
      <img
        src="/Location.svg" 
        alt="Location"    // 대체 텍스트 (스크린 리더용)
        style={{ width: '16px', height: '16px', marginRight: '4px' }} // 스타일 (크기, 간격 등)
      />
      {center.shopLoc}
    </p>
    <p>
      <img
        src="/Clock.svg"
        alt="Open Time"
        style={{ width: '16px', height: '16px', marginRight: '4px' }}
      />
      {center.shopOpenTime}
    </p>
    <p>
      <img
        src="/Call.svg"
        alt="Call"
        style={{ width: '16px', height: '16px', marginRight: '4px' }}
      />
      {center.shopCall}
    </p>
    <p>
      <img
        src="/Department Shop.svg"
        alt="Certification"
        style={{ width: '16px', height: '16px', marginRight: '4px' }}
      />
      {center.shopCertification}
    </p>
  </div>
);

const CenterInfoText = ({ center }) => (
  <>
    <h3 style={infoTitleStyle}>정보</h3>
    <p style={infoTextStyle}>{center.shopDetail}</p>
  </>
);

// 스타일 정의는 동일
const containerStyle = {
  paddingTop: '80px',
  fontFamily: 'sans-serif',
  width: '100%',
  maxWidth: '100%', // 더 이상 너비 제한 없음
  margin: '0 auto', // 가운데 정렬
  backgroundColor: '#F8F8F8',
};


const centerInfoStyle = {
  borderRadius: '8px',
  padding: '20px',
  backgroundColor: '#F8F8F8',
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
  fontWeight: 500,
  margin: '10px 0',
};

const contactButtonStyle = {
  display: 'block',
  width: '50%', 
  margin: '10px auto', 
  padding: '4px 0', 
  backgroundColor: '#FFFFFF',
  color: '#0047B1',
  border: '1px solid #0047B1',
  borderRadius: '30px',
  cursor: 'pointer',
  textAlign: 'center',
  whiteSpace: 'nowrap',
};


const detailsStyle = {
  margin: '10px 0',
};

const infoTitleStyle = {
  fontSize: '18px',
  fontWeight: 500,
  marginTop: '20px',
};

const infoTextStyle = {
  margin: '10px ',
  border: '1px solid #D9D9D9',
  padding: '40px',
  borderRadius: '30px',
  backgroundColor: '#FFFFFF',
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
