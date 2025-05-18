import React, { useState, useEffect } from 'react';
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
  const [messages, setMessages] = useState([
    {
      direction: 'incoming',
      content: '안녕하세요! 무엇을 도와드릴까요?',
    },
  ]);
  const [datas, setDatas] = useState([]);
  const [loginId, setLoginId] = useState('');

  const handleSend = async (userMessage) => {
    if (!userMessage.trim()) return;

    // 사용자 메시지 추가
    setMessages((prev) => [
      ...prev,
      { direction: 'outgoing', content: userMessage },
      { direction: 'incoming', content: '입력 중...' },
    ]);

    try {
      console.log('📌 loginId:', loginId);
      const response = await apiAI.post('/ai/chat', {
        user_id: loginId, // 필요에 따라 변경
        message: userMessage,
      });

      const aiMessage = response.data?.reply || 'AI 응답이 없습니다.';
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

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <MainContainer
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <ChatContainer
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <MessageList style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
            {/* 챗봇 메시지 */}
            {messages.map((msg, idx) => (
              <Message
                key={idx}
                model={{
                  direction: msg.direction,
                  type: 'custom',
                }}
              >
                <Message.CustomContent>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    {msg.direction === 'incoming' && (
                      <Avatar
                        src={AVATAR_IMAGE}
                        name="FIXI"
                        style={{ marginBottom: '4px' }}
                      />
                    )}

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
                  </div>
                </Message.CustomContent>
              </Message>
            ))}

            {/* 사용자 메시지 */}
            <Message
              model={{
                message: '아이폰 배터리 교체하는 법 알려줘',
                sentTime: 'just now',
                direction: 'outgoing',
                position: 'first',
              }}
            >
              <Message.CustomContent>
                <div style={styles.userBubble}>
                  아이폰 배터리 교체하는 법 알려줘
                </div>
              </Message.CustomContent>
            </Message>
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
    backgroundColor: '#F8F8F8',
    borderRadius: '20px',
    padding: '12px 16px',
    maxWidth: '80%',
    color: '#000000',
    fontSize: '15px',
    marginLeft: '8px',
    border: '1px solid #E3E3E3',
  },
  botName: {
    fontWeight: 'bold',
    color: '#3478F6',
    marginBottom: '6px',
  },
  userBubble: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    borderRadius: '20px',
    padding: '12px 16px',
    maxWidth: '80%',
    alignSelf: 'flex-end',
    marginRight: '8px',
    fontSize: '15px',
    border: '1px solid #E3E3E3',
  },
  input: {
    borderTop: '1px solid #ccc',
    padding: '8px',
  },
};

export default ChatUI;
