import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import api from './api';

export default function Finder() {
  const [selectedTab, setSelectedTab] = useState('부품 가격');
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/new-post');
  };


  const parts = [
    { name: '액정 교체', price: '420,000원' },
    { name: '후면 교체', price: '250,000원' },
    { name: '카메라 교체', price: '500,000원' },
    { name: '배터리 교체', price: '188,000원' },
    { name: '기기 금액', price: '1,200,000원' },
  ];

  const repairCenters = [
    { name: '강남 스마트 수리센터', address: '서울 강남구 테헤란로 123' },
    { name: '홍대 리페어존', address: '서울 마포구 와우산로 45' },
  ];

  const requests = new Array(3).fill({
    title: '아이폰 후면 수리 가능하신 분?',
    price: '가능 금액 협의 가능',
    date: '필요 날짜 협의 가능',
    tags: ['애플', '핸드폰'],
  });

  return (
    <>
      <Header title="FIX Finder" />
      <div
        style={{
          fontFamily: 'sans-serif',
          padding: '16px',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
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
          <img
            src="iphone.png"
            alt="아이폰16 Pro"
            style={{ width: '120px', height: '120px' }}
          />
          <div
            style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '16px' }}
          >
            아이폰16 Pro
          </div>
        </div>

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
              onClick={() => setSelectedTab(tab)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: tab === selectedTab ? 'none' : '1px solid #ccc',
                backgroundColor: tab === selectedTab ? '#2563eb' : '#fff',
                color: tab === selectedTab ? '#fff' : '#333',
                fontWeight: 'bold',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {selectedTab === '구해요' && (
          <div style={{ marginTop: '20px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '16px',
                fontSize: '14px',
                marginBottom: '12px',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>상위보기</span>
              <span style={{ color: '#2563eb', fontWeight: 'bold' }}>
                세부보기
              </span>
            </div>
            {requests.map((req, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid #eee',
                  borderRadius: '16px',
                  padding: '16px',
                  marginBottom: '12px',
                  backgroundColor: '#fff',
                }}
              >
                <div
                  style={{
                    fontWeight: 'bold',
                    fontSize: '16px',
                    marginBottom: '8px',
                  }}
                >
                  {req.title}
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    fontSize: '14px',
                    color: '#666',
                  }}
                >
                  <div>📄 {req.price}</div>
                  <div>🗓️ {req.date}</div>
                </div>
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                  {req.tags.map((tag, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: '12px',
                        padding: '4px 8px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '8px',
                        color: '#333',
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ textAlign: 'right', marginTop: '12px' }}>
              <button
                onClick={handleNavigate}
                style={{
                  backgroundColor: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                +글쓰기
              </button>
            </div>
          </div>
        )}

        {selectedTab === '부품 가격' &&
          parts.map((part, idx) => (
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
              <img
                style={{
                  width: '48px',
                  height: '48px',
                  src: 'camera.png',
                  borderRadius: '12px',
                  marginRight: '12px',
                }}
                src="camera.png"
                alt="camera"
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  {part.name}
                </div>
                <div
                  style={{
                    color: '#2563eb',
                    fontSize: '14px',
                    marginTop: '4px',
                  }}
                >
                  {part.price}
                </div>
              </div>
            </div>
          ))}

        {selectedTab === '수리센터' &&
          repairCenters.map((center, idx) => (
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
              <img
                src="samsung.png"
                alt="samsung"
                style={{
                  width: '48px',
                  height: '48px',
                  src: 'samsung.png',
                  borderRadius: '12px',
                  marginRight: '12px',
                }}
              />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  {center.name}
                </div>
                <div
                  style={{
                    color: '#2563eb',
                    fontSize: '14px',
                    marginTop: '4px',
                  }}
                >
                  {center.address}
                </div>
              </div>
            </div>
          ))}
      </div>

      <BottomNav />
    </>
  );
}
