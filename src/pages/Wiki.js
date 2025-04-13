import React from 'react';

export default function Wiki() {
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
          Wiki
        </h1>
        <div>
          <button>설정 </button>
          <button>내정보</button>
        </div>
      </div>

      <div style={{ display: 'grid', alignItems: 'center', marginTop: '16px' }}>
        <div
          style={{
            display: 'flex',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '8px',
            marginTop: '8px',
          }}
        >
          <div>검색 </div>
          <div>Search</div>
        </div>
      </div>

      <div style={{ display: 'grid', alignItems: 'center', marginTop: '16px' }}>
        <div
          style={{
            textAlign: 'end',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '8px',
            marginTop: '8px',
          }}
        >
          <h1>아이폰16 Pro</h1>
          <h3>내 아이폰의 문제와 솔루션을 한 번에</h3>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'start', marginTop: '24px' }}>
        <button style={{ color: '#0047B1' }}>추천순 </button>
        <button style={{ marginLeft: '4px' }}>최신순</button>
      </div>

      <div style={{ display: 'grid', alignItems: 'center', marginTop: '16px' }}>
        <div
          style={{
            display: 'flex',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '8px',
            marginTop: '8px',
          }}
        >
          <div style={{ flex: 1 }}>
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '8px',
                  marginTop: '8px',
                }}
              >
                <div># 아이폰 16 물에 빠졌을 때 대처법</div>
              </div>
            ))}
          </div>
        </div>
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
