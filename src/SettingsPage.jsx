import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingHeader from './components/SettingHeader';
import BottomNav from './components/BottomNav';
import GenericModal from './components/GenericModal';
import api from './api';

export default function SettingsPage() {
  const navigate = useNavigate();

  const [name, setNickname] = useState('');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // 로그아웃 모달 상태

  useEffect(() => {
    const fetchMyPage = async () => {
      try {
        const response = await api.get('/myPage/setup');
        setNickname(response.data.nickname);
      } catch (error) {
        console.error('마이페이지 불러오기 실패:', error);
      }
    };
    fetchMyPage();
  }, []);

  // 회원탈퇴 처리
  const handleWithdraw = async () => {
    try {
      await api.delete('/user/delete');
      alert('회원탈퇴가 완료되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
      alert('회원탈퇴 중 오류가 발생했습니다.');
    }
  };

  // 로그아웃 처리
  

  const handleLogout = async () => {
    localStorage.removeItem('token');
    navigate('/startlogin');
  };

  const menuItems = [
    {
      label: `${name} 회원님`,
      sub: '회원정보 변경',
      onClick: () => navigate('/edit-profile'),
    },
    { label: '결제', onClick: () => {} },
    { label: '구독 관리', onClick: () => navigate('/subscription') },
    { divider: true },
    {
      label: '로그아웃',
      onClick: () => setShowLogoutModal(true), // ✅ 모달 띄우기만
    },
    {
      label: '회원탈퇴',
      onClick: () => setShowWithdrawModal(true), // ✅ 기존처럼 모달 띄우기
    },
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
                borderBottom: index === 0 ? '1px solid #f2f2f2' : 'none',
              }}
            >
              <div>
                <div
                  style={
                    item.sub
                      ? styles.menuItemLabelBold
                      : styles.menuItemLabelNormal
                  }
                >
                  {item.label}
                </div>
                {item.sub && <div style={styles.menuItemSub}>{item.sub}</div>}
              </div>
              <button style={styles.arrowButton}>
                <img src="/Into.png" alt="바로가기" style={styles.arrowIcon} />
              </button>
            </div>
          )
        )}
      </div>

      {/* 회원탈퇴 모달 */}
      {showWithdrawModal && (
        <GenericModal
          title="정말 회원탈퇴 하시겠어요?"
          onClose={() => setShowWithdrawModal(false)}
        >
          <p style={{ margin: '12px 0' }}>탈퇴 후 모든 정보가 삭제됩니다.</p>
          <button
            onClick={handleWithdraw}
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '8px',
              borderRadius: '999px',
              backgroundColor: '#e53935',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            탈퇴하기
          </button>
        </GenericModal>
      )}

      {/* 로그아웃 모달 */}
      {showLogoutModal && (
        <GenericModal
          title="로그아웃 하시겠어요?"
          onClose={() => setShowLogoutModal(false)}
        >
          <p style={{ margin: '12px 0' }}>다시 로그인하셔야 이용 가능합니다.</p>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '8px',
              borderRadius: '999px',
              backgroundColor: '#333',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            로그아웃
          </button>
        </GenericModal>
      )}

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
