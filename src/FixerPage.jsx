// FixerPage.jsx
import React from 'react';
import MypageHeader from './components/MypageHeader';
import BottomNav from './components/BottomNav';
import { useNavigate } from 'react-router-dom';

export default function FixerPage() {
  const navigate = useNavigate();
  const userInfo = {
    name: '배별하',
    address: '상암동',
    role: 'FIXER',
    requests: [
      { title: '아이폰16 Pro', detail: '화면이 나오지 않음' },
      { title: '아이폰16 Pro', detail: '화면이 나오지 않음' },
    ],
  };

  return (
    <> 
      <MypageHeader /> 
      
      <div style={{ padding: '16px', paddingTop: '80px', paddingBottom: '80px' }}> {/* 여기 paddingTop을 헤더 높이만큼 (예: 60px 헤더면 80px 정도) 줘야 내용이 헤더 아래로 내려와 */}


        {/* 프로필 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px' }}>
          <img
            src="/profile.png"
            alt="프로필 이미지"
            style={{
              marginTop: '30px',
              width: '137px',
              height: '137px',
              borderRadius: '50%',
              objectFit: 'cover',
              backgroundColor: '#0047B1',
            }}
          />
          <div style={{
            marginTop: '10px',
            fontSize: '14px',
            color: '#fff',
            backgroundColor: '#0047B1',
            padding: '4px 12px',
            borderRadius: '20px',
            fontWeight: 'bold',
          }}>
            {userInfo.role}
          </div>
        </div>

        {/* 이름 & 주소 */}
        <div style={{ marginTop: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', marginBottom: '4px' }}>이름</div>
            <input
              type="text"
              value={userInfo.name}
              readOnly
              style={inputStyle}
            />
          </div>
          <div>
            <div style={{ fontSize: '14px', marginBottom: '4px' }}>주소</div>
            <input
              type="text"
              value={userInfo.address}
              readOnly
              style={inputStyle}
            />
          </div>
        </div>

        {/* 수리 요청 */}
        <div style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>My 수리 낙찰</h2>
          {userInfo.requests.map((req, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: '12px',
                padding: '12px',
                backgroundColor: '#f9f9f9',
                marginBottom: '12px',
              }}
            >
              <img src="/screen.png" alt="수리 요청" style={{ width: '48px', height: '48px', borderRadius: '8px' }} />
              <div style={{ marginLeft: '12px' }}>
                <div style={{ fontWeight: 'bold' }}>{req.title}</div>
                <div style={{ fontSize: '14px', color: '#2563eb', marginTop: '4px' }}>{req.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 사업체 관리 버튼 */}
        <button onClick={() => navigate('/fixer-business')}
          style={{
            width: '100%',
            backgroundColor: '#2563eb',
            color: '#fff',
            padding: '14px',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '16px',
            marginTop: '32px',
            border: 'none',
          }}
        >
          사업체 관리
        </button>

       
      </div>
      <BottomNav /> 
    </>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px',
};
