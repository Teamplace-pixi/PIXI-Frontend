import React from 'react';

import { useNavigate } from 'react-router-dom';

function SettingHeader({ title = '사업자 정보 기입'}) {
 
  const navigate = useNavigate();

  return (
    <div style={styles.header}>
      
      <button style={styles.backButton} onClick={() => navigate(-1)}>
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
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    zIndex: 1000,
    padding: 0,
    margin: 0,
  },
  backButton: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    padding: '8px',
    cursor: 'pointer',
  },
  backIcon: {
    width: '24px',
    height: '24px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#000',
  },
};


export default SettingHeader;
