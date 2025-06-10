import React from 'react';
import SettingHeader from './components/SettingHeader';

const dummyQuotes = [
  {
    id: 1,
    title: '아이폰 수리 견적서 #1',
    date: '2024-06-10',
    amount: '50,000원',
  },
  {
    id: 2,
    title: '맥북 배터리 교체 견적',
    date: '2024-06-05',
    amount: '120,000원',
  },
  {
    id: 3,
    title: '아이폰 화면 수리 견적 #2',
    date: '2024-05-28',
    amount: '75,000원',
  },
];

function Estimatehistory() {
  return (
    <div>
        <SettingHeader title="이전 견적서 목록" />

        <div style={{ padding: '0 20px', marginTop: '30px', paddingTop: '20px' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {dummyQuotes.map(quote => (
                    <li
                        key={quote.id}
                        style={{
                            borderBottom: '1px solid #eee',
                            padding: '15px 0',
                            marginBottom: '10px',
                            cursor: 'pointer',
                        }}
                    >
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                            {quote.title}
                        </div>
                        <div style={{ fontSize: '14px', color: '#555' }}>
                            날짜: {quote.date} | 예상 금액: {quote.amount}
                        </div>
                    </li>
                ))}
            </ul>

            {dummyQuotes.length === 0 && (
                <p style={{ textAlign: 'center', color: '#888' }}>
                    이전 견적서가 없습니다.
                </p>
            )}
        </div>
    </div>
  );
}

export default Estimatehistory;
