import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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
  const [sessionId, setSessionId] = useState(null);
  const [newChat, setNewChat] = useState(false);

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

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { direction: 'incoming', content: aiMessage },
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
        setSessionId(parseInt(predefinedHistory[0].sessionId, 10));
        setNewChat(false);
      }
    }
  }, [predefinedHistory]);

  useEffect(() => {
    const fetchSessionInfo = async () => {
      if (!loginId) return;

      try {
        const res = await api.get(`/ai/chat/history/${loginId}`);
        const data = res.data;

        const newChats = data.filter((item) => item.newChat === true);
        const sorted = newChats.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        if (sorted.length > 0) {
          const latestSession = parseInt(sorted[0].sessionId, 10);
          setSessionId(latestSession + 1);
        } else {
          setSessionId(1);
        }

        setNewChat(true);
      } catch (err) {
        console.error('세션 정보 로딩 실패:', err);
      }
    };

    if (initialQuestion && predefinedHistory.length === 0 && loginId) {
      fetchSessionInfo();
    }
  }, [initialQuestion, loginId, predefinedHistory]);

  useEffect(() => {
    if (
      initialQuestion &&
      loginId &&
      !hasSentInitial.current &&
      newChat &&
      sessionId !== null
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
          sessionId,
          newChat: true,
        })
        .then((response) => {
          const aiMessage = response.data?.reply || 'AI 응답이 없습니다.';
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

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <MainContainer
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <ChatContainer
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <MessageList style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
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
};

export default ChatUI;
