import React from 'react';

function TalentSection() {
  const post = {
    title: '아이폰 후면 수리 가능하신 분?',
    price: '가능 금액 협의 가능',
    date: '필요 날짜 협의 가능',
    tags: ['애플', '핸드폰', '후면'],
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.header}>
        <h2 style={styles.title}>🛠️ 능력자를 찾습니다!</h2>
        <button style={styles.viewAll}>전체 보기 &gt;</button>
      </div>

      
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>{post.title}</h3>
        <div style={styles.meta}>
          <span>💰 {post.price}</span>
          <span>🕒 {post.date}</span>
        </div>
        <div style={styles.tags}>
          {post.tags.map((tag, idx) => (
            <button
              key={idx}
              style={{
                ...styles.tag,
                backgroundColor: idx === 0 ? '#1E40AF' : '#F3F4F6',
                color: idx === 0 ? '#fff' : '#000',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: '16px',
    marginBottom: '80px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  viewAll: {
    background: 'none',
    border: 'none',
    color: '#333',
    fontSize: '14px',
    cursor: 'pointer',
  },
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    padding: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  meta: {
    fontSize: '13px',
    color: '#6b7280',
    display: 'flex',
    gap: '16px',
    marginBottom: '12px',
  },
  tags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  tag: {
    padding: '6px 12px',
    fontSize: '13px',
    borderRadius: '999px',
    border: 'none',
  },
};

export default TalentSection;
