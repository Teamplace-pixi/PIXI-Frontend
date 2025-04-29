import React from 'react';
import BottomNav from './components/BottomNav';

export default function Finder() {
  const parts = [
    { name: '액정 교체', price: '420,000원' },
    { name: '배터리 교체', price: '188,000원' },
    { name: '후면 교체', price: '250,000원' },
  ];

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        padding: '16px',
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
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e40af' }}>
          FIX Finder
        </h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#ccc',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              width: '24px',
              height: '24px',
              border: '2px solid #1e40af',
              borderRadius: '50%',
            }}
          />
        </div>
      </div>

      {/* Path & Product Image */}
      <div style={{ marginTop: '16px', color: '#777', fontSize: '14px' }}>
        핸드폰 &gt;{' '}
        <span style={{ color: '#1e40af', fontWeight: 'bold' }}>
          아이폰16 Pro
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '12px',
        }}
      >
        <div
          style={{
            width: '120px',
            height: '120px',
            backgroundColor: '#ddd',
            borderRadius: '16px',
          }}
        />
        <div style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '16px' }}>
          아이폰16 Pro
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '24px',
        }}
      >
        {['부품 가격', '수리센터', '구해요'].map((tab, index) => (
          <button
            key={index}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: tab === '부품 가격' ? 'none' : '1px solid #ccc',
              backgroundColor: tab === '부품 가격' ? '#2563eb' : '#fff',
              color: tab === '부품 가격' ? '#fff' : '#333',
              fontWeight: 'bold',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Scrollable Part List */}
      <div
        style={{
          marginTop: '24px',
          maxHeight: '300px',
          overflowY: 'auto',
          paddingRight: '4px',
        }}
      >
        {parts.map((part, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ddd',
              borderRadius: '16px',
              padding: '12px',
              marginBottom: '12px',
              backgroundColor: '#fff',
            }}
          >
            {/* 이미지 대체 사각형 */}
            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#ccc',
                borderRadius: '12px',
                marginRight: '12px',
              }}
            />
            {/* 텍스트 정보 */}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                {part.name}
              </div>
              <div
                style={{ color: '#2563eb', fontSize: '14px', marginTop: '4px' }}
              >
                {part.price}
              </div>
            </div>
            {/* 태그 (선택적) */}
            {part.tag && (
              <div
                style={{
                  backgroundColor: '#f97316',
                  color: '#fff',
                  padding: '4px 8px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                }}
              >
                {part.tag}
              </div>
            )}
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
