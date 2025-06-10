import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (path) => {
    navigate(path);
  };

  const tabs = [
    { label: '홈', path: '/home', iconActive: '/navhome-active.svg', iconInactive: '/navhome.svg' },
    { label: 'AI챗봇', path: '/aichatmain', iconActive: '/navai1-active.svg', iconInactive: '/navai1.svg' },
    { label: 'AI견적', path: '/ai', iconActive: '/navai2-active.svg', iconInactive: '/navai2.svg' },
    { label: '마이페이지', path: '/mypage', iconActive: '/navmy-active.svg', iconInactive: '/navmy.svg' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        borderTop: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '6px 0',
        zIndex: 100,
      }}
    >
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => handleTabClick(tab.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '10px',
              color: isActive ? '#1A4EC0' : '#666',
              fontWeight: isActive ? '600' : '400',
              background: 'none',
              border: 'none',
              outline: 'none',
              padding: 0,
            }}
          >
            <img
              src={isActive ? tab.iconActive : tab.iconInactive}
              alt={tab.label}
              style={{
                width: 20,
                height: 20,
                marginBottom: 2,
              }}
            />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
