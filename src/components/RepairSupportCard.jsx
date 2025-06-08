// components/RepairSupportCard.jsx
import React from 'react';

export default function RepairSupportCard({ title, content, onClick }) {
  return (
    <div style={styles.card}>
      <p style={styles.title}>[{title}]</p>
      <p style={styles.content}>{content}</p>
      <button onClick={onClick} style={styles.button}>
        내용 확인하기
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '12px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '6px',
  },
  content: {
    fontSize: '16px',
    marginBottom: '12px',
  },
  button: {
    padding: '8px 12px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
