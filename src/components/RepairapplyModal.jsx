// RepairapplyModal.jsx

import React from 'react';

export default function RepairapplyModal({ onClose }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* 상단 헤더 */}
        <div style={styles.header}>
          <h2 style={styles.title}>수리 지원하기</h2>
          <p style={styles.subTitle}>지원을 위해 아래 폼을 작성해 주세요!</p>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* 입력 영역 */}
        <div style={styles.formGroup}>
          <label style={styles.label}>수리 가능한 예상 금액</label>
          <div style={styles.inputBox}>
            <span style={styles.icon}>💰</span>
            <input
              type="text"
              placeholder="수리 가능한 금액을 알려주세요"
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>예상 작업 소요일</label>
          <div style={styles.inputBox}>
            <span style={styles.icon}>🕒</span>
            <input
              type="text"
              placeholder="수리에 필요한 작업 날짜를 알려주세요"
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>간단한 소개 문구</label>
          <textarea
            placeholder="모집자에게 전달할 간단한 지원 문구를 작성해 주세요"
            style={styles.textarea}
          />
        </div>

        {/* 지원하기 버튼 */}
        <button style={styles.submitBtn}>지원하기</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    width: '90%',
    maxWidth: '400px',
    padding: '24px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    position: 'relative',
    animation: 'slideUp 0.3s ease-out',
  },
  header: {
    marginBottom: '20px',
    position: 'relative',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: '13px',
    color: '#666',
    marginTop: '4px',
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    fontSize: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '6px',
    display: 'block',
  },
  inputBox: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #eee',
    borderRadius: '12px',
    padding: '10px',
  },
  icon: {
    marginRight: '8px',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    border: '1px solid #eee',
    borderRadius: '12px',
    padding: '10px',
    minHeight: '100px',
    resize: 'none',
    fontSize: '14px',
    outline: 'none',
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '14px',
    border: 'none',
    borderRadius: '999px',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '12px',
    cursor: 'pointer',
  },
};
