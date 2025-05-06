import React from 'react';
import Header from './components/Header';
import DevicePath from './components/DevicePath';
import DeviceInfo from './components/DeviceInfo';
import StoreListSection from './components/StoreListSection';
import BottomNav from './components/BottomNav';

function Finder() {
  const parts = [
    { name: '액정 교체', price: '420,000원' },
    { name: '배터리 교체', price: '188,000원' },
    { name: '후면 교체', price: '250,000원' },
  ];

  return (
    <div className="finder-container" style={styles.container}>
      <Header />
      <div className="main-content" style={styles.mainContent}>
        <DevicePath />
        <DeviceInfo />
        {/* Scrollable Part List */}
        <div
          style={{
            marginTop: '24px',
            maxHeight: '300px',
            overflowY: 'auto',
            paddingRight: '4px',
          }}
        >
          {parts.map((part, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ddd',
                borderRadius: '16px',
                padding: '12px',
                marginBottom: '12px',
                backgroundColor: '#fff',
              }}
            >
              {/* 이미지 대체 사각형 */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#ccc',
                  borderRadius: '12px',
                  marginRight: '12px',
                }}
              />
              {/* 텍스트 정보 */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  {part.name}
                </div>
                <div
                  style={{
                    color: '#2563eb',
                    fontSize: '14px',
                    marginTop: '4px',
                  }}
                >
                  {part.price}
                </div>
              </div>
              {/* 태그 (선택적) */}
              {part.tag && (
                <div
                  style={{
                    backgroundColor: '#f97316',
                    color: '#fff',
                    padding: '4px 8px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                  }}
                >
                  {part.tag}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    paddingTop: '60px',
    paddingBottom: '16px',
    backgroundColor: '#fff',
  },
  mainContent: {
    paddingBottom: '16px',
  },
};

export default Finder;
