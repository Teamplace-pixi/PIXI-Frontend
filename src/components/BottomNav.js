import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: '홈', path: '/' },
    { label: '백과사전', path: '/wiki' },
    { label: '이슈체크', path: '/issue' },
    { label: 'AI견적', path: '/ai' },
    { label: '프로필', path: '/mypage' },
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
        padding: '10px 0',
        zIndex: 100,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.path}
          onClick={() => navigate(tab.path)}
          style={{
            fontSize: '12px',
            color: location.pathname === tab.path ? '#1A4EC0' : '#666',
            fontWeight: location.pathname === tab.path ? '600' : '400',
            background: 'none',
            border: 'none',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
