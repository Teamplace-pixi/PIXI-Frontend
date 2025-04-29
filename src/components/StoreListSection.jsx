import React from 'react';

const stores = [
  { logo: '/samsung.png', name: '삼성전자서비스 강서센터' },
  { logo: '/samsung.png', name: '삼성전자서비스 강서센터' },
  { logo: '/samsung.png', name: '삼성전자서비스 강서센터' },
];

function StoreListSection() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>숨은 맛집 리스트</h2>
      <div style={styles.list}>
        {stores.map((store, index) => (
          <div key={index} style={styles.item}>
            <img src={store.logo} alt="store" style={styles.logo} />
            <p style={styles.name}>{store.name}</p>
            <div style={styles.tags}>
              <span style={styles.tag}>강서시</span>
              <span style={styles.tag}>핸드폰</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  list: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
  },
  item: {
    flex: '0 0 auto',
    width: '150px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    padding: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  logo: {
    width: '100%',
    height: '80px',
    objectFit: 'contain',
    marginBottom: '8px',
  },
  name: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  tags: {
    display: 'flex',
    justifyContent: 'center',
    gap: '4px',
    flexWrap: 'wrap',
  },
  tag: {
    fontSize: '12px',
    padding: '2px 6px',
    backgroundColor: '#e0e0e0',
    borderRadius: '12px',
  },
};

export default StoreListSection;
