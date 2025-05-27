import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from './api';

export default function NewPost() {
  const [form, setForm] = useState({
    title: '',
    model: '',
    price: '',
    content: '',
    date: '',
    address: '',
    files: [], // 다중 파일을 위한 배열
  });

  const navigate = useNavigate();
  const location = useLocation();
  const deviceId = location.state?.id;
  const passedDeviceName = location.state?.name;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, files: Array.from(e.target.files) }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.model) {
      alert('제목과 기종은 필수 입력입니다.');
      return;
    }

    try {
      const formData = new FormData();

      const boardData = {
        boardTitle: form.title,
        boardContent: form.content,
        boardLoc: form.address,
        boardCost: form.price || '협의 가능',
        boardDate: form.date || '협의 가능',
        deviceName: form.model,
        imageIds: [0], // 이미지 ID가 없다면 빈 배열로
        multipartFiles: [''],
      };

      formData.append(
        'board',
        new Blob([JSON.stringify(boardData)], { type: 'application/json' })
      );

      form.files.forEach((file) => {
        formData.append('multipartFiles', file);
      });

      const response = await api.post('/board', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('업로드 성공:', response.data);
      alert('글이 등록되었습니다.');
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

      <label>제목</label>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="예: 아이폰 후면 수리 가능하신 분?"
        style={inputStyle}
      />

      <label>기종</label>
      <input
        name="model"
        value={form.model}
        onChange={handleChange}
        placeholder="예: 아이폰 16 pro"
        style={inputStyle}
      />

      <label>세부 내용</label>
      <input
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="상세 설명을 입력해주세요"
        style={{ ...inputStyle, height: '100px' }}
      />

      <label>가능 금액</label>
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="협의 가능시 0원, 아니면 금액을 입력해주세요"
        style={inputStyle}
      />

      <label>필요 날짜</label>
      <input
        name="date"
        value={form.date}
        onChange={handleChange}
        placeholder="2000-00-00 형식으로 입력해주세요"
        style={inputStyle}
      />

      <label>위치</label>
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="예: 경기도 광명시"
        style={inputStyle}
      />

      <label>이미지 업로드</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
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
