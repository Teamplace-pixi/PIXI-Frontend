import React, { useState, useEffect, useRef } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function StoreListSection() {
  const [shopList, setShopList] = useState([]);
  const navigate = useNavigate();
  const [shopId, setShopId] = useState(null); // 수리센터 ID 상태 추가

  // 드래그 상태 관련
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const fetchRepairShops = async () => {
    try {
      const response = await api.get('/home/shop');
      if (Array.isArray(response.data)) {
        setShopList(response.data);
        setShopId(response.data?.shopId); // 첫 번째 수리센터 ID 설정
      } else {
        setShopList([]);
      }
    } catch (error) {
      console.error('수리센터 API 호출 실패:', error);
      setShopList([]);
    }
  };

  useEffect(() => {
    fetchRepairShops();
  }, []);

  const handleCenterClick = (centerId) => {
    navigate('/service-center', {
      state: { id: centerId },
    });
  };

  // 마우스 드래그 스크롤 핸들러
  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // 스크롤 속도 조절
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>숨은 맛집 리스트</h2>
      <div
        ref={scrollRef}
        style={styles.horizontalScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {shopList.length > 0 ? (
          shopList.map((shop, idx) => (
            <div
              key={idx}
              onClick={() => handleCenterClick(shop.shopId)}
              style={styles.repairCenterItem}
            >
              <img
                src={shop.thumb || 'FIXIBlackIcon.png'}
                alt="logo"
                style={styles.logo}
              />
              <div style={styles.name}>{shop.shopName}</div>
              <div style={styles.address}>{shop.shopLoc}</div>
            </div>
          ))
        ) : (
          <div style={styles.message}>수리센터 정보를 불러오는 중...</div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  horizontalScroll: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    paddingBottom: '8px',
    cursor: 'grab',
  },
  repairCenterItem: {
    flex: '0 0 auto',
    width: '160px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    padding: '12px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    cursor: 'pointer',
  },
  logo: {
    width: '100%',
    height: '80px',
    objectFit: 'contain',
    marginBottom: '8px',
    borderRadius: '8px',
  },
  name: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  address: {
    fontSize: '12px',
    color: '#666',
  },
  message: {
    color: '#999',
  },
};

export default StoreListSection;
