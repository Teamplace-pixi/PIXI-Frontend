// components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ title = 'FIXI' }) {
  const navigate = useNavigate();

  return (
    <div style={styles.header}>
      <span style={styles.logoText}>{title}</span>
      <div style={styles.buttonContainer}>
        <button style={styles.iconButton}>
          <img src="setting.png" alt="icon 1" style={styles.icon1} />
        </button>
        <button style={styles.iconButton}>
          <img
            src="mypage.png"
            alt="icon 2"
            onClick={() => navigate('/mypage')}
            style={styles.icon2}
          />
        </button>
      </div>
    </div>
  );
}

const styles = {
  header: {
    width: '100%',
    height: '60px',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    backgroundColor: '#fff',
    zIndex: 1000,
    borderBottom: '1px solid #eee',
    boxSizing: 'border-box',
  },
  logoText: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#0047B1',
    fontFamily: '"Shrikhand", serif',
    marginRight: '20px',
    flex: 1,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    background: 'transparent',
    border: 'none',
    marginLeft: '0px',
    cursor: 'pointer',
  },
  icon1: {
    width: '30px',
    height: '30px',
  },
  icon2: {
    width: '40px',
    height: '40px',
  },

  '@media (max-width: 768px)': {
    logoText: {
      fontSize: '24px',
    },
    icon: {
      width: '20px',
      height: '20px',
    },
  },
};

export default Header;
