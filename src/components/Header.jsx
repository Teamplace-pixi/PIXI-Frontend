import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ title = 'FIXI' }) {
  const navigate = useNavigate();

  return (
    <div style={styles.header}>
      <span style={styles.logoText}>{title}</span>
      <div style={styles.buttonContainer}>
        <button style={styles.iconButton} onClick={() => navigate('/chatlist')}>
          <img src="/chat3.svg" alt="icon 1" style={styles.icon1} />
        </button>
        <button style={styles.iconButton} onClick={() => navigate('/settings')}>
          <img src="/settings.png" alt="icon 2" style={styles.icon2} />
        </button>
        <button style={styles.iconButton} onClick={() => navigate('/mypage')}>
          <img src="/person.svg" alt="icon 3" style={styles.icon3} />
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
    backgroundColor: '#F8F8F8',
    zIndex: 1000,
    boxSizing: 'border-box',
  },
  logoText: {
    fontSize: '30px',  
    fontWeight: 'bold', 
    color: '#0047B1',
    fontFamily: '"Shrikhand", serif',
    marginRight: '20px', 
    flex: 1, 
    marginLeft: '10px',
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
  icon3: {
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
