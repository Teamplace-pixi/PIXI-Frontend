import React from 'react';

export default function MyPage() {
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

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
        <img
          src=""
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            border: '1px solid #ccc',
          }}
        />
        <div style={{ marginLeft: '16px' }}>
          <div style={{ fontSize: '18px', fontWeight: '600' }}>
            이민서 회원님
          </div>
          <div
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '12px',
              padding: '4px 8px',
              marginTop: '4px',
              fontSize: '12px',
              display: 'inline-block',
            }}
          >
            FIXER
          </div>
        </div>
        <div
          style={{
            marginLeft: 'auto',
            textAlign: 'right',
            flex: 1,
            flexDirection: 'column',
            width: '50px',
          }}
        >
          <button style={{ padding: '4px 8px' }}>회원정보 변경</button>
          <div>
            <button>북마크</button>
          </div>
          <div>
            <button>로그아웃</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <div style={{ overflow: 'scroll' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2>페이백</h2>
            <button>청구하기</button>
          </div>
          <div style={{ marginTop: '8px' }}>
            <div
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '8px',
                marginBottom: '8px',
              }}
            >
              등록 날짜: 4090.03.09
              <br />
              금액: 33,000원
              <br />
              상태: 검토중
            </div>
            <div
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '8px',
              }}
            >
              등록 날짜: 4090.03.09
              <br />
              금액: 33,000원
              <br />
              상태: 완료
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2>스탠다드 구독</h2>
          <button>플랜변경</button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '8px',
          }}
        >
          {['핸드폰', '노트북', '태블릿', '액세서리'].map((item) => (
            <div
              key={item}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                margin: '0 4px',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <h2>등록 기기</h2>
        {[1, 2, 3, 4].map((idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '8px',
              marginTop: '8px',
            }}
          >
            <div style={{ fontWeight: 'bold' }}>아이폰 16</div>
            <div style={{ fontSize: '14px', color: '#555' }}>
              2년 3개월째 사용중
            </div>
          </div>
        ))}
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
