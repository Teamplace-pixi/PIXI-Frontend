import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from './api';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import RepairapplyModal from './components/RepairapplyModal'; // ✅ 수정된 모달 import

export default function PostDetail() {
  const location = useLocation();
  const boardId = location.state?.id;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ 모달 상태

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

      {/* 본문 내용 */}
      <div style={{ padding: '80px 16px 120px', fontFamily: 'sans-serif' }}>
        {/* 모집 상태 및 날짜 */}
        <div style={{ marginBottom: '8px', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>
          모집중
        </div>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>
          등록일시 {post.createdAt || '알 수 없음'}
        </div>

        {/* 제목 */}
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
          {post.boardTitle}
        </h2>

        {/* 구분선 */}
        <div style={{ borderTop: '1px solid #eee', margin: '20px 0' }} />

        {/* 상세정보 */}
        <div style={{ fontSize: '14px', color: '#333', lineHeight: '1.8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>📱 기종</span>
            <span>{post.deviceName}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>💰 가능 금액</span>
            <span>{post.boardCost}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>🕒 필요 날짜</span>
            <span>{post.boardDate}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>📍 위치</span>
            <span>{post.boardLoc}</span>
          </div>
        </div>

        {/* 구분선 */}
        <div style={{ borderTop: '1px solid #eee', margin: '24px 0' }} />

        {/* 본문 */}
        <div style={{ fontSize: '14px', color: '#555' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>사진 및 본문</div>
          <div style={{ whiteSpace: 'pre-wrap' }}>{post.boardContent}</div>
        </div>
      </div>

      {/* 수리 지원하기 버튼 */}
      <div
        style={{
          position: 'fixed',
          bottom: '60px',
          left: 0,
          width: '100%',
          padding: '0 16px',
          backgroundColor: '#fff',
        }}
      >
        <button
          style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            padding: '14px',
            width: '95%',
            border: 'none',
            borderRadius: '20px',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          }}
          onClick={() => setIsModalOpen(true)}
        >
          수리 지원하기
        </button>
      </div>

      <BottomNav />

      {/* 모달 렌더링 */}
      {isModalOpen && (
        <RepairapplyModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
