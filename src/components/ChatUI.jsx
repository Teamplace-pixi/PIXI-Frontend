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
      <MainContainer
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <ChatContainer
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          
          <MessageList style={{ flex: 1, overflowY: 'auto' }}>
            <Message
              model={{
                direction: 'incoming',
                type: 'custom',
              }}
            >
              <Avatar src={AVATAR_IMAGE} name="Akane" />
              <Message.CustomContent>
                <strong>FIXI</strong>
                <br />
                안녕하세요? 저는 당신을 도와드릴{' '}
                <span style={{ color: 'blue' }}>AI 챗봇 FIXI</span> 입니다!{' '}
                <strong>뭐든지 물어보세요 !!</strong>
              </Message.CustomContent>
            </Message>
            <Message
              model={{
                message: '안녕 반가워',
                sentTime: '15 mins ago',
                direction: 'outgoing',
                position: 'first',
              }}
            />
            <Message
              model={{
                direction: 'incoming',
                payload: (
                  <Message.CustomContent>
                    <strong>FIXI</strong>
                    <br />
                    궁금한 것을 여쭤봐주세요{' '}
                    <span style={{ color: 'red' }}>뭐든지요!</span> 어떤 것을
                    알아봐드릴까요?
                  </Message.CustomContent>
                ),
              }}
            >
              <Avatar src={AVATAR_IMAGE} name="Joe" />
            </Message>
          </MessageList>

          
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatUI;
