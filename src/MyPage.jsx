// MyPage.js
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
        console.log('게시글 목록 응답:', response.data);

        if (Array.isArray(response.data)) {
          setBoardList(response.data);
        } else {
          console.warn('게시글 응답이 배열이 아닙니다:', response.data);
          setBoardList([]);
        }
      } catch (error) {
        console.error('게시글 API 호출 실패:', error);
        setBoardList([]);
      }
    };

    fetchMyPage();
    fetchBoardList();
  }, []);

  if (showForm) return <BusinessForm />;

  const styles = {
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
    <div
      style={{
        padding: '16px',
        fontFamily: 'sans-serif',
        paddingBottom: '80px',
      }}
    >
      <MypageHeader />

      {/* Profile Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '24px',
        }}
      >
        <img
          src="/profile.png"
          alt="사용자 프로필 이미지"
          style={{
            marginTop: '30px',
            width: '137px',
            height: 'px',
            borderRadius: '50%',
            objectFit: 'cover',
            display: 'block',
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

      {/* Name and Address */}
      <div style={{ marginTop: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>
            이름
          </div>
          <input
            type="text"
            value={datas.nickname}
            readOnly
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
        </div>
        <div>
          <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>
            주소
          </div>
          <input
            type="text"
            value={datas.address}
            readOnly
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
              display: 'flex',
              marginRight: '25px',
            }}
          />
        </div>
      </div>

      {/* My 수리 요청 */}
      <div style={{ marginTop: '32px' }}>
        <h2
          style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}
        >
          My 수리 요청
        </h2>

        {boardList.length > 0 ? (
          boardList.map((post, idx) => (
            <div
              key={idx}
              onClick={() =>
                navigate('/post', {
                  state: {
                    id: post.boardId,
                  },
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
          <div style={styles.message}>등록된 구해요 게시글이 없습니다.</div>
        )}

        {/* <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: '12px',
            padding: '12px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#ddd',
              borderRadius: '8px',
            }}
          />

          <div style={{ marginLeft: '12px' }}>
            <div style={{ fontWeight: 'bold' }}>아이폰16 Pro</div>
            <div
              style={{ fontSize: '14px', color: '#2563eb', marginTop: '4px' }}
            >
              화면이 나오지 않음
            </div>
          </div>
        </div> */}
      </div>

      {/* 사업자 등록 버튼 */}
      <button
        onClick={() => setShowForm(true)}
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
        }}
      >
        사업자 등록
      </button>

      <BottomNav />
    </div>
  );
}
