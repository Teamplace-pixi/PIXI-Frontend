import React from 'react';
import Header from './components/Header';
import ChatUI from './components/ChatUI';
import BottomNav from './components/BottomNav';

function AIChat() {
  return (
    <div style={styles.container}>
      <Header title="AI Chat" />
      <div style={styles.mainContent}>
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
    paddingBottom: '60px',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  mainContent: {
    flexGrow: 1,
    minHeight: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
};

export default AIChat;
