import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './components/BottomNav'; // BottomNav 컴포넌트 가져오기

export default function SubscriptionPage() {
  const navigate = useNavigate();

  return (
    // container를 스크롤 가능한 메인 영역으로 사용
    <div style={styles.container}>
      <div style={styles.headerBox}>
        {/* 텍스트 박스 */}
        <p style={styles.highlight}>
          <strong style={{ color: '#FFD400' }}>FIXI</strong>의 모든 기능을
          <br />
          <strong>월 2,900원</strong>에,
          <br />
          수리에 더욱 도움이 될 거예요!
        </p>
        {/* 아이콘 */}
        <img src="FIX.png" alt="혜택 아이콘" style={styles.icon} />
      </div>

      <div style={styles.card}>
        <h4 style={styles.title}>FIXI 프라임으로 전환하기</h4>
        <hr style={styles.divider} />

        {/* 기능 항목들 */}
        <div style={styles.featureItem}>
          <img src="ai-icon.png" alt="AI 견적" style={styles.featureIcon} />
          <div>
            <div><strong style={{ color: '#998A5D' }}>AI 견적</strong> 월 5회 이용권</div>
          </div>
        </div>

        <div style={styles.featureItem}>
          <img src="post-icon.png" alt="구해요" style={styles.featureIcon} />
          <div>
            <div><strong style={{ color: '#998A5D' }}>'구해요'</strong> 게시글 상단 배치</div>
          </div>
        </div>

        <div style={styles.featureItem}>
          <img src="gift-icon.png" alt="웰컴 키트" style={styles.featureIcon} />
          <div>
            <div>첫 결제 시 <strong style={{ color: '#998A5D' }}>웰컴 키트</strong> 제공</div>
          </div>
        </div>

        {/* 가격 및 버튼 */}
        <div style={styles.price}>월 2,900원</div>
        <button style={styles.subscribeButton}>구독하기</button>
      </div>
      {/* BottomNav 컴포넌트가 container 내부에 있지만, 보통 Fixed 포지션으로 사용될 때 아래 공간을 확보해줘야 함 */}
      {/* 만약 BottomNav가 Fixed가 아니라 스크롤 따라 움직이면 이대로 둬도 됨. Card의 paddingBottom이 아래 여백을 만들어 줄 것임. */}
      <BottomNav />
    </div>
  );
}

const styles = {
  container: {
    margin: '0', // 외부 마진 제거
    fontFamily: 'sans-serif',
    backgroundColor: '#fff', // 배경색 흰색 유지
    minHeight: '100vh', // 최소 높이 화면 전체
    width: '100%', // 너비 화면 전체
    boxSizing: 'border-box', // padding, border 포함 크기 계산
    overflowY: 'auto', // 내용이 넘치면 세로 스크롤 생성
    overflowX: 'hidden', // 가로 스크롤 방지
    // paddingBottom: '70px', // container 자체의 하단 패딩 제거 (card의 paddingBottom으로 대체)
  },

  headerBox: {
    backgroundColor: '#003C96',
    color: '#fff',
    borderRadius: '0', // 둥근 모서리 제거
    padding: '16px', // 내용물 안쪽 패딩 (좌우/상하 여백)
    textAlign: 'left', // 텍스트 정렬
    // position: 'relative', // 아이콘이 absolute가 아니므로 필요 없음
    boxSizing: 'border-box',
    width: '100%', // 너비 꽉 채우기
    display: 'flex', // ★ Flexbox 사용 ★
    alignItems: 'center', // ★ 아이템들(텍스트, 아이콘)을 수직 가운데 정렬 ★
    gap: '20px', // ★ 텍스트와 아이콘 사이 간격 설정 ★
  },

  highlight: {
    fontSize: '16px',
    lineHeight: '1.5',
    flexGrow: 1, // ★ 텍스트가 사용 가능한 공간을 최대한 차지하도록 설정 ★
    // margin-right 제거 (gap으로 대체)
  },

  icon: {
    // position: 'absolute', // ★ absolute 포지션 제거 ★
    // right: '16px', // ★ 고정 위치 속성 제거 ★
    // top: '16px', // ★ 고정 위치 속성 제거 ★
    width: '48px', // ★ 유저 요청 아이콘 너비 ★
    height: '58px', // ★ 유저 요청 아이콘 높이 ★
    flexShrink: 0, // 아이콘 크기가 줄어들지 않도록 고정
    // margin-left 제거 (gap으로 대체)
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: '0', // 둥근 모서리 제거
    padding: '16px', // 내용물 안쪽 패딩 (좌우/상하 여백)
    boxSizing: 'border-box',
    width: '100%',
    // 카드 내용 아래쪽에 BottomNav 높이만큼 패딩 추가하여 공간 확보
    // BottomNav 높이를 대략 60px로 보고 여유 있게 80px 정도 줘볼게!
    paddingBottom: '80px', // ★ BottomNav 공간 확보를 위한 하단 패딩 ★
  },

  title: {
    fontSize: '14px',
    marginBottom: '8px',
  },
  divider: {
    margin: '8px 0',
    borderColor: '#eee',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    // marginBottom: '12px', // 기존 간격
    margin: '40px 0 40px', // ★ 기능 항목들 간 간격 넓히기! ★
    gap: '10px', // 기능 아이콘과 텍스트 사이 간격 추가
  },
  featureIcon: {
    width: '28px',
    height: '28px',
    // marginRight: '10px', // gap으로 대체
    flexShrink: 0,
  },
  price: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '100px 0 12px', // 가격 위아래 마진
  },
  subscribeButton: {
    display: 'block',
    width: '100%',
    padding: '12px',
    backgroundColor: '#006FFF',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    marginTop: '50px',
  },
  
};
