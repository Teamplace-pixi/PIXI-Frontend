import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import RepairSupportModal from './components/RepairSupportModal';
import { useLocation } from 'react-router-dom';
import api from './api';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export default function ChatRoom() {
  const location = useLocation();

  const roomId = location.state?.roomId;

  const [chatHistory, setChatHistory] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [repairStarted, setRepairStarted] = useState(false);
  const [repairCompleted, setRepairCompleted] = useState(false);
  const [id, setApplyId] = useState(null);

  const containerRef = useRef(null);
  const token = localStorage.getItem('token');
  const tokenWs = localStorage.getItem('tokenWs');

  const fetchChatHistory = async () => {
    try {
      const response = await api.get(`/matchChat/room/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const history = response.data.chathistory;

      // 예시: 최신 메시지가 맨 앞이면 뒤집어서 오래된 메시지가 앞에 오도록
      const orderedHistory =
        history[0]?.timestamp > history[history.length - 1]?.timestamp
          ? [...history].reverse()
          : history;

      setChatHistory(orderedHistory);
      setReceiverId(response.data.rcvId);
    } catch (err) {
      console.error('채팅 불러오기 실패:', err);
    }
  };

  const userId = parseInt(localStorage.getItem('userId'));

  useEffect(() => {
    fetchChatHistory();
    if (tokenWs) {
      connectStomp(tokenWs, (body) => {
        const parsed = JSON.parse(body);

        // 본인이 보낸 메시지인 경우 무시 (중복 방지)
        if (parseInt(parsed.senderId) === userId) return;

        const now = new Date().toISOString();
        const fixedMessage = {
          content: parsed.message,
          senderId: parsed.senderId,
          receiverId: parsed.receiverId,
          roomId: parsed.roomId,
          timestamp: now,
          msgType: '',
        };

        setChatHistory((prev) => [...prev, fixedMessage]);
      });
    }
  }, [roomId]);

  const handleSend = async () => {
    if (inputText.trim() === '' || !receiverId) return;

    const messageData = {
      roomId: roomId,
      message: inputText,
      receiverId: receiverId,
    };

    try {
      const response = await api.post('/matchChat/send', messageData);
      console.log('메시지 전송 응답:', response.data);
      setInputText('');

      const now = new Date().toISOString();

      const sentMessage = {
        ...response.data,
        content: inputText, // 직접 content 추가
        timestamp: now,
        msgType: '', // 메시지 타입이 없다면 빈 문자열
      };

      setChatHistory((prev) => [...prev, sentMessage]);
    } catch (error) {
      console.error('전송 중 오류:', error);
    }
  };

  const renderMessage = (msg, index) => {
    const isMine = msg.senderId !== receiverId;

    let parsed;
    try {
      parsed = JSON.parse(msg.content);
    } catch (e) {
      parsed = null;
    }

    const isRepairSupport =
      parsed &&
      parsed.applyId &&
      parsed.title &&
      parsed.boardTitle &&
      parsed.boardId;

    return (
      <div
        key={index}
        style={isMine ? styles.chatBoxRight : styles.chatBoxLeft}
      >
        <span
          style={isMine ? styles.chatBoxRightAfter : styles.chatBoxLeftAfter}
        />

        {/* 수리 시작 / 완료 라벨 */}
        {msg.msgType?.includes('시작') && (
          <p style={styles.label}>[ 수리 시작 ]</p>
        )}
        {msg.msgType?.includes('완료') && (
          <p style={styles.label}>[ 수리 완료 ]</p>
        )}

        {/* 📌 수리 지원 특수 메시지 렌더링 */}
        {isRepairSupport ? (
          <div>
            <p style={styles.label}>[ {parsed.title} ]</p>
            <p>{parsed.boardTitle}</p>
            <button
              style={styles.modalButton}
              onClick={() => {
                setApplyId(parsed.applyId);
                setShowModal(true);
              }}
            >
              내용 확인하기
            </button>
          </div>
        ) : (
          <p>{msg.content}</p>
        )}
      </div>
    );
  };

  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const connectStomp = (tokenWs, onMessage) => {
    const socket = new SockJS(`${baseURL}/ws?token=${tokenWs}`); // 백엔드에서 지정한 WebSocket endpoint
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: tokenWs,
      },
      debug: (str) => console.log('STOMP:', str),
      onConnect: () => {
        console.log('🟢 연결됨');
        client.subscribe(`/user/queue/messages.${roomId}`, (message) => {
          console.log('📩 메시지 수신:', message.body);
          onMessage(message.body);
        });
      },
      onStompError: (frame) => {
        console.error('❌ STOMP 오류', frame.headers['message']);
      },
    });

    client.activate();
    return client;
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div style={styles.page}>
      <Header title="FIX Finder" />
      {showModal && <div style={styles.overlay} />}

      <div
        ref={containerRef}
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
          applyId={id}
          onClose={() => setShowModal(false)}
          onStartRepair={async () => {
            try {
              // 모달 닫기
              setShowModal(false);
              setRepairStarted(true);

              // 먼저 해당 수리 지원 메시지를 찾아서 boardId, boardTitle 추출
              const repairMsg = chatHistory.find((msg) => {
                try {
                  const parsed = JSON.parse(msg.content);
                  return parsed && parsed.boardId && parsed.boardTitle;
                } catch {
                  return false;
                }
              });

              if (!repairMsg) {
                alert('수리 메시지를 찾을 수 없습니다.');
                return;
              }

              const parsed = JSON.parse(repairMsg.content);

              // 1️⃣ board 상태 변경 요청
              await api.put(`/board/board_id=${parsed.boardId}`, {
                status: '예약중',
                shopId: 0,
              });

              // 2️⃣ 채팅 메시지 전송
              const repairStartMessage = {
                roomId: roomId,
                message: `[수리 시작]\n${parsed.boardTitle}`,
                receiverId: receiverId,
              };

              const response = await api.post(
                '/matchChat/send',
                repairStartMessage
              );

              const now = new Date().toISOString();

              const sentMessage = {
                ...response.data,
                content: repairStartMessage.message,
                timestamp: now,
                msgType: '수리 시작',
              };

              setChatHistory((prev) => [...prev, sentMessage]);
            } catch (error) {
              console.error('수리 시작 처리 실패:', error);
              alert('수리 시작 중 오류가 발생했습니다.');
            }
          }}
          onCompleteRepair={async () => {
            try {
              setShowModal(false);
              setRepairCompleted(true);

              // 수리 지원 메시지에서 boardId, boardTitle 파싱
              const repairMsg = chatHistory.find((msg) => {
                try {
                  const parsed = JSON.parse(msg.content);
                  return parsed && parsed.boardId && parsed.boardTitle;
                } catch {
                  return false;
                }
              });

              if (!repairMsg) {
                alert('수리 메시지를 찾을 수 없습니다.');
                return;
              }

              const parsed = JSON.parse(repairMsg.content);

              // 1️⃣ board 상태를 '모집 완료'로 변경
              await api.put(`/board/board_id=${parsed.boardId}`, {
                status: '모집 완료',
                shopId: 0,
              });

              // 2️⃣ 채팅 메시지 전송
              const repairCompleteMessage = {
                roomId: roomId,
                message: `[수리 완료]\n${parsed.boardTitle}`,
                receiverId: receiverId,
              };

              const response = await api.post(
                '/matchChat/send',
                repairCompleteMessage
              );

              const now = new Date().toISOString();

              const sentMessage = {
                ...response.data,
                content: repairCompleteMessage.message,
                timestamp: now,
                msgType: '수리 완료',
              };

              setChatHistory((prev) => [...prev, sentMessage]);
            } catch (error) {
              console.error('수리 완료 처리 실패:', error);
              alert('수리 완료 중 오류가 발생했습니다.');
            }
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
  modalButton: {
    marginTop: '8px',
    padding: '6px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};
