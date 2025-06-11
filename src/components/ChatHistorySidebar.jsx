import React from 'react';

export default function ChatHistorySidebar({ histories = [], onSelect, isOpen, onClose }) {
  if (!isOpen) return null; 

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <h3 style={styles.title}>채팅 히스토리</h3>
        <button onClick={onClose} style={styles.closeBtn}>✕</button>
      </div>
      <ul style={styles.list}>
        {histories.length === 0 && <li style={styles.empty}>저장된 대화가 없습니다.</li>}
        {histories.map((item, idx) => (
          <li key={idx} style={styles.item} onClick={() => onSelect(item)}>
            {item.summary || `대화 ${idx + 1}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    position: 'fixed',
    top: 60,
    left: 0,
    width: 280,
    height: 'calc(100vh - 60px)',
    backgroundColor: '#fff',
    borderRight: '1px solid #ddd',
    padding: '16px',
    overflowY: 'auto',
    boxSizing: 'border-box',
    zIndex: 20,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    margin: 0,
    fontWeight: 'bold',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
    borderRadius: 4,
  },
  empty: {
    color: '#888',
    fontStyle: 'italic',
  },
};
