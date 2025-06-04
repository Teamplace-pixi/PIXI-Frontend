import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import api from './api';

export default function ChatListPage() {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);
  const [hasAlert, setHasAlert] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await api.get('/myPage/setup');
        setCurrentUserId(response.data.profileId);
      } catch (error) {
        console.error('마이페이지 불러오기 실패:', error);
      }
    };

    fetchUserId();
  });

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await fetch(`/matchChat/rooms/${currentUserId}`);
        const data = await response.json();
        setChatList(data);
      } catch (error) {
        console.error('채팅 목록 불러오기 실패:', error);
      }
    };

    fetchChatList();
  }, []);

  useEffect(() => {
    const checkAlert = async () => {
      try {
        const res = await fetch(`/matchChat/Alert/${currentUserId}`);
        const hasAlert = await res.json();
        setHasAlert(hasAlert);
      } catch (error) {
        console.error('알림 확인 실패:', error);
      }
    };

    checkAlert();
  }, []);

  return (
    <div style={styles.page}>
      <Header title="FIX Finder" />

      <div style={styles.container}>
        <h2 style={styles.title}>채팅 목록</h2>

        <div style={styles.chatList}>
          {chatList.map((chat) => (
            <div
              key={chat.id}
              style={styles.chatItem}
              onClick={() => navigate(`/chat/${chat.roomid}`)}
            >
              <img src={chat.avatar} alt="avatar" style={styles.avatar} />
              <div style={styles.chatInfo}>
                <div style={styles.nameRow}>
                  <span style={styles.name}>{chat.name}</span>
                  <span style={styles.time}>{chat.time}</span>
                </div>
                <div style={styles.message}>{chat.message}</div>
              </div>
            </div>
          ))}
          {chatList.length === 0 && (
            <div style={{ textAlign: 'center', color: '#999' }}>
              채팅방이 없습니다.
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

const styles = {
  page: {
    position: 'relative',
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  container: {
    paddingTop: '80px',
    paddingBottom: '70px',
    paddingLeft: '16px',
    paddingRight: '16px',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  chatList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  chatItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    marginRight: '12px',
  },
  chatInfo: {
    flex: 1,
  },
  nameRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },
  name: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  time: {
    fontSize: '12px',
    color: '#999',
  },
  message: {
    fontSize: '13px',
    color: '#555',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};
