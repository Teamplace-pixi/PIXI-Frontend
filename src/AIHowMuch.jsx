import React from 'react';
import BottomNav from './components/BottomNav';

function AIHowMuch() {
  return (
    <div className="home-container" style={styles.container}>
      <div className="main-content" style={styles.mainContent}>
        <img
          src="123.png"
          width="400px"
          height="800px"
          alt="대체사진"
          style={{ display: 'flex', padding: '25px' }}
        />
      </div>
      <BottomNav />
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    paddingBottom: '60px',
    backgroundColor: '#fff',
  },
  mainContent: {
    paddingBottom: '16px',
  },
};

export default AIHowMuch;
