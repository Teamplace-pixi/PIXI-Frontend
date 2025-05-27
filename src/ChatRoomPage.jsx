import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import RepairSupportModal from './components/RepairSupportModal';

export default function ChatRoom() {
  const [showModal, setShowModal] = useState(false);
  const [showRepairStartBox, setShowRepairStartBox] = useState(true); // ← 추가

  return (
    <div style={styles.page}>
      <Header title="FIX Finder" />

      {showModal && <div style={styles.overlay} />}

      <div style={{ ...styles.container, filter: showModal ? 'blur(2px)' : 'none' }}>
        <div style={styles.chatBoxLeft}>
          <p style={styles.label}>[ 수리 지원 ]</p>
          <p>아이폰 후면 수리 가능하신 분?</p>
          <button style={styles.button} onClick={() => setShowModal(true)}>
            내용 확인하기
          </button>
        </div>

        <div style={styles.chatBoxRight}>
          <p>당장 수리합시다!</p>
        </div>

        {/* [수리 시작] 박스는 조건부로 렌더링 */}
        {showRepairStartBox && (
          <div style={styles.chatBoxLeft}>
            <p style={styles.label}>[ 수리 시작 ]</p>
            <p>아이폰 후면 수리 가능하신 분?</p>
          </div>
        )}

        <div style={styles.chatBoxLeft}>
          <p style={styles.label}>[ 수리 완료 ]</p>
          <p>아이폰 후면 수리 가능하신 분?</p>
        </div>
      </div>

      <BottomNav />

      {/* 모달에 onStartRepair 전달 */}
      {showModal && (
        <RepairSupportModal
          onClose={() => setShowModal(false)}
          onStartRepair={() => {
            setShowRepairStartBox(false); // ← [수리 시작] 박스 제거
            setShowModal(false);         // 모달 닫기
          }}
        />
      )}
    </div>
  );
}

const styles = {
  page: {
    position: 'relative',
    backgroundColor: '#fff',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 9,
  },
  container: {
    paddingTop: '80px',
    paddingBottom: '70px',
    paddingLeft: '16px',
    paddingRight: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'filter 0.3s ease',
  },
  chatBoxLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderRadius: '16px',
    padding: '12px',
    maxWidth: '70%',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  chatBoxRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#ffffff',
    border: '1px solid #ccc',
    borderRadius: '16px',
    padding: '12px',
    maxWidth: '70%',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '13px',
    marginBottom: '4px',
    color: '#007bff',
  },
  button: {
    marginTop: '8px',
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};
