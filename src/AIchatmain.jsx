import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';

export default function AIchatmain() {
  const [question, setQuestion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!question.trim()) return;
    console.log('AI에게 보낸 질문:', question);
    navigate('/aichat', { state: { initialQuestion: question } });
  };

  const handleGoToHistory = () => {
    navigate('/aichat'); // initialQuestion 없이 history mode로 이동
  };

  return (
    <>
      <div style={styles.container}>
        {/* 캐릭터 이미지 */}
        <div style={styles.imageContainer}>
          <img
            src="/AIChatgif.gif"
            alt="AI 캐릭터"
            style={{ width: '180px', height: '180px' }}
          />
        </div>

        {/* 질문 타이틀 */}
        <h2 style={styles.title}>무엇을 도와드릴까요?</h2>

        {/* 입력창 */}
        <div style={styles.inputBox}>
          <textarea
            placeholder="ex)아이폰 16프로 배터리 교체하는 방법을 알려줘!"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={styles.textarea}
          />
          <button onClick={handleSubmit} style={styles.sendButton}>
            <img
              src="/AIchatgo.png"
              alt="보내기"
              style={{ width: '20px', height: '20px' }}
            />
          </button>
        </div>

        {/* 안내 문구 */}
        <div style={styles.notice}>
          <span style={{ color: '#F59E0B', marginRight: '6px' }}>⚠️</span>
          FIXI가 정확한 수리가이드를 제시할 수 있도록 전자기기에 대한 명확하고
          자세한 설명을 바탕으로 질문해주세요!
        </div>

        {/* 기록 보기 버튼 */}
        <button style={styles.historyButton} onClick={handleGoToHistory}>
          📜 기록 보기
        </button>
      </div>
      <BottomNav />
    </>
  );
}

const styles = {
  container: {
    padding: '24px',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    paddingBottom: '80px', // BottomNav 높이 고려
    position: 'relative',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '24px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '24px 0 16px',
  },
  inputBox: {
    position: 'relative',
    margin: '0 auto',
    maxWidth: '360px',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '16px',
    fontSize: '14px',
    borderRadius: '16px',
    border: '1px solid #ddd',
    resize: 'none',
    boxSizing: 'border-box',
    outline: 'none',
  },
  sendButton: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  notice: {
    fontSize: '12px',
    color: '#666',
    marginTop: '16px',
    padding: '0 12px',
    textAlign: 'left',
    maxWidth: '360px',
    marginInline: 'auto',
    lineHeight: '1.4',
  },
  historyButton: {
    position: 'fixed',
    bottom: '90px',
    right: '20px',
    backgroundColor: '#fff',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '20px',
    padding: '8px 12px',
    fontSize: '13px',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
};
