import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const baseURL = process.env.REACT_APP_API_BASE_URL;

function Header({ title = 'FIXI' }) {
  const navigate = useNavigate();
  const tokenWs = localStorage.getItem('tokenWs');

  useEffect(() => {
    connectStomp(tokenWs, (body) => {});
  }, [7]);

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
        client.subscribe(`/user/queue/alert`, (message) => {
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

  return (
    <div style={styles.header}>
      <span style={styles.logoText}>{title}</span>
      <div style={styles.buttonContainer}>
        <button style={styles.iconButton} onClick={() => navigate('/chatlist')}>
          <img src="/chat3.svg" alt="icon 1" style={styles.icon1} />
        </button>
        <button style={styles.iconButton} onClick={() => navigate('/settings')}>
          <img src="/settings.png" alt="icon 2" style={styles.icon2} />
        </button>
        <button style={styles.iconButton} onClick={() => navigate('/mypage')}>
          <img src="/person.svg" alt="icon 3" style={styles.icon3} />
        </button>
      </div>
    </div>
  );
}

const styles = {
  header: {
    width: '100%',
    height: '60px',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    backgroundColor: '#F8F8F8',
    zIndex: 1000,
    boxSizing: 'border-box',
  },
  logoText: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#0047B1',
    fontFamily: '"Shrikhand", serif',

    marginRight: '20px', 
    flex: 1, 
    marginLeft: '10px',

  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    background: 'transparent',
    border: 'none',
    marginLeft: '0px',
    cursor: 'pointer',
  },
  icon1: {
    width: '30px',
    height: '30px',
  },
  icon2: {
    width: '40px',
    height: '40px',
  },

  
  '@media (max-width: 768px)': {
    logoText: {
      fontSize: '24px',
    },
    icon: {
      width: '20px',
      height: '20px',
    },
  },
};

export default Header;
