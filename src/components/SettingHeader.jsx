import React from 'react';

function SettingHeader({ title = '사업자 정보 기입'}) {
  return (
    <div style={styles.header}>
      <button style={styles.backButton}>
        <img src="backIcon.png" alt="back" style={styles.backIcon} />
      </button>
      <span style={styles.title}>{title}</span>
    </div>
  );
}

const styles = {
  header: {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    padding: '0 0px', 
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    zIndex: 1000,
  },
  backButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    left: '3px', 
    top: '50%', 
    transform: 'translateY(-50%)', 
    zIndex: 1, 
   
  },
  backIcon: {
    width: '24px',
    height: '24px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    
  },
};

export default SettingHeader;
