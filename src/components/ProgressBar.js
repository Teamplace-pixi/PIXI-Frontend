// src/components/ProgressBar.js
import React from 'react';
import './ProgressBar.css';


function ProgressBar({ step }) {
  return (
    <div
      className="progress-bar-container"
      style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',  // 화면 중앙 정렬
        zIndex: 1000,
        display: 'flex',
        padding: '8px',
        backgroundColor: '#0546BE',
        width: '392px',  // 너비 고정
        borderRadius: '4px',
      }}
    >
      {[1, 2, 3, 4].map((s) => (
        <div
          key={s}
          style={{
            flex: 1,
            height: '8px',
            margin: '0 4px',
            borderRadius: '4px',
            backgroundColor: s <= step ? '#FFC800' : '#D9D9D9',
            transition: 'background-color 0.3s',
          }}
        />
      ))}
    </div>
  );
}


export default ProgressBar;
