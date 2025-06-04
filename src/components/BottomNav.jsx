import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: '홈', path: '/home', icon: '/navhome.svg' },
    { label: 'AI챗봇', path: '/aichatmain', icon: '/navai1.svg' },
    { label: 'AI견적', path: '/ai', icon: '/navai2.svg' },
    { label: '마이페이지', path: '/mypage', icon: '/navmy.svg' },
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
        padding: '6px 0', // 👈 더 얇은 패딩
        zIndex: 100,
      }}
    >
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '10px', // 👈 글자 크기 줄임
              color: isActive ? '#1A4EC0' : '#666',
              fontWeight: isActive ? '600' : '400',
              background: 'none',
              border: 'none',
              outline: 'none',
              padding: 0,
            }}
          >
            <img
              src={tab.icon}
              alt={tab.label}
              style={{
                width: 20, // 👈 아이콘 크기 줄임
                height: 20,
                marginBottom: 2,
                filter: isActive ? 'none' : 'grayscale(100%) opacity(0.6)',
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
