import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import api from './api';

export default function ChatListPage() {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);
  const [hasRead, setHasRead] = useState(false);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await api.get(`/matchChat/rooms`);
        console.log('채팅 목록 응답:', response.data);
        setChatList(response.data);
        setHasRead(response.data.read);
      } catch (error) {
        console.error('채팅 목록 불러오기 실패:', error);
      }
    };

    fetchChatList();
  }, []);

  return (
    <div style={styles.page}>
      <Header title="FIX Finder" />

      <div style={styles.container}>
        <h2 style={styles.title}>채팅 목록</h2>

        <div style={styles.chatList}>
          {chatList.map((chatList) => (
            <div
              key={chatList.roomId}
              style={styles.chatItem}
              onClick={() =>
                navigate(`/chat/${chatList.roomId}`, {
                  state: {
                    roomId: chatList.roomId,
                    userId: chatList.userId,
                  },
                })
              }
            >
              <img src={chatList.userImg} alt="avatar" style={styles.avatar} />
              <div style={styles.chatInfo}>
                <div style={styles.nameRow}>
                  <span style={styles.name}>{chatList.userName}</span>
                  <span style={styles.time}>
                    {chatList.lastMsgTime.replace('T', ' ')}
                  </span>
                </div>
                <div style={hasRead ? styles.messageNotRead : styles.message}>
                  {chatList.lastMsg}
                </div>
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
  messageNotRead: {
    fontSize: '13px',
    color: '#FFFFFF',
    font: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};
