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
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        padding: '8px',
        backgroundColor: '#0546BE',
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
          }}
        />
      ))}
    </div>
  );
}


export default ProgressBar;
