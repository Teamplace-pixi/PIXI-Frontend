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
import apiAI from '../apiAI'; // AI API 연동
import api from '../api'; // 마이페이지에서 프로필 id 받아오기 위함
import './ChatUI.css';

const AVATAR_IMAGE = 'FIXIicon.png';

const ChatUI = () => {
  const location = useLocation();
  const initialQuestion = location.state?.initialQuestion || '';

  const [messages, setMessages] = useState([]);
  const [datas, setDatas] = useState([]);
  const [loginId, setLoginId] = useState('');
  const hasSentInitial = useRef(false);

  const handleSend = async (userMessage) => {
    if (!userMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      { direction: 'outgoing', content: userMessage },
      { direction: 'incoming', content: '입력 중...' }, // 로딩 메시지
    ]);

    try {
      const response = await apiAI.post('/ai/chat', {
        user_id: loginId,
        message: userMessage,
      });

      const aiMessage = response.data?.reply || 'AI 응답이 없습니다.';

      // 마지막 "입력 중..." 메시지 제거하고 새 메시지 추가
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { direction: 'incoming', content: aiMessage },
      ]);
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
    if (initialQuestion && loginId && !hasSentInitial.current) {
      hasSentInitial.current = true; // 다시 실행되지 않도록 설정

      // 메시지 추가 및 전송
      setMessages((prev) => [
        ...prev,
        { direction: 'outgoing', content: initialQuestion },
        { direction: 'incoming', content: '입력 중...' },
      ]);

      apiAI
        .post('/ai/chat', {
          user_id: loginId,
          message: initialQuestion,
        })
        .then((response) => {
          const aiMessage = response.data?.reply || 'AI 응답이 없습니다.';
          setMessages((prev) => [
            ...prev.slice(0, -1),
            { direction: 'incoming', content: aiMessage },
          ]);
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
  }, [initialQuestion, loginId]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <MainContainer
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <ChatContainer
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <MessageList style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
            {messages.map((msg, idx) => (
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
            ))}
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
