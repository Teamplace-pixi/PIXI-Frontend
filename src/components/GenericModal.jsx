import React from 'react';

export default function GenericModal({ title, children, onClose }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modalContainer}>
        <div style={styles.header}>
          <h3 style={styles.title}>{title}</h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

// GenericModal.jsx

const styles = {
    overlay: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)', // 배경 흐리게
      zIndex: 9,
    },
    modalContainer: {
      position: 'fixed',
      top: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '400px',
      backgroundColor: '#fff',
      borderRadius: '20px',
      padding: '24px',
      zIndex: 10,
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    closeBtn: {
      fontSize: '18px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
  };
  
