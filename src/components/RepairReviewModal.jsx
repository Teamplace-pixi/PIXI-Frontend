import React, { useState } from 'react';

export default function RepairReviewModal({ onClose }) {
  const [cost, setCost] = useState('');
  const [duration, setDuration] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalContainer}>
          <div style={styles.header}>
            <h3 style={styles.title}>수리 후기 작성</h3>
            <button onClick={onClose} style={styles.closeBtn}>✕</button>
          </div>

          <div style={styles.inputGroup}>
            <label>별점 평가</label>
            <div style={styles.stars}>
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  onClick={() => handleStarClick(i)}
                  style={{
                    cursor: 'pointer',
                    fontSize: '24px',
                    color: i <= rating ? '#FFD700' : '#CCC',
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label>최종 수리비</label>
            <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="수리비 입력" style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label>작업 소요일</label>
            <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="예: 3일" style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label>간단한 후기</label>
            <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="후기를 입력해주세요" style={styles.textarea} />
          </div>

          <button style={styles.primaryButton} onClick={() => alert('후기 제출 완료!')}>
            후기 제출
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    maxWidth: '400px',
    padding: '0 20px',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '24px',
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
  stars: {
    display: 'flex',
    gap: '4px',
  },
  primaryButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '999px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    marginTop: '12px',
    cursor: 'pointer',
  },
};
