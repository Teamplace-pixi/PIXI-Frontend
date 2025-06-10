import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatUI from './components/ChatUI';
import BottomNav from './components/BottomNav';
import ChatHistorySidebar from './components/ChatHistorySidebar';
import api from './api';
import apiAI from './apiAI';
import { useLocation } from 'react-router-dom';

function AIChat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const [histories, setHistories] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState([]);
  const location = useLocation();
  const initialQuestion = location.state?.initialQuestion || '';

  const [loginId, setLoginId] = useState('');
  // 유저 정보 가져오기
  useEffect(() => {
    const fetchLoginId = async () => {
      try {
        const response = await api.get('/myPage/edit');
        setLoginId(response.data.loginId);
        console.log(loginId);
      } catch (error) {
        console.error('유저 정보 로딩 실패:', error);
      }
    };

    fetchLoginId();
  }, []);

  // 히스토리 요약용 (사이드바)
  useEffect(() => {
    const fetchHistories = async () => {
      if (!sidebarOpen || !loginId) return;

      try {
        // 저장된 세션 ID 리스트 불러오기
        const sessionPairs =
          JSON.parse(localStorage.getItem('sessionPairs')) || [];

        const userSessions = sessionPairs.filter(
          (pair) => pair.loginId === loginId
        );

        const historyPromises = userSessions.map((pair) =>
          api.get(`/ai/chat/history/${pair.loginId}/${pair.sessionId}`)
        );

        const results = await Promise.all(historyPromises);

        const allHistories = results.map((res, index) => {
          const sessionId = userSessions[index].sessionId;
          const messages = res.data;

          // 가장 timestamp가 이른 메시지를 제목으로 사용
          const sorted = [...messages].sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );
          const summaryText =
            sorted.length > 0
              ? sorted[0].content.slice(0, 15) +
                (sorted[0].content.length > 15 ? '...' : '')
              : '(대화 없음)';

          return {
            sessionId,
            summary: summaryText,
            messages: sorted,
          };
        });

        setHistories(allHistories);
      } catch (err) {
        console.error('히스토리 불러오기 실패:', err);
      }
    };

    fetchHistories();
  }, [sidebarOpen, loginId]);

  const handleSelect = (history) => {
    setSelectedHistory(history.messages);
    setSidebarOpen(false);
  };

  return (
    <div style={styles.container}>
      <ChatHistorySidebar
        histories={histories}
        onSelect={handleSelect}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Header title="AI Chat" />

      {!sidebarOpen && (
        <div
          style={styles.tooltipWrapper}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <button
            style={styles.openSidebarBtn}
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          {hover && <div style={styles.tooltip}>사이드바 열기</div>}
        </div>
      )}

      <div style={{ ...styles.mainContent, marginLeft: sidebarOpen ? 280 : 0 }}>
        <div style={styles.chatBoxWrapper}>
          <ChatUI predefinedHistory={selectedHistory} />
        </div>
      </div>

      <div style={styles.bottomNavWrapper}>
        <BottomNav />
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '60px',
    paddingBottom: '60px',
  },
  tooltipWrapper: {
    position: 'fixed',
    top: 70,
    left: 10,
    zIndex: 30,
  },
  openSidebarBtn: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '18px',
  },
  tooltip: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginTop: 6,
    padding: '4px 8px',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 12,
    borderRadius: 4,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    userSelect: 'none',
  },
  mainContent: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    transition: 'margin-left 0.3s ease',
  },
  chatBoxWrapper: {
    flex: 1, // ✅ 높이 차지
    overflowY: 'auto', // ✅ 메시지 내역만 스크롤되도록
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    paddingBottom: '108px', // ✅ 입력창+네비게이션 높이만큼 여유 공간
  },
  bottomNavWrapper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
    zIndex: 10,
  },
};

export default AIChat;
