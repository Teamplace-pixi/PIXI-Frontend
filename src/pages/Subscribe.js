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
          이민서 님의 적정 구독 플랜은 <br />
          <span style={{ color: '#FFD43A' }}>스탠다드 구독</span>입니다
        </h1>
      </div>

      {/* 구독 정보 카드 */}
      <div style={{ padding: '24px 25px' }}>
        <h2
          style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}
        >
          스탠다드 구독
        </h2>

        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
          {[
            '연간 최대 N대의 기기 수리비 얼마 지원',
            'Wiki chat 제공',
            '웰컴 키트 제공',
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
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>월 33,000원</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            style={{
              border: '1px solid #1A4EC0',
              backgroundColor: '#fff',
              color: '#1A4EC0',
              padding: '12px',
              borderRadius: '10px',
              fontWeight: '500',
              fontSize: '14px',
            }}
          >
            기기 변경하기
          </button>
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
