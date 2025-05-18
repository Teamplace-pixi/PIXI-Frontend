import React from 'react';
import Header from './components/Header';
import ChatUI from './components/ChatUI';
import BottomNav from './components/BottomNav';

function AIChat() {
  return (
    <div style={styles.container}>
      <Header title="AI Chat" />
      <div style={styles.mainContent}>
        <div style={styles.chatBoxWrapper}>
          <ChatUI />
        </div>
      </div>
      <div style={styles.bottomNavWrapper}>
        <BottomNav />
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#f3f4f6', // 배경색
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '60px',
    paddingBottom: '60px',
  },
  mainContent: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
    padding: '16px',
  },
  chatBoxWrapper: {
    width: '100%',
    maxWidth: '480px', // 모바일 기준 너비 제한
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  bottomNavWrapper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)', // 하단 그림자
    zIndex: 10,
  },
};

export default AIChat;
