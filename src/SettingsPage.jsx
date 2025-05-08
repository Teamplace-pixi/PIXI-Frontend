import React from 'react';
import { useNavigate } from 'react-router-dom';
import SettingHeader from './components/SettingHeader';
import BottomNav from './components/BottomNav';

export default function SettingsPage() {
  const navigate = useNavigate();

  const menuItems = [
    { label: '이민서 회원님', sub: '회원정보 변경', onClick: () => navigate('/edit-profile') },
    { label: '알림', onClick: () => {} },
    { label: '결제', onClick: () => {} },
    { label: '앱 버전', onClick: () => {} },
    { divider: true },
    { label: '로그아웃', onClick: () => {} },
    { label: '회원탈퇴', onClick: () => {} },
  ];

  return (
    <div style={{ paddingTop: '60px' }}>
      <SettingHeader title="설정" />

      <div style={{ padding: '16px' }}>
        {menuItems.map((item, index) =>
          item.divider ? (
            <hr key={index} style={styles.divider} />
          ) : (
            <div
              key={index}
              onClick={item.onClick}
              style={{
                ...styles.menuItem,
                borderBottom: index === 0 ? '1px solid #f2f2f2' : 'none' // ✅ index가 0일 때만 borderBottom 적용!
              }}
            >
              <div>
                <div style={item.sub ? styles.menuItemLabelBold : styles.menuItemLabelNormal}>
                  {item.label}
                </div>
                {item.sub && (
                  <div style={styles.menuItemSub}>{item.sub}</div>
                )}
              </div>
              <button style={styles.arrowButton}>
                <img src="/Into.png" alt="바로가기" style={styles.arrowIcon} />
              </button>
            </div>
          )
        )}
      </div>
      <BottomNav />
    </div>
  );
}

const styles = {
  divider: {
    margin: '16px 0',
    borderColor: '#eee',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0',
    cursor: 'pointer',
  },
  menuItemLabelBold: {
    fontWeight: 'bold',
  },
  menuItemLabelNormal: {
    fontWeight: 'normal',
  },
  menuItemSub: {
    fontSize: '12px',
    color: '#888',
    marginTop: '4px',
  },
  arrowButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
  },
  arrowIcon: {
    width: '24px',
    height: '24px',
    display: 'block',
  },
};
