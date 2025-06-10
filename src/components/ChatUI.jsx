import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import apiAI from '../apiAI';
import api from '../api';
import './ChatUI.css';

const AVATAR_IMAGE = 'FIXIicon.png';

const ChatUI = ({ predefinedHistory = [] }) => {
  const location = useLocation();
  const initialQuestion = location.state?.initialQuestion || '';

  const [messages, setMessages] = useState([]);
  const [datas, setDatas] = useState([]);
  const [loginId, setLoginId] = useState('');
  const hasSentInitial = useRef(false);
  const [sessionId, setSessionId] = useState('');
  const [newChat, setNewChat] = useState(false);

  const navigate = useNavigate();

  const sessionPairsRef = useRef([]);

  const handleSend = async (userMessage) => {
    if (!userMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      { direction: 'outgoing', content: userMessage },
      { direction: 'incoming', content: '입력 중...' },
    ]);

    try {
      const response = await api.post('/ai/chat', {
        login_id: loginId,
        message: userMessage,
        sessionId,
        newChat,
      });

      const aiMessage = response.data?.reply || 'AI 응답이 없습니다.';
      const newSessionId = response.data?.sessionId;
      const isRecommend = response.data?.recommend || false;

      // 응답으로 받은 sessionId가 있으면 업데이트
      if (newSessionId) {
        setSessionId(newSessionId);
      }

      console.log('메세지 주고 받음: ', sessionId, newChat);

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { direction: 'incoming', content: aiMessage, recommend: isRecommend },
      ]);

      if (newChat) setNewChat(false);
    } catch (error) {
      console.error('AI 응답 오류:', error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          direction: 'incoming',
          content: '오류가 발생했습니다. 다시 시도해주세요.',
        },
      ]);
    }
  };

  useEffect(() => {
    const fetchMyPage = async () => {
      try {
        const response = await api.get('/myPage/edit');
        setDatas(response.data);
        setLoginId(response.data.loginId);
      } catch (error) {
        console.error('마이페이지 불러오기 실패:', error);
      }
    };

    fetchMyPage();
  }, []);

  useEffect(() => {
    if (predefinedHistory.length > 0) {
      const loaded = predefinedHistory.map((msg) => ({
        direction: msg.user ? 'outgoing' : 'incoming',
        content: msg.content,
      }));
      setMessages(loaded);

      if (predefinedHistory[0]?.sessionId) {
        setSessionId(predefinedHistory[0].sessionId);
        setNewChat(false);
      }
    }
  }, [predefinedHistory]);

  useEffect(() => {
    if (
      initialQuestion &&
      loginId &&
      !hasSentInitial.current &&
      predefinedHistory.length === 0
    ) {
      hasSentInitial.current = true;
      setMessages((prev) => [
        ...prev,
        { direction: 'outgoing', content: initialQuestion },
        { direction: 'incoming', content: '입력 중...' },
      ]);

      api
        .post('/ai/chat', {
          login_id: loginId,
          message: initialQuestion,
          sessionId: '',
          newChat: true,
        })
        .then((response) => {
          const aiMessage = response.data?.reply || 'AI 응답이 없습니다.';
          const newSessionId = response.data?.sessionId;

          // 응답으로 받은 sessionId 저장
          if (newSessionId) {
            setSessionId(newSessionId);
          }
          console.log('메세지 주고 받음: ', sessionId, newChat);

          setMessages((prev) => [
            ...prev.slice(0, -1),
            { direction: 'incoming', content: aiMessage },
          ]);
          setNewChat(false);
        })
        .catch((error) => {
          console.error('초기 질문 전송 오류:', error);
          setMessages((prev) => [
            ...prev.slice(0, -1),
            {
              direction: 'incoming',
              content: '오류가 발생했습니다. 다시 시도해주세요.',
            },
          ]);
        });
    }
  }, [initialQuestion, loginId, sessionId, newChat]);

  // sessionId 저장 및 localStorage 저장
  useEffect(() => {
    if (loginId && sessionId) {
      const exists = sessionPairsRef.current.some(
        (p) => p.loginId === loginId && p.sessionId === sessionId
      );
      if (!exists && sessionId.length > 10) {
        const newPair = { loginId, sessionId };
        sessionPairsRef.current.push(newPair);
        console.log('세션 저장됨:', newPair);

        // 🔽 localStorage 업데이트
        const storedPairs = JSON.parse(
          localStorage.getItem('sessionPairs') || '[]'
        );
        const isAlreadyStored = storedPairs.some(
          (p) => p.loginId === loginId && p.sessionId === sessionId
        );
        if (!isAlreadyStored) {
          const updatedPairs = [...storedPairs, newPair];
          localStorage.setItem('sessionPairs', JSON.stringify(updatedPairs));
          console.log('로컬스토리지 저장됨:', updatedPairs);
        }
      }
    }
  }, [loginId, sessionId]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <MainContainer
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <ChatContainer
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <MessageList
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              paddingBottom: '60px',
            }}
          >
            {messages.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  color: '#888',
                  marginTop: '2rem',
                }}
              >
                채팅 내역이 없습니다
              </div>
            ) : (
              messages.map((msg, idx) => (
                <Message
                  key={idx}
                  model={{
                    direction: msg.direction,
                    type: 'custom',
                  }}
                >
                  {msg.direction === 'incoming' && (
                    <Avatar src={AVATAR_IMAGE} name="FIXI" />
                  )}
                  <Message.CustomContent>
                    <div
                      style={
                        msg.direction === 'incoming'
                          ? styles.botBubble
                          : styles.userBubble
                      }
                    >
                      {msg.direction === 'incoming' && (
                        <div style={styles.botName}>FIXI</div>
                      )}
                      <div>{msg.content}</div>

                      {msg.recommend && (
                        <button
                          style={styles.recommendButton}
                          onClick={() => navigate('/new-post/')}
                        >
                          수리기사를 구해요!
                        </button>
                      )}
                    </div>
                  </Message.CustomContent>
                </Message>
              ))
            )}
          </MessageList>

          <MessageInput
            placeholder="질문을 입력하세요..."
            style={styles.input}
            onSend={handleSend}
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

const styles = {
  botBubble: {
    backgroundColor: '#F1F2F6',
    borderRadius: '16px',
    padding: '12px 16px',
    maxWidth: '80%',
    color: '#000',
    fontSize: '15px',
    marginLeft: '8px',
  },
  botName: {
    fontWeight: 'bold',
    color: '#3478F6',
    marginBottom: '6px',
  },
  userBubble: {
    backgroundColor: '#3478F6',
    color: '#fff',
    borderRadius: '16px',
    padding: '12px 16px',
    maxWidth: '80%',
    alignSelf: 'flex-end',
    marginRight: '8px',
    fontSize: '15px',
  },
  input: {
    borderTop: '1px solid #ccc',
    padding: '8px',
  },
  recommendButton: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default ChatUI;
