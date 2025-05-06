import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';

// 수리센터 데이터 배열
const centers = [
  {
    id: '2',
    name: '삼성전자서비스 강서센터',
    address: '공항대로 571 삼성스토어 강서 2층',
    phone: '1588-3366',
    url: 'https://www.samsungsvc.co.kr/reserve/',
    logo: '/samsung.png',
    status: '영업중',
    services: '방문접수/출장, 주차',
    infoText:
      '제품 접점 시간을 고려하여 운영시간 종료 최소 1시간 전까지 방문해 주세요. (방문객 증가는 업무가 일찍 마감되어 당일 수리가 어려울 수 있습니다.)',
    reviews: [
      {
        title: '아이폰 후면 수리',
        price: '200,000원',
        comment: '친절하세요 재방문 의사 있습니다.',
        rating: '⭐️⭐️⭐️⭐️',
      },
    ],
  },
  {
    id: '8',
    name: '홍대 리페어존',
    address: '서울 마포구 와우산로 45',
    phone: '02-1234-5678',
    url: 'https://repairzone.example.com',
    logo: 'https://cdn-icons-png.flaticon.com/512/711/711769.png',
    status: '영업중',
    services: '방문접수 가능',
    infoText: '당일 접수는 오후 5시까지이며 예약 우선입니다.',
    reviews: [
      {
        title: '배터리 교체',
        price: '150,000원',
        comment: '빠르게 처리해주셨어요.',
        rating: '⭐️⭐️⭐️⭐️⭐️',
      },
    ],
  },
];

const ServiceCenter = () => {
  const { id } = useParams();
  const center = centers.find((c) => c.id === id);

  if (!center) return <div>센터 정보를 찾을 수 없습니다.</div>;

  return (
    <div style={containerStyle}>
      <Header title="FIX Finder" />
      <CenterInfo center={center} />
      <CenterDetails center={center} />
      <CenterInfoText center={center} />
      <Reviews reviews={center.reviews} />
    </div>
  );
};

const CenterInfo = ({ center }) => (
  <div style={centerInfoStyle}>
    <img src={center.logo} alt="Center Logo" style={logoStyle} />
    <h2 style={centerNameStyle}>{center.name}</h2>
    <button style={contactButtonStyle}>문의하기</button>
  </div>
);

const CenterDetails = ({ center }) => (
  <div style={detailsStyle}>
    <p>📍 {center.address}</p>
    <p>🕒 {center.status}</p>
    <p>📞 {center.phone}</p>
    <p>
      🌐{' '}
      <a href={center.url} target="_blank" rel="noopener noreferrer">
        {center.url}
      </a>
    </p>
    <p>📦 {center.services}</p>
  </div>
);

const CenterInfoText = ({ center }) => (
  <>
    <h3 style={infoTitleStyle}>정보</h3>
    <p style={infoTextStyle}>{center.infoText}</p>
  </>
);

const Reviews = ({ reviews }) => (
  <>
    <h3 style={reviewTitleStyle}>후기</h3>
    <p>{reviews.length}개</p>
    <div style={reviewStyle}>
      {reviews.map((r, index) => (
        <SingleReview key={index} {...r} />
      ))}
    </div>
  </>
);

const SingleReview = ({ title, price, comment, rating }) => (
  <div style={singleReviewStyle}>
    <h4>{title}</h4>
    <p>💰 {price}</p>
    <p>{comment}</p>
    <p>{rating}</p>
  </div>
);

// 스타일 정의
const containerStyle = {
  padding: '20px',
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
  padding: '5px 200px',
  backgroundColor: '#FFFFFF',
  color: '#2563eb',
  border: '1px solid #2563eb',
  borderRadius: '30px',
  cursor: 'pointer',
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

const reviewTitleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginTop: '20px',
};

const reviewStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const singleReviewStyle = {
  border: '1px solid #ccc',
  borderRadius: '20px',
  padding: '10px 16px',
  backgroundColor: '#fff',
  maxWidth: '200px',
};

export default ServiceCenter;
