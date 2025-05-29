import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

const chatList = [
  {
    id: 1,
    name: '삼성전자서비스 강서센터',
    message: '안녕하세요 물었다 가세요 싸게 해드릴게',
    time: '4일 전',
    avatar: '/samsung.png',
  },
  {
    id: 2,
    name: '삼성전자서비스 강서센터',
    message: '안녕하세요 물었다 가세요 싸게 해드릴게',
    time: '4일 전',
    avatar: '/samsung.png',
  },
];

export default function ChatListPage() {
  const navigate = useNavigate();

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
              onClick={() => navigate(`/chat/${chat.id}`)}
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
