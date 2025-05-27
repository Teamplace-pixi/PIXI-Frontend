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
    paddingTop: '60px', // 헤더 높이만큼 여백
    paddingBottom: '60px', // 하단 네비 높이만큼 여백
  },
  mainContent: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center', // 이건 둬도 되고 없애도 되고
    padding: '0', // 여기가 좌우 패딩이 없어야 해!
  },
  chatBoxWrapper: {
    width: '100%', // 부모(mainContent)의 100%를 채우고
    // maxWidth: '480px', // 요거는 아예 제거!
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    // padding: '0 16px', // ❌ 여기 패딩을 없애야 함!
    // boxSizing: 'border-box', // 패딩 없으니 이것도 이제 필요없음
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
