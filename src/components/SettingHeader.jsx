import React from 'react';
// useNavigate 훅을 가져와야 이전 페이지로 이동할 수 있어!
import { useNavigate } from 'react-router-dom';

function SettingHeader({ title = '사업자 정보 기입'}) {
  // useNavigate 훅을 호출해서 navigate 함수를 사용 준비!
  const navigate = useNavigate();

  return (
    <div style={styles.header}>
      {/* 이 버튼을 클릭하면 전화면으로 돌아가게 할 거야! */}
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        <img src="backIcon.png" alt="back" style={styles.backIcon} />
      </button>
      <span style={styles.title}>{title}</span>
    </div>
  );
}

const styles = {
  header: {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    zIndex: 1000,
    padding: 0,
    margin: 0,
  },
  backButton: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    padding: '8px',
    cursor: 'pointer',
  },
  backIcon: {
    width: '24px',
    height: '24px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#000',
  },
};


export default SettingHeader;
