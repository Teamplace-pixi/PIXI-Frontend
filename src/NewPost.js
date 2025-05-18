import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from './api';

export default function NewPost({ onAddPost }) {
  const [title, setTitle] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const deviceId = location.state?.id;
  const passedDeviceName = location.state?.name;

  const handleSubmit = async () => {
    if (!title || !model) {
      alert('제목과 기종은 필수 입력입니다.');
      return;
    }

    try {
      const formData = new FormData();

      const boardData = {
        boardTitle: title,
        boardContent: content,
        boardLoc: address,
        boardCost: parseInt(price) || 0,
        boardDate: date,
        deviceName: model || '',
        imageIds: [],
      };

      formData.append(
        'board',
        new Blob([JSON.stringify(boardData)], { type: 'application/json' })
      );

      files.forEach((file) => {
        formData.append('multipartFiles', file);
      });

      const response = await api.post('/board', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('업로드 성공:', response.data);
      navigate('/finder', {
        state: {
          id: deviceId || '',
          name: passedDeviceName || '',
        },
      });
    } catch (err) {
      console.error('업로드 실패:', err);
      alert('글 등록에 실패했습니다.');
    }
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h2
        style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}
      >
        새 글 작성
      </h2>

      {/* 입력 필드들 */}
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

      <label>세부 내용</label>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="상세 설명을 입력해주세요"
        style={{ ...inputStyle, height: '100px' }}
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

      <label>이미지 업로드</label>
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files))}
        style={{ marginBottom: '16px' }}
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
