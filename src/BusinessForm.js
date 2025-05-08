import React from 'react';
import BottomNav from './components/BottomNav';
import SettingHeader from './components/SettingHeader';

export default function BusinessForm() {
  return (
    <div style={{ padding: '16px', paddingBottom: '80px' }}>
      
      <SettingHeader title="사업자 정보 기입" />
      <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>사업자 정보 기입</h2>

      {['상호명', '사업장 전화번호', '사업장 소재지'].map((label, i) => (
        <div key={i} style={{ marginTop: '16px' }}>
          
          <div style={{ fontSize: '14px', marginBottom: '4px' }}>
            {label} <span style={{ color: '#0047B1' }}>*</span>
          </div>
          <input
            type="text"
            placeholder={`${label}을 입력해주세요`}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
        </div>
      ))}

      {['사업자등록증 인증', '사업장 대표 이미지 등록'].map((label, i) => (
        <div key={i} style={{ marginTop: '24px' }}>

          <div style={{ fontSize: '14px', marginBottom: '8px' }}>
            {label} <span style={{ color: '#0047B1' }}>*</span>
          </div>
          <div
            style={{
              width: '140px',
              height: '120px',
              border: '1px solid #bbb',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              overflow: 'hidden',
            }}
          >
            
            <img
              src="/businesscamera.png"
              alt={`${label} 첨부`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>
      ))}

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
        등록하기
      </button>

      <BottomNav />
    </div>
  );
}
