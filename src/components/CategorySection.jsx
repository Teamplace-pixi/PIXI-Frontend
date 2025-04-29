import React from 'react';

const categories = [
  { icon: '/phone.png', label: '핸드폰' },
  { icon: '/laptop.png', label: '노트북' },
  { icon: '/tablet.png', label: '태블릿' },
  { icon: '/accessory.png', label: '액세서리' },
];

function CategorySection() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📖 카테고리로 검색하기</h2>
      <div style={styles.list}>
        {categories.map((item, index) => (
          <div key={index} style={styles.item}>
            <img src={item.icon} alt={item.label} style={styles.icon} />
            <p style={styles.label}>{item.label}</p>
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
    width: '64px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    width: '48px',
    height: '48px',
    marginBottom: '8px',
  },
  label: {
    fontSize: '14px',
    textAlign: 'center',
  },
};

export default CategorySection;
