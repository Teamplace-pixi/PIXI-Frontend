import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate, useLocation } from 'react-router-dom';

function TalentSection() {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoardPosts = async () => {
      try {
        const response = await api.get('/home/board');
        setPosts(response.data);
      } catch (error) {
        console.error('게시글 불러오기 실패:', error);
      }
    };
    fetchBoardPosts();
  }, []);

  const getDeviceTypeText = (type) => {
    switch (type) {
      case 0:
        return '핸드폰';
      case 1:
        return '노트북';
      case 2:
        return '태블릿';
      default:
        return '워치';
    }
  };

  // const post = {
  //   title: '아이폰 후면 수리 가능하신 분?',
  //   price: '가능 금액 협의 가능',
  //   date: '필요 날짜 협의 가능',
  //   tags: ['애플', '핸드폰', '후면'],
  // };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🛠️ 능력자를 찾습니다!</h2>
        <button style={styles.viewAll}>전체 보기 &gt;</button>
      </div>

      {posts.map((post) => (
        <div
          key={post.boardId}
          style={styles.card}
          onClick={() =>
            navigate('/post', {
              state: {
                id: post.boardId,
              },
            })
          }
        >
          <h3 style={styles.cardTitle}>{post.boardTitle}</h3>
          <div style={styles.meta}>
            <span>
              💰{' '}
              {post.boardCost > 0
                ? `${post.boardCost.toLocaleString()}원`
                : '가격 미정'}
            </span>
            <span>🕒 {post.boardDate}</span>
          </div>
          <div style={styles.tags}>
            {[post.deviceBrand, getDeviceTypeText(post.deviceType)].map(
              (tag, idx) => (
                <button
                  key={idx}
                  style={{
                    ...styles.tag,
                    backgroundColor: idx === 0 ? '#1E40AF' : '#F3F4F6',
                    color: idx === 0 ? '#fff' : '#000',
                  }}
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    margin: '16px',
    marginBottom: '80px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  viewAll: {
    background: 'none',
    border: 'none',
    color: '#333',
    fontSize: '14px',
    cursor: 'pointer',
  },
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    padding: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  meta: {
    fontSize: '13px',
    color: '#6b7280',
    display: 'flex',
    gap: '16px',
    marginBottom: '12px',
  },
  tags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  tag: {
    padding: '6px 12px',
    fontSize: '13px',
    borderRadius: '999px',
    border: 'none',
  },
};

export default TalentSection;
