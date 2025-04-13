import React from 'react';

export default function WikiNewDocs() {
  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e40af' }}>
          My Page
        </h1>
        <text>설정</text>
      </div>

      <div>
        <h2>대표사진</h2>
        <img
          src=""
          style={{
            width: '60px',
            height: '60px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <div>
        <h2 style={{ marginTop: '16px', padding: '8px' }}>제목</h2>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          style={{
            display: 'flex',
            marginTop: '7px',
            padding: '8px',
            width: '95%',
          }}
        />
      </div>

      <div>
        <h2 style={{ marginTop: '16px', padding: '8px' }}>카테고리</h2>
        <input
          type="text"
          placeholder="휴대폰 화면"
          style={{
            marginTop: '7px',
            padding: '8px',
          }}
        />
      </div>

      <div>
        <h2 style={{ marginTop: '16px', padding: '8px' }}>내용글 작성</h2>
        <input
          type="text"
          placeholder="다른 사용자에게 도움이 될 수 있는 글을 작성해주세요!"
          style={{
            display: 'flex',
            marginTop: '7px',
            padding: '8px',
            height: '180px',
            textAlign: 'top',
            width: '95%',
          }}
        />

        <button
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '30px',
            marginTop: '16px',
            padding: '8px 16px',
            backgroundColor: '#2563eb',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '12px',
            fontSize: '16px',
          }}
        >
          등록하기
        </button>
      </div>

      {/* 하단 네비게이션
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#fff',
          borderTop: '1px solid #ccc',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '10px 0',
        }}
      >
        {['홈', '백과사전', '이슈체크', 'AI견적', '프로필'].map(
          (tab, index) => (
            <button
              key={index}
              style={{
                fontSize: '12px',
                color: tab === '백과사전' ? '#1A4EC0' : '#666',
                fontWeight: tab === '백과사전' ? '600' : '400',
                background: 'none',
                border: 'none',
              }}
            >
              {tab}
            </button>
          )
        )}
      </div> */}
    </div>
  );
}
