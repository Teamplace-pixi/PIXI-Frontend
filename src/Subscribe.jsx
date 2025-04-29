import React from 'react';

export default function SubscriptionPage() {
  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        backgroundColor: '#fff',
        minHeight: '100vh',
        paddingBottom: '70px',
      }}
    >
      {/* 상단 헤더 */}
      <div
        style={{
          backgroundColor: '#1A4EC0',
          padding: '24px 20px',
        }}
      >
        <h1
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#fff',
            lineHeight: '1.4',
          }}
        >
          <span style={{ color: '#FFD43A' }}>FIXI</span>의 모든 기능을 <br />
          월 2,900원에, <br />
          <span style={{ fontSize: '16px' }}>
            수리에 더욱 도움이 될 거에요!
          </span>
        </h1>
      </div>

      {/* 구독 정보 카드 */}
      <div style={{ padding: '24px 25px' }}>
        <h2
          style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}
        >
          FIXI 프라임으로 전환
        </h2>

        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
          {[
            'AI 견적 월 5회 이용권',
            "'구해요' 게시글 상단 배치",
            '첫 결제 시 웰컴 키트 제공',
          ].map((item, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '14px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#1A4EC0',
                  borderRadius: '50%',
                  marginTop: '6px',
                  marginRight: '10px',
                }}
              ></div>
              <span style={{ fontSize: '14px', color: '#333' }}>{item}</span>
            </li>
          ))}
        </ul>

        {/* 가격 및 버튼 */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>월 2,900원</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            style={{
              backgroundColor: '#1A4EC0',
              color: '#fff',
              padding: '12px',
              borderRadius: '10px',
              fontWeight: '500',
              fontSize: '14px',
              border: 'none',
            }}
          >
            구독하기
          </button>
        </div>
      </div>
    </div>
  );
}
