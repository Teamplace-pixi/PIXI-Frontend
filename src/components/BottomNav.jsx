import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GenericModal from './GenericModal'; // 모달 경로 맞게 수정해 주세요

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  // 예시: 구독 여부 (나중에 실제 사용자 정보로 바꾸면 됨)
  const isSubscribed = false;

  const handleTabClick = (path) => {
    if (path === '/ai') {
      if (isSubscribed) {
        navigate('/ai');
      } else {
        setShowModal(true);
      }
    } else {
      navigate(path);
    }
  };

  const tabs = [
    { label: '홈', path: '/home', iconActive: '/navhome-active.svg', iconInactive: '/navhome.svg' },
    { label: 'AI챗봇', path: '/aichatmain', iconActive: '/navai1-active.svg', iconInactive: '/navai1.svg' },
    { label: 'AI견적', path: '/ai', iconActive: '/navai2-active.svg', iconInactive: '/navai2.svg' },
    { label: '마이페이지', path: '/mypage', iconActive: '/navmy-active.svg', iconInactive: '/navmy.svg' },
  ];

  return (
    <>
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

      {showModal && (
        <GenericModal
        title="아직 구독을 안하셨네요?"
        onClose={() => setShowModal(false)}
      >
        
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <img
            src="subscribe-info-image.png" 
            alt="구독 안내 이미지"
            style={{ width: '250px', height: '202.2px' }} 
          />
        </div>
    
        <p>월 2900원으로 AI견적을 포함한 다양한 기능을 이용해보세요!</p>
    
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#006FFF',
              color: '#fff',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
            }}
            onClick={() => {
              setShowModal(false);
              navigate('/subscribe');
            }}
          >
            구독하러 가기
          </button>
        </div>
      </GenericModal>
      )}
    </>
  );
};

export default BottomNav;
