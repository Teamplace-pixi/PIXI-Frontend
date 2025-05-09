import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingHeader from './components/SettingHeader';
import BottomNav from './components/BottomNav';

export default function FixerBusinessSetting() {
  const navigate = useNavigate();

  // 상태 정의
  const [form, setForm] = useState({
    name: '용산 수리수리 센터',
    phone: '010-1122-9988',
    address: '용산 어디어디',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('저장된 사업자 정보:', form);
    alert('사업자 정보가 저장되었습니다!');
    navigate('/fixer');
  };

  return (
    <div style={{ padding: '16px', paddingBottom: '80px' }}>
      <SettingHeader title="등록 사업체 관리" />

      {/* 사업자 기본 입력 */}
      {[
        { label: '상호명', name: 'name', placeholder: '상호명을 입력하세요', value: form.name },
        { label: '사업장 전화번호', name: 'phone', placeholder: '전화번호를 입력하세요', value: form.phone },
        { label: '사업장 소재지', name: 'address', placeholder: '주소를 입력하세요', value: form.address },
      ].map((item, i) => (
        <div key={i} style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '14px', marginBottom: '4px' }}>
            {item.label} <span style={{ color: '#0047B1' }}>*</span>
          </div>
          <input
            type="text"
            name={item.name}
            placeholder={item.placeholder}
            value={item.value}
            onChange={handleChange}
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

      {/* 저장 버튼 */}
      <button
        onClick={handleSave}
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
        저장하기
      </button>

      <BottomNav />
    </div>
  );
}
