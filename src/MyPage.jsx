import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessForm from './BusinessForm';
import MypageHeader from './components/MypageHeader';
import BottomNav from './components/BottomNav';
import api from './api';

export default function MyPage() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const [datas, setDatas] = useState([]);
  const [boardList, setBoardList] = useState([]);

  const getRollTypeText = (type) => {
    switch (type) {
      case 0:
        return '일반 유저';
      default:
        return 'FIXER';
    }
  };

  useEffect(() => {
    const fetchMyPage = async () => {
      try {
        const response = await api.get('/myPage');
        setDatas(response.data);
      } catch (error) {
        console.error('마이페이지 불러오기 실패:', error);
      }
    };

    const fetchBoardList = async () => {
      try {
        const response = await api.get(`/myPage/boardList/`);
        if (Array.isArray(response.data)) {
          setBoardList(response.data);
        } else {
          setBoardList([]);
        }
      } catch (error) {
        setBoardList([]);
      }
    };

    fetchMyPage();
    fetchBoardList();
  }, []);

  if (showForm) return <BusinessForm />;

  const styles = {
    container: {
      paddingTop: '80px', // 헤더 높이 만큼 확보
      paddingBottom: '100px', // 하단 네비게이션 공간 확보
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: 'sans-serif',
    },
    inner: {
      padding: '0 16px',
    },
    requestItem: {
      border: '1px solid #eee',
      borderRadius: '16px',
      padding: '16px',
      marginBottom: '12px',
      backgroundColor: '#fff',
      cursor: 'pointer',
    },
    requestTitle: {
      fontWeight: 'bold',
      fontSize: '16px',
      marginBottom: '8px',
    },
    requestDetails: {
      display: 'flex',
      gap: '12px',
      fontSize: '14px',
      color: '#666',
    },
    requestTagsContainer: {
      marginTop: '12px',
      display: 'flex',
      gap: '8px',
    },
    requestTag: {
      padding: '4px 8px',
      backgroundColor: '#e0e7ff',
      color: '#1e40af',
      borderRadius: '12px',
      fontSize: '12px',
    },
  };

  return (
    <>
      <MypageHeader />

      <div style={styles.container}>
        <div style={styles.inner}>
          {/* 프로필 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px' }}>
            <img
              src="/profile.png"
              alt="사용자 프로필 이미지"
              style={{
                marginTop: '30px',
                width: '137px',
                height: '137px',
                borderRadius: '50%',
                objectFit: 'cover',
                backgroundColor: '#0047B1',
              }}
            />
            <div
              style={{
                marginTop: '10px',
                fontSize: '14px',
                color: '#666',
                padding: '5px 5px',
                borderRadius: '20px',
                border: '1px solid #ccc',
              }}
            >
              {getRollTypeText(datas.rollId)}
            </div>
          </div>

          {/* 이름과 주소 */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>이름</div>
              <input
                type="text"
                value={datas.nickname}
                readOnly
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '20px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>주소</div>
              <input
                type="text"
                value={datas.address}
                readOnly
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '20px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                }}
              />
            </div>
          </div>

          {/* 수리 요청 목록 */}
          <div style={{ marginTop: '32px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>
              My 수리 요청
            </h2>
            {boardList.length > 0 ? (
              boardList.map((post, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    navigate('/post', {
                      state: { id: post.boardId },
                    })
                  }
                  style={styles.requestItem}
                >
                  <div style={styles.requestTitle}>{post.boardTitle}</div>
                  <div style={styles.requestDetails}>
                    <div>💰 {post.boardCost.toLocaleString()}원</div>
                    <div>🕒 {post.boardDate}</div>
                  </div>
                  <div style={styles.requestTagsContainer}>
                    <div style={styles.requestTag}>{post.deviceBrand}</div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: '#888', fontSize: '14px' }}>등록된 구해요 게시글이 없습니다.</div>
            )}
          </div>

          {/* 사업자 등록 버튼 */}
          <button
            onClick={() => setShowForm(true)}
            style={{
              width: '100%',
              backgroundColor: '#2563eb',
              color: '#fff',
              padding: '14px',
              borderRadius: '20px',
              fontWeight: 'bold',
              fontSize: '16px',
              marginTop: '32px',
              border: 'none',
            }}
          >
            사업자 등록
          </button>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
