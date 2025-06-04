import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import RepairSupportModal from './components/RepairSupportModal';

export default function ChatRoom() {
  const [showModal, setShowModal] = useState(false);
  const [repairStarted, setRepairStarted] = useState(false);
  const [repairCompleted, setRepairCompleted] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleStartRepair = () => {
    setRepairStarted(true);
    setShowModal(false);
  };

  const handleCompleteRepair = () => {
    setRepairCompleted(true);
    setShowModal(false);
  };

  const handleSend = () => {
    if (inputText.trim() === '') return;
    console.log('보낼 메시지:', inputText);
    setInputText('');
  };

  return (
    <div style={styles.page}>
      <Header title="FIX Finder" />

      {showModal && <div style={styles.overlay} />}

      <div
        style={{
          ...styles.container,
          filter: showModal ? 'blur(2px)' : 'none',
        }}
      >
        {/* 최초 메시지 */}
        <div style={styles.chatBoxLeft}>
          <span style={styles.chatBoxLeftAfter} />
          <p style={styles.label}>[ 수리 지원 ]</p>
          <p>아이폰 후면 수리 가능하신 분?</p>
          <button style={styles.button} onClick={() => setShowModal(true)}>
            내용 확인하기
          </button>
        </div>

        {/* 사용자 응답 */}
        <div style={styles.chatBoxRight}>
          <span style={styles.chatBoxRightAfter} />
          <p>당장 수리합시다!</p>
        </div>

        {/* 수리 시작 메시지 */}
        {repairStarted && (
          <div style={styles.chatBoxRight}>
            <span style={styles.chatBoxRightAfter} />
            <p style={styles.label}>[ 수리 시작 ]</p>
            <p>아이폰 후면 수리 가능합니다!</p>
          </div>
        )}

        {/* 수리 완료 메시지 */}
        {repairCompleted && (
          <div style={styles.chatBoxLeft}>
            <span style={styles.chatBoxLeftAfter} />
            <p style={styles.label}>[ 수리 완료 ]</p>
            <p>수리 완료했습니다!</p>
          </div>
        )}
      </div>

      {/* 입력창 */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={styles.input}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button onClick={handleSend} style={styles.sendButton}>
          전송
        </button>
      </div>

      <BottomNav />

      {showModal && (
        <RepairSupportModal
          onClose={() => setShowModal(false)}
          onStartRepair={handleStartRepair}
          onCompleteRepair={handleCompleteRepair}
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    overflowY: 'auto',
    height: 'calc(100vh - 150px)',
  },
  chatBoxLeft: {
    position: 'relative',
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderRadius: '16px',
    padding: '12px',
    maxWidth: '70%',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  chatBoxRight: {
    position: 'relative',
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

  // 말풍선 꼬리 (왼쪽)
  chatBoxLeftAfter: {
    position: 'absolute',
    left: '-8px',
    top: '12px',
    width: 0,
    height: 0,
    borderTop: '8px solid transparent',
    borderRight: '8px solid #f0f0f0',
    borderBottom: '8px solid transparent',
  },

  // 말풍선 꼬리 (오른쪽)
  chatBoxRightAfter: {
    position: 'absolute',
    right: '-8px',
    top: '12px',
    width: 0,
    height: 0,
    borderTop: '8px solid transparent',
    borderLeft: '8px solid #fff',
    borderBottom: '8px solid transparent',
  },

  // 입력창 스타일
  inputContainer: {
    display: 'flex',
    padding: '10px 16px',
    borderTop: '1px solid #ddd',
    position: 'fixed',
    bottom: '40px',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    outline: 'none',
    marginRight: '8px',
  },
  sendButton: {
    padding: '10px 16px',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '20px',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};
