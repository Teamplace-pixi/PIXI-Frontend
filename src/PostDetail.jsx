import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from './api';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

export default function PostDetail() {
  const location = useLocation();
  const { id: boardId, deviceName: passedDeviceName } = location.state || {}; // state에서 값 꺼내기

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!boardId) {
      setError('게시글 ID가 전달되지 않았습니다.');
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await api.get(`/board/board_id=${boardId}`);
        setPost(response.data);
      } catch (err) {
        setError('게시글 정보를 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [boardId]);

  if (loading) return <div>불러오는 중...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <>
      <Header />
      <div style={{ padding: '80px 16px 120px', fontFamily: 'sans-serif' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{post.boardTitle}</h2>
        <p style={{ color: '#555' }}>기종: {post.deviceName || passedDeviceName}</p>
        <p style={{ color: '#555' }}>가능 금액: {post.boardCost}원</p>
        <p style={{ color: '#555' }}>필요 날짜: {post.boardDate}</p>
        <p style={{ color: '#555' }}>위치: {post.boardLoc}</p>
        <p style={{ color: '#555' }}>작성자: {post.nickname}</p>
        <p style={{ marginTop: '12px' }}>{post.boardContent}</p>
      </div>

      {/* 수리 지원하기 버튼 */}
      <div
        style={{
          position: 'fixed',
          bottom: '60px',
          left: 0,
          width: '100%',
          padding: '0 16px',
        }}
      >
        <button
          style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            padding: '14px',
            width: 'calc(100% - 32px)',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          }}
          onClick={() => alert('수리 지원이 접수되었습니다!')}
        >
          수리 지원하기
        </button>
      </div>

      <BottomNav />
    </>
  );
}
