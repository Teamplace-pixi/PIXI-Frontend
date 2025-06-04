import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import RepairSupportModal from './components/RepairSupportModal';
import { useParams } from 'react-router-dom';
import api from './api';

// currentUserId는 실제 로그인된 사용자 ID로 바꿔야 합니다.
const currentUserId = 1;

export default function ChatRoom() {
  const { roomId } = useParams();
  const [chatHistory, setChatHistory] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [repairStarted, setRepairStarted] = useState(false);
  const [repairCompleted, setRepairCompleted] = useState(false);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch(
        `/matchChat/room/${roomId}?userId=${currentUserId}`
      );
      const data = await response.json();
      setChatHistory(data.chathistory);
      setReceiverId(data.rcvId);
    } catch (err) {
      console.error('채팅 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, [roomId]);

  const handleSend = async () => {
    if (inputText.trim() === '') return;
    try {
      const response = await fetch('/matchChat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: Number(roomId),
          message: inputText,
          senderId: currentUserId,
          receiverId: receiverId,
        }),
      });
      if (response.ok) {
        setInputText('');
        fetchChatHistory();
      } else {
        console.error('메시지 전송 실패');
      }
    } catch (error) {
      console.error('전송 중 오류:', error);
    }
  };

  const renderMessage = (msg, index) => {
    const isMine = msg.senderId === currentUserId;
    return (
      <div
        key={index}
        style={isMine ? styles.chatBoxRight : styles.chatBoxLeft}
      >
        <span
          style={isMine ? styles.chatBoxRightAfter : styles.chatBoxLeftAfter}
        />
        {msg.msgType?.includes('시작') && (
          <p style={styles.label}>[ 수리 시작 ]</p>
        )}
        {msg.msgType?.includes('완료') && (
          <p style={styles.label}>[ 수리 완료 ]</p>
        )}
        <p>{msg.content}</p>
      </div>
    );
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
        {chatHistory.map((msg, idx) => renderMessage(msg, idx))}
      </div>

      {/* 입력창 */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={styles.input}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} style={styles.sendButton}>
          전송
        </button>
      </div>

      <BottomNav />

      {showModal && (
        <RepairSupportModal
          onClose={() => setShowModal(false)}
          onStartRepair={() => {
            setRepairStarted(true);
            setShowModal(false);
          }}
          onCompleteRepair={() => {
            setRepairCompleted(true);
            setShowModal(false);
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
  label: {
    fontWeight: 'bold',
    fontSize: '13px',
    marginBottom: '4px',
    color: '#007bff',
  },
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
