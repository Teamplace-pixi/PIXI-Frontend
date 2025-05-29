import React, { useState } from 'react';
import Header from './components/Header';
import ChatUI from './components/ChatUI';
import BottomNav from './components/BottomNav';
import ChatHistorySidebar from './components/ChatHistorySidebar';

function AIChat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hover, setHover] = useState(false);  // 툴팁 표시 상태
  const dummyHistories = [
    { summary: '첫 번째 대화' },
    { summary: '두 번째 대화' },
    { summary: '세 번째 대화' },
  ];

  const handleSelect = (history) => {
    console.log('선택한 히스토리:', history);
  };

  return (
    <div style={styles.container}>
      <ChatHistorySidebar
        histories={dummyHistories}
        onSelect={handleSelect}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Header title="AI Chat" />
      
      {/* 사이드바 열기 버튼 + 커스텀 툴팁 */}
      {!sidebarOpen && (
        <div 
          style={styles.tooltipWrapper}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <button
            style={styles.openSidebarBtn}
            onClick={() => setSidebarOpen(true)}
            aria-label="채팅 히스토리 열기"
          >
            ☰
          </button>
          {hover && <div style={styles.tooltip}>사이드바 열기</div>}
        </div>
      )}

      <div style={{ ...styles.mainContent, marginLeft: sidebarOpen ? 280 : 0 }}>
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
    backgroundColor: '#f3f4f6',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '60px',
    paddingBottom: '60px',
  },
  tooltipWrapper: {
    position: 'fixed',
    top: 70,
    left: 10,
    zIndex: 30,
  },
  openSidebarBtn: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '18px',
  },
  tooltip: {
    position: 'absolute',
    top: '100%',  // 버튼 바로 아래
    left: '50%',
    transform: 'translateX(-50%)',
    marginTop: 6,
    padding: '4px 8px',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 12,
    borderRadius: 4,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    userSelect: 'none',
  },
  mainContent: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    transition: 'margin-left 0.3s ease',
  },
  chatBoxWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  bottomNavWrapper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
    zIndex: 10,
  },
};

export default AIChat;
