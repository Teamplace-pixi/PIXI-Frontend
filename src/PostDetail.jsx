import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

export default function PostDetail({ posts }) {
  const { id } = useParams();

  if (!posts || !Array.isArray(posts)) {
    return <div>게시글 정보가 로드되지 않았습니다.</div>;
  }

  const post = posts.find((p) => p?.id?.toString() === id);

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <>
      <Header title="FIX Finder" />
      <div style={{ padding: '80px 16px 120px', fontFamily: 'sans-serif' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{post.title}</h2>
        <p style={{ color: '#555' }}>기종: {post.model}</p>
        <p style={{ color: '#555' }}>가능 금액: {post.price}</p>
        <p style={{ color: '#555' }}>필요 날짜: {post.date}</p>
        <p style={{ color: '#555' }}>위치: {post.location}</p>

        <div
          style={{
            marginTop: '12px',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          {post.tags?.map((tag, i) => (
            <span
              key={i}
              style={{
                padding: '4px 8px',
                backgroundColor: '#eee',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ✅ 수리 지원하기 버튼 (네비게이션바 바로 위) */}
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
            width: 'calc(100% - 32px)', // 양쪽 여백을 제외한 너비
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
