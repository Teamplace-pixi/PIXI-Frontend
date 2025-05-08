import React from 'react';

const path = [{ label: '핸드폰', name: '아이폰16 Pro' }];

const image = [{ alt: '아이폰16 Pro', src: '/iphone16Pro.png' }];

function DevicePath() {
  return (
    <div style={headerPath.container}>
      <div style={headerPath.path}>
        {path[0].label}&gt;{' '}
        <span style={{ color: '#1e40af', fontWeight: 'bold' }}>
          {path[0].name}
        </span>
        <div style={headerPath.item}>
          <img src={image[0].src} alt={image[0].alt} style={headerPath.icon} />
          <p style={headerPath.label}>{path[0].name}</p>
        </div>
      </div>
    </div>
  );
}

const headerPath = {
  container: {
    margin: '16px',
  },
  path: {
    fontSize: '14px',
    marginBottom: '16px',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '12px',
  },
  icon: {
    width: '120px',
    height: '120px',
    borderRadius: '16px',
  },
  label: {
    fontSize: '16px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

export default DevicePath;
