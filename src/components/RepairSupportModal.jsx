import React from 'react';

export default function RepairSupportModal({ onClose }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modalContainer}>
        <div style={styles.header}>
          <h3 style={styles.title}>수리 지원 내용</h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        <div style={styles.centerInfo}>
          <img src="/samsung.png" alt="logo" style={styles.logo} />
          <div>
            <p style={styles.name}>삼성전자서비스 강서센터</p>
            <p style={styles.address}>공항대로 571 삼성스토어 강서 2층</p>
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label>수리 가능한 예상 금액</label>
          <input type="text" placeholder="수리 가능한 금액" style={styles.input} />
        </div>

        <div style={styles.inputGroup}>
          <label>예상 작업 소요일</label>
          <input type="text" placeholder="수리에 필요한 작업 날짜" style={styles.input} />
        </div>

        <div style={styles.inputGroup}>
          <label>간단한 소개 문구</label>
          <textarea placeholder="지원 문구" style={styles.textarea} />
        </div>

        <button style={styles.primaryButton}>수리 시작하기</button>
        <button style={styles.secondaryButton}>수리 완료하기</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // 흐리게
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
  centerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  logo: {
    width: '50px',
    height: '50px',
  },
  name: {
    fontWeight: 'bold',
    fontSize: '15px',
  },
  address: {
    fontSize: '13px',
    color: '#777',
  },
  inputGroup: {
    marginBottom: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  input: {
    padding: '10px',
    borderRadius: '12px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  textarea: {
    padding: '10px',
    borderRadius: '12px',
    border: '1px solid #ccc',
    minHeight: '80px',
    resize: 'none',
    outline: 'none',
  },
  primaryButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '999px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    marginTop: '8px',
    cursor: 'pointer',
  },
  secondaryButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '999px',
    backgroundColor: '#eee',
    color: '#444',
    fontWeight: 'bold',
    border: 'none',
    marginTop: '8px',
    cursor: 'pointer',
  },
};
