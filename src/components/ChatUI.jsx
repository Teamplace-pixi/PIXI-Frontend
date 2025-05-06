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
          {/* 채팅 내용은 위쪽 공간을 꽉 채우고, 많아지면 스크롤 */}
          <MessageList style={{ flex: 1, overflowY: 'auto' }}>
            <Message
              model={{
                direction: 'incoming',
                type: 'custom',
              }}
            >
              <Avatar src={AVATAR_IMAGE} name="Akane" />
              <Message.CustomContent>
                <strong>This is strong text</strong>
                <br />
                Message content is provided as{' '}
                <span style={{ color: 'red' }}>custom elements</span> from child{' '}
                <strong>Message.CustomContent</strong> element
              </Message.CustomContent>
            </Message>
            <Message
              model={{
                message: 'Hello my friend',
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
                    <strong>This is strong text</strong>
                    <br />
                    Message content is provided as{' '}
                    <span style={{ color: 'red' }}>custom elements</span> from
                    payload property
                  </Message.CustomContent>
                ),
              }}
            >
              <Avatar src={AVATAR_IMAGE} name="Joe" />
            </Message>
          </MessageList>

          {/* 입력창은 항상 하단에 고정 */}
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatUI;
