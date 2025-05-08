import React from 'react';
import BottomNav from './components/BottomNav';

export default function MyPage() {
  return (
    <div
      style={{
        padding: '16px',
        fontFamily: 'sans-serif',
        paddingBottom: '80px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e40af' }}>
          My Page
        </h1>
        <div
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#ccc',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Profile Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '24px',
        }}
      >
        <div
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            backgroundColor: '#ddd',
          }}
        />
        <div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
          일반 회원
        </div>
      </div>

      {/* Name and Address */}
      <div style={{ marginTop: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>
            이름
          </div>
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
          <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>
            주소
          </div>
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
        <h2
          style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}
        >
          My 수리 요청
        </h2>
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
          <div
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#ddd',
              borderRadius: '8px',
            }}
          />
          <div style={{ marginLeft: '12px' }}>
            <div style={{ fontWeight: 'bold' }}>아이폰16 Pro</div>
            <div
              style={{ fontSize: '14px', color: '#2563eb', marginTop: '4px' }}
            >
              화면이 나오지 않음
            </div>
          </div>
        </div>
      </div>

      {/* 사업자 등록 버튼 */}
      <button
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

      {/* Bottom Navigation */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '70px',
          backgroundColor: '#fff',
          borderTop: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      ></div>
      <BottomNav />
    </div>
  );
}
