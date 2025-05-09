// MyPage.js
import React, { useState } from 'react';
import BusinessForm from './BusinessForm';
import MypageHeader from './components/MypageHeader';
import BottomNav from './components/BottomNav';


export default function MyPage() {
  const [showForm, setShowForm] = useState(false);

  if (showForm) return <BusinessForm />;

  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif', paddingBottom: '80px' }}>
      
      
        <MypageHeader />
      
      {/* Profile Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px' }}>
        
        <img src="/profile.png" alt="사용자 프로필 이미지" 
          style={{ marginTop: '30px',width: '137px', height: 'px', borderRadius: '50%', objectFit: 'cover',
          display: 'block', backgroundColor: '#0047B1' }} />
        
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666',padding: '5px 5px',
          borderRadius: '20px', border: '1px solid #ccc' }}>일반 회원</div>
      </div>

      {/* Name and Address */}
      <div style={{ marginTop: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>이름</div>
          <input
            type="text"
            value="배별하"
            readOnly
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
        </div>
        <div>
          <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>주소</div>
          <input
            type="text"
            value="상암동"
            readOnly
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
              display: 'flex',
              marginRight: '25px',
            }}
          />
        </div>
      </div>

      {/* My 수리 요청 */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>My 수리 요청</h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: '12px',
            padding: '12px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <div style={{ width: '48px', height: '48px', backgroundColor: '#ddd', borderRadius: '8px' }} />
          
          <div style={{ marginLeft: '12px' }}>
            <div style={{ fontWeight: 'bold' }}>아이폰16 Pro</div>
            <div style={{ fontSize: '14px', color: '#2563eb', marginTop: '4px' }}>화면이 나오지 않음</div>
          </div>
        </div>
      </div>

      {/* 사업자 등록 버튼 */}
      <button
        onClick={() => setShowForm(true)}
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
        사업자 등록
      </button>

      
      <BottomNav />
    </div>
  );
}
