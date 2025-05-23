import React, { useState, useEffect } from 'react';
import SettingHeader from './components/SettingHeader';
import api from './api';
import { useNavigate } from 'react-router-dom';

export default function EditProfilePage() {
  const navigator = useNavigate();
  const [datas, setDatas] = useState({});
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    showPassword: false,
  });

  useEffect(() => {
    const fetchMyPageEdit = async () => {
      try {
        const response = await api.get('/myPage/edit');
        setDatas(response.data);
      } catch (error) {
        console.error('정보 수정 조회 실패:', error);
      }
    };
    fetchMyPageEdit();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword' || name === 'newPassword') {
      setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setDatas((prev) => ({ ...prev, [name]: value }));
    }
  };

  const togglePasswordVisibility = () => {
    setForm((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        loginId: datas.loginId,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        nickname: datas.nickname,
        address: datas.address,
        profileId: datas.profileId,
      };

      await api.put('/myPage/edit', payload);
      alert('회원정보가 저장되었습니다.');
      navigator('/mypage');
    } catch (error) {
      console.error('회원정보 수정 실패:', error);
      alert('회원정보 수정에 실패했습니다.');
    }
  };

  return (
    <div style={{ paddingTop: '60px' }}>
      <SettingHeader title="My Page" />

      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '16px' }}>
        회원정보 변경
      </h2>

      {/*프로필이미지*/}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src="/profile.png"
            alt="프로필"
            style={{
              width: '137px',
              height: '137px',
              borderRadius: '50%',
              objectFit: 'cover',
              backgroundColor: '#0047B1',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: '#5D5D5D',
              borderRadius: '50%',
              padding: '6px',
              cursor: 'pointer',
            }}
          >
            <img
              src="/profilecamera.png"
              alt="변경"
              style={{ width: '20px', height: '20px' }}
            />
          </div>
        </div>
      </div>

      {/* 입력 필드 */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontWeight: 'bold', fontSize: '14px' }}>
          이름 <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="text"
          name="nickname"
          value={datas.nickname || ''}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontWeight: 'bold', fontSize: '14px' }}>
          주소 <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="text"
          name="address"
          value={datas.address || ''}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontWeight: 'bold', fontSize: '14px' }}>
          아이디 <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="email"
          name="loginId"
          value={datas.loginId || ''}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontWeight: 'bold', fontSize: '14px' }}>
          현재 비밀번호
        </label>
        <input
          type={form.showPassword ? 'text' : 'password'}
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontWeight: 'bold', fontSize: '14px' }}>
          새 비밀번호
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type={form.showPassword ? 'text' : 'password'}
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            style={{ ...inputStyle, paddingRight: '40px' }}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <img
              src={form.showPassword ? '/password-on.png' : '/password-off.png'}
              alt="비밀번호 보기"
              style={{ width: '20px', height: '20px' }}
            />
          </button>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontWeight: 'bold',
          fontSize: '16px',
          marginTop: '24px',
        }}
      >
        저장하기
      </button>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  borderRadius: '12px',
  border: '1px solid #ccc',
  marginTop: '8px',
};
