import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NewPost({ onAddPost }) {
  const [title, setTitle] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const deviceId = location.state?.deviceId;
  const deviceName = location.state?.deviceName;

  const handleSubmit = () => {
    if (!title || !model) {
      alert('제목과 기종은 필수 입력입니다.');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      title,
      model,
      price: price || '협의 가능',
      date: date || '협의 가능',
      location,
      tags: ['사용자 등록'],
    };

    onAddPost(newPost);
    navigate('/finder', { state: { id: deviceId, name: deviceName } });
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h2
        style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}
      >
        새 글 작성
      </h2>

      <label>제목</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="예: 아이폰 후면 수리 가능하신 분?"
        style={inputStyle}
      />

      <label>기종</label>
      <input
        value={model}
        onChange={(e) => setModel(e.target.value)}
        placeholder="예: 아이폰 16 pro"
        style={inputStyle}
      />

      <label>가능 금액</label>
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="예: 협의 가능"
        style={inputStyle}
      />

      <label>필요 날짜</label>
      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="예: 협의 가능"
        style={inputStyle}
      />

      <label>위치</label>
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="예: 경기도 광명시"
        style={inputStyle}
      />

      <button onClick={handleSubmit} style={submitButtonStyle}>
        등록하기
      </button>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '4px',
  marginBottom: '16px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '14px',
};

const submitButtonStyle = {
  backgroundColor: '#2563eb',
  color: '#fff',
  padding: '12px',
  width: '100%',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
};
