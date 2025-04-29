import React from 'react';


function Header() {
  return (
    <div style={styles.header}>
      <img src="/FIXIlogo.png" alt="FIXI Logo" style={styles.logo} />
      
      
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
  },
  logo: {
    height: '30px',
  },
  icons: {
    display: 'flex',
    gap: '16px',
  },
  icon: {
    cursor: 'pointer',
  },
};

export default Header;
