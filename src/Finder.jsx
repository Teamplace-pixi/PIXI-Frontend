import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import api from './api';

export default function Finder() {
  // 부품 가격 용
  const [selectedTab, setSelectedTab] = useState('부품 가격');
  const [partPrices, setPartPrices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [deviceName, setDeviceName] = useState('');
  // 기기 이미지 URL을 저장할 state 추가 (만약 넘겨받는다면)
  // const [deviceImageUrl, setDeviceImageUrl] = useState('/iphone.png'); // 기본 이미지

  const navigate = useNavigate();
  const location = useLocation();

  const deviceId = location.state?.id;
  const passedDeviceName = location.state?.name;

  // 컴포넌트가 마운트되거나 deviceId가 변경될 때 API 호출
  useEffect(() => {
    if (deviceId) {
      console.log(`Finder: deviceId 상태 확인 - ${deviceId}`);
      if (passedDeviceName) {
        setDeviceName(passedDeviceName);
        console.log(`Finder: 넘겨받은 기기 이름 - ${passedDeviceName}`);
      } else {
        console.warn(
          `Finder: SearchBar로부터 deviceName을 넘겨받지 못했습니다.`
        );
        setDeviceName('알 수 없는 기기');
      }

      fetchPartPrices(deviceId);
      fetchRepairShops(deviceId);
      fetchBoardList(deviceId);
    } else {
      console.error('Finder: deviceId가 전달되지 않았습니다.');
      setError('기기 정보를 불러올 수 없습니다. 다시 검색해주세요.');
      setIsLoading(false);
    }
    // passedDeviceName도 의존성 배열에 추가하여, 혹시나 나중에 이 값이 비동기적으로 업데이트될 경우를 대비
  }, [deviceId, navigate, passedDeviceName]);

  const fetchPartPrices = async (id) => {
    setIsLoading(true);
    setError(null);
    console.log(`API 호출 시작: /finder/partList/device_id=${id}`);

    try {
      const response = await api.get(`/finder/partList/device_id=${id}`);

      console.log('디바이스 부품 가격 응답:', response.data);

      if (
        response.data &&
        typeof response.data === 'object' &&
        response.data !== null
      ) {
        setPartPrices(response.data);
      } else {
        console.error(
          '디바이스 부품 가격 API 응답 형식이 예상과 다릅니다:',
          response.data
        );
        setPartPrices(null);
        setError('기기 부품 가격 정보를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('디바이스 부품 가격 호출 실패:', error);
      setError('기기 부품 가격 정보를 불러오는데 실패했습니다.');
      setPartPrices(null);
    } finally {
      setIsLoading(false);
    }
  };

  const repairCenters = [
    { name: '강남 스마트 수리센터', address: '서울 강남구 테헤란로 123' },
    { name: '홍대 리페어존', address: '서울 마포구 와우산로 45' },
  ];

  const requests = new Array(3).fill({
    title: '아이폰 후면 수리 가능하신 분?',
    price: '가능 금액 협의 가능',
    date: '필요 날짜 협의 가능',
    tags: ['애플', '핸드폰'],
  });

  // 여기서부턴 수리센터 api 연동
  const [shopList, setShopList] = useState([]);

  const fetchRepairShops = async (id) => {
    try {
      const response = await api.get(`/finder/shopList/device_id=${id}`);
      console.log('수리센터 데이터:', response.data);

      if (Array.isArray(response.data)) {
        setShopList(response.data);
      } else {
        console.warn('수리센터 응답이 배열이 아닙니다:', response.data);
        setShopList([]);
      }
    } catch (error) {
      console.error('수리센터 API 호출 실패:', error);
      setShopList([]);
    }
  };

  // 구해요 api 연동
  const [boardList, setBoardList] = useState([]);
  const fetchBoardList = async (id) => {
    try {
      const response = await api.get(`/finder/boardList/device_id=${id}`);
      console.log('게시글 목록 응답:', response.data);

      if (Array.isArray(response.data)) {
        setBoardList(response.data);
      } else {
        console.warn('게시글 응답이 배열이 아닙니다:', response.data);
        setBoardList([]);
      }
    } catch (error) {
      console.error('게시글 API 호출 실패:', error);
      setBoardList([]);
    }
  };

  const handleNavigateToNewPost = () => {
    navigate('/new-post');
  };

  const styles = {
    container: {
      fontFamily: 'sans-serif',
      padding: '16px',
      paddingTop: '80px',
      paddingBottom: '80px',
    },
    breadcrumb: {
      marginTop: '16px',
      color: '#777',
      fontSize: '14px',
    },
    deviceNameHighlight: {
      color: '#1e40af',
      fontWeight: 'bold',
    },
    deviceInfoSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '12px',
    },
    deviceImage: {
      width: '120px',
      height: '120px',
    },
    deviceNameStyle: {
      // deviceName과의 혼동을 피하기 위해 스타일 이름 변경
      marginTop: '8px',
      fontWeight: 'bold',
      fontSize: '16px',
    },
    tabsContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '24px',
    },
    tabButton: (isSelected) => ({
      padding: '8px 16px',
      borderRadius: '20px',
      border: isSelected ? 'none' : '1px solid #ccc',
      backgroundColor: isSelected ? '#2563eb' : '#fff',
      color: isSelected ? '#fff' : '#333',
      fontWeight: 'bold',
      cursor: 'pointer',
    }),

    partPricesSection: {
      marginTop: '20px',
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '12px',
    },
    priceListContainer: {
      border: '1px solid #eee',
      borderRadius: '16px',
      padding: '16px',
      backgroundColor: '#fff',
    },
    priceItem: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '8px',
      marginBottom: '8px',
      borderBottom: '1px solid #eee',
    },
    lastPriceItem: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    repairCentersSection: {
      marginTop: '20px',
    },
    repairCenterItem: {
      border: '1px solid #eee',
      borderRadius: '16px',
      padding: '16px',
      marginBottom: '12px',
      backgroundColor: '#fff',
    },
    repairCenterName: {
      fontWeight: 'bold',
      fontSize: '16px',
      marginBottom: '4px',
    },
    repairCenterAddress: {
      fontSize: '14px',
      color: '#666',
    },

    requestsSection: {
      marginTop: '20px',
    },
    requestViewOptions: {
      display: 'flex',
      justifyContent: 'flex-start',
      gap: '16px',
      fontSize: '14px',
      marginBottom: '12px',
    },
    requestViewOptionBold: {
      fontWeight: 'bold',
    },
    requestViewOptionHighlight: {
      color: '#2563eb',
      fontWeight: 'bold',
    },
    requestItem: {
      border: '1px solid #eee',
      borderRadius: '16px',
      padding: '16px',
      marginBottom: '12px',
      backgroundColor: '#fff',
      cursor: 'pointer',
    },
    requestTitle: {
      fontWeight: 'bold',
      fontSize: '16px',
      marginBottom: '8px',
    },
    requestDetails: {
      display: 'flex',
      gap: '12px',
      fontSize: '14px',
      color: '#666',
    },
    requestTagsContainer: {
      marginTop: '12px',
      display: 'flex',
      gap: '8px',
    },
    requestTag: {
      padding: '4px 8px',
      backgroundColor: '#e0e7ff',
      color: '#1e40af',
      borderRadius: '12px',
      fontSize: '12px',
    },

    newPostButton: {
      width: '100%',
      backgroundColor: '#2563eb',
      color: '#fff',
      padding: '14px',
      borderRadius: '12px',
      fontWeight: 'bold',
      fontSize: '16px',
      marginTop: '32px',
      border: 'none',
      cursor: 'pointer',
      marginBottom: '20px',
    },
    message: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '16px',
      color: '#555',
    },
    errorMessage: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '16px',
      color: '#d32f2f',
    },
  };

  return (
    <>
      <Header title="FIX Finder" />
      <div style={styles.container}>
        {/* deviceId와 deviceName이 있을 때만 기기 정보 섹션 표시 */}
        {deviceId && deviceName ? (
          <>
            <div style={styles.breadcrumb}>
              핸드폰 &gt;{' '}
              <span style={styles.deviceNameHighlight}>
                {deviceName} {/* 넘겨받은 기기 이름 표시 */}
              </span>
            </div>

            <div style={styles.deviceInfoSection}>
              {/* 이미지 URL도 넘겨받는다면 여기 사용 */}
              <img
                src="/iphone.png" // 실제 기기 이미지 URL로 변경 필요 (현재는 하드코딩)
                alt={deviceName} // alt 텍스트도 실제 기기 이름 사용
                style={styles.deviceImage}
              />
              <div style={styles.deviceNameStyle}>
                {' '}
                {/* 스타일 이름 변경 적용 */}
                {deviceName} {/* 넘겨받은 기기 이름 표시 */}
              </div>
            </div>
          </>
        ) : // deviceId나 deviceName이 없을 경우 로딩 또는 오류 메시지 표시
        isLoading ? (
          <div style={styles.message}>기기 정보를 불러오는 중...</div>
        ) : (
          <div style={styles.errorMessage}>
            {error || '기기 정보를 찾을 수 없습니다.'}
          </div>
        )}

        {/* 탭 버튼들은 deviceId가 있을 때만 보여주는 것이 일반적입니다. */}
        {deviceId && deviceName && (
          <div style={styles.tabsContainer}>
            {['부품 가격', '수리센터', '구해요'].map((tab, index) => (
              <button
                key={index}
                onClick={() => setSelectedTab(tab)}
                style={styles.tabButton(tab === selectedTab)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* 탭 내용 - '부품 가격' (deviceId와 deviceName이 있고 선택된 탭일 때만 표시) */}
        {deviceId && deviceName && selectedTab === '부품 가격' && (
          <div style={styles.partPricesSection}>
            <h2 style={styles.sectionTitle}>부품별 예상 가격</h2>
            {isLoading ? (
              <div style={styles.message}>부품 가격 정보를 불러오는 중...</div>
            ) : error ? (
              <div style={styles.errorMessage}>{error}</div>
            ) : partPrices ? (
              <div style={styles.priceListContainer}>
                <div style={styles.priceItem}>
                  <div>액정 교체</div>
                  <div>
                    {partPrices.displayPrice?.toLocaleString() || '-'}원
                  </div>
                </div>
                <div style={styles.priceItem}>
                  <div>후면 교체</div>
                  <div>{partPrices.backPrice?.toLocaleString() || '-'}원</div>
                </div>
                <div style={styles.priceItem}>
                  <div>카메라 교체</div>
                  <div>{partPrices.cameraPrice?.toLocaleString() || '-'}원</div>
                </div>
                <div style={styles.priceItem}>
                  <div>배터리 교체</div>
                  <div>
                    {partPrices.batteryPrice?.toLocaleString() || '-'}원
                  </div>
                </div>
                <div style={styles.lastPriceItem}>
                  <div>기기 금액</div>
                  <div>{partPrices.mainPrice?.toLocaleString() || '-'}원</div>
                </div>
              </div>
            ) : (
              <div style={styles.message}>
                부품 가격 정보를 찾을 수 없습니다.
              </div>
            )}
          </div>
        )}

        {/* 탭 내용 - '수리센터' (deviceId와 deviceName이 있고 선택된 탭일 때만 표시) */}
        {deviceId && deviceName && selectedTab === '수리센터' && (
          <div style={styles.repairCentersSection}>
            <h2 style={styles.sectionTitle}>내 주변 수리 센터</h2>
            {shopList.length > 0 ? (
              shopList.map((shop, idx) => (
                <div key={idx} style={styles.repairCenterItem}>
                  <div style={styles.repairCenterName}>{shop.shopName}</div>
                  <div style={styles.repairCenterAddress}>{shop.shopLoc}</div>
                </div>
              ))
            ) : (
              <div style={styles.message}>수리센터 정보를 불러오는 중...</div>
            )}
          </div>
        )}

        {/* 탭 내용 - '구해요' (deviceId와 deviceName이 있고 선택된 탭일 때만 표시) */}
        {deviceId && deviceName && selectedTab === '구해요' && (
          <div style={styles.requestsSection}>
            <h2 style={styles.sectionTitle}>수리 부품/서비스 '구해요' 목록</h2>
            <div style={styles.requestViewOptions}>
              <span style={styles.requestViewOptionBold}>상위보기</span>
              <span style={styles.requestViewOptionHighlight}>세부보기</span>
            </div>
            {boardList.length > 0 ? (
              boardList.map((post, idx) => (
                <div key={idx} style={styles.requestItem}>
                  <div style={styles.requestTitle}>{post.boardTitle}</div>
                  <div style={styles.requestDetails}>
                    <div>📄 {post.boardCost.toLocaleString()}원</div>
                    <div>🗓️ {post.boardDate}</div>
                  </div>
                  <div style={styles.requestTagsContainer}>
                    <div style={styles.requestTag}>{post.deviceBrand}</div>
                    {post.tags.map((tag, i) => (
                      <div key={i} style={styles.requestTag}>
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.message}>등록된 구해요 게시글이 없습니다.</div>
            )}
            <button
              onClick={handleNavigateToNewPost}
              style={styles.newPostButton}
            >
              새 글 작성
            </button>
          </div>
        )}

        {/* deviceId나 deviceName이 없을 때 탭 내용을 아예 숨길 수 있습니다.
            위 코드에서는 각 탭 내용 블록에도 deviceId && deviceName && ... 조건을 추가했습니다. */}
      </div>
      <BottomNav />
    </>
  );
}
