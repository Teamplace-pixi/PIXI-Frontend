import React from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

const AVATAR_IMAGE = 'FIXIicon.png';

const ChatUI = () => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <MainContainer style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ChatContainer style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <MessageList style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
            {/* 챗봇 메시지 */}
            <Message
              model={{
                direction: 'incoming',
                type: 'custom',
              }}
            >
              <Avatar src={AVATAR_IMAGE} name="FIXI" />
              <Message.CustomContent>
                <div style={styles.botBubble}>
                  <div style={styles.botName}>FIXI</div>
                  <div>안녕하세요! 무엇을 도와드릴까요?</div>
                </div>
              </Message.CustomContent>
            </Message>

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
                <div style={styles.userBubble}>아이폰 배터리 교체하는 법 알려줘</div>
              </Message.CustomContent>
            </Message>
          </MessageList>

          <MessageInput placeholder="질문을 입력하세요..." style={styles.input} />
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
