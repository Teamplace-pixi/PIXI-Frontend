import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import SettingHeader from './components/SettingHeader';
import api from './api';

export default function BusinessFormCheck() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shopName: '',
    shopCall: '',
    shopLoc: '',
    thumb: null,
  });

  const [preview, setPreview] = useState({
    thumb: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setForm((prev) => ({ ...prev, [name]: file }));
    setPreview((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const shopInfo = {
        shopName: form.shopName,
        shopCall: form.shopCall,
        shopLoc: form.shopLoc,
        thumb: '',
      };

      formData.append(
        'shop',
        new Blob([JSON.stringify(shopInfo)], { type: 'application/json' })
      );
      formData.append('thumb', form.thumb);

      await api.put('/myPage/shop', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('사업자 정보가 수정되었습니다.');
      navigate('/mypage');
    } catch (error) {
      console.error('사업자 정보 수정 실패:', error);
      alert('사업자 정보 등록에 실패했습니다.');
    }
  };

  return (
    <div style={{ display: 'flex', paddingBottom: '80px' }}>
      <SettingHeader title="등록 사업체 관리" />

      <div
        style={{
          marginTop: '30px',
          flex: 1,
          padding: '16px',
        }}
      >
        {[
          {
            label: '상호명',
            name: 'shopName',
            placeholder: '센터 이름을 입력해주세요',
          },
          {
            label: '사업장 전화번호',
            name: 'shopCall',
            placeholder: '사업장 주소를 입력해주세요',
          },
          {
            label: '사업장 소재지',
            name: 'shopLoc',
            placeholder: '영업시간을 입력해주세요',
          },
        ].map(({ label, name, placeholder }, i) => (
          <div key={i} style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '14px', marginBottom: '4px' }}>
              {label} <span style={{ color: '#0047B1' }}>*</span>
            </div>
            <div style={{ position: 'relative', display: 'flex' }}>
              <input
                type="text"
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                }}
              />
            </div>
          </div>
        ))}

        {[
          { label: '사업자등록증 인증', name: 'shopCertification' },
          { label: '사업장 대표 이미지 등록', name: 'thumb' },
        ].map(({ label, name }, i) => (
          <div key={i} style={{ marginTop: '24px' }}>
            <div style={{ fonstSize: '14px', marginBottom: '8px' }}>
              {label} <span style={{ color: '#0047B1' }}>*</span>
            </div>
            <label
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
                src={preview[name] || '/businesscamera.png'}
                alt={`${label} 첨부`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              <input
                type="file"
                name={name}
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        ))}

        <button
          onClick={handleSubmit}
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
            marginBottom: '40px',
          }}
        >
          등록하기
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
