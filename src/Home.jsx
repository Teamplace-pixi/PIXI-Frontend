import React from 'react';
import Header from './components/Header';
import ChatUI from './components/ChatUI';
import BottomNav from './components/BottomNav';

function AIChat() {
  return (
    <div className="aiChat-container" style={styles.container}>
      <Header title="AI Chat" />
      <div className="main-content" style={styles.mainContent}>
        <ChatUI />
      </div>
      <BottomNav />
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    paddingTop: '60px',
    paddingBottom: '16px',
    backgroundColor: '#fff',
  },
  mainContent: {
    paddingBottom: '16px',
    flex: 1,
    minHeight: 0,
  },
};

export default AIChat;