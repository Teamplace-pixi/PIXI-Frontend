import React from 'react';

const deviceTap = [
  { name: '부품 가격', index: 0 },
  { name: '수리센터', index: 1 },
  { name: '구해요', index: 2 },
];

function DeviceInfo() {
  return (
    <div style={styles.container}>
      {deviceTap.map((tab, index) => (
        <button
          key={index}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: tab.name === '부품 가격' ? 'none' : '1px solid #ccc',
            backgroundColor: tab.name === '부품 가격' ? '#2563eb' : '#fff',
            color: tab.name === '부품 가격' ? '#fff' : '#333',
            fontWeight: 'bold',
          }}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '24px',
  },
  buttons: {
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    color: '#333',
    fontWeight: 'bold',
  },
};

export default DeviceInfo;
