import React, { useState, useEffect } from 'react';
import api from '../api';

export default function RepairSupportModal({
  applyId,
  onClose,
  onStartRepair,
}) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [applyData, setApplyData] = useState(null);
  const [reviewCost, setReviewCost] = useState('');
  const [reviewDuration, setReviewDuration] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // ✅ 사용자 ID 가져오기
    const fetchUserId = async () => {
      try {
        const res = await api.get('/users/userId');
        setUserId(res.data.user_id);
      } catch (err) {
        console.error('유저 정보 로드 실패:', err);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (!applyId) return;

    const fetchApplyData = async () => {
      try {
        const res = await api.get(`/apply/apply_id=${applyId}`);
        console.log('수리 지원 정보:', res.data);
        setApplyData(res.data);
      } catch (error) {
        console.error('수리 지원 정보 불러오기 실패:', error);
      }
    };
    fetchApplyData();
  }, [applyId]);

  const handleSubmitReview = async () => {
    if (!applyData || userId == null) return;

    try {
      const payload = {
        user_id: userId,
        shop_id: applyData.shopId,
        device_id: 0,
        reviewStar: stars,
        reviewTitle: '수리 후기', // 필요 시 입력란 추가 가능
        reviewContent: review,
        reviewTime: reviewDuration,
        reviewMoney: parseInt(reviewCost),
      };

      await api.post('/shop/review', payload);
      console.log('후기 제출 완료:', payload);
      onClose(); // 모달 닫기
    } catch (error) {
      console.error('후기 제출 실패:', error);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modalContainer}>
        <div style={styles.header}>
          <h3 style={styles.title}>
            {showReviewForm ? '수리 후기 작성' : '수리 지원 내용'}
          </h3>
          <button onClick={onClose} style={styles.closeBtn}>
            ✕
          </button>
        </div>

        {!applyData ? (
          <p>수리 지원 정보를 불러오는 중...</p>
        ) : !showReviewForm ? (
          <>
            <div style={styles.centerInfo}>
              <img src={applyData.shopImg} alt="logo" style={styles.logo} />
              <div>
                <p style={styles.name}>{applyData.shopName}</p>
                <p style={styles.address}>{applyData.address}</p>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label>수리 가능한 예상 금액</label>
              <input
                value={applyData.applyCost}
                type="text"
                placeholder="수리 가능한 금액"
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label>예상 작업 소요일</label>
              <input
                value={applyData.applyDate}
                type="text"
                placeholder="수리에 필요한 작업 날짜"
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label>간단한 소개 문구</label>
              <textarea
                value={applyData.applyContent}
                placeholder="지원 문구"
                readOnly
                style={styles.textarea}
              />
            </div>

            <button style={styles.primaryButton} onClick={onStartRepair}>
              수리 시작하기
            </button>
            <button
              style={styles.secondaryButton}
              onClick={() => setShowReviewForm(true)}
            >
              수리 완료하기
            </button>
          </>
        ) : (
          <>
            <div
              style={{
                ...styles.inputGroup,
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  onClick={() => setStars(num)}
                  style={{
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: num <= stars ? '#006FFF' : '#ccc',
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            <div style={styles.inputGroup}>
              <label>최종 수리 비용</label>
              <input
                type="text"
                placeholder="수리비 입력"
                value={reviewCost}
                onChange={(e) => setReviewCost(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label>총 작업 소요일</label>
              <select
                value={reviewDuration}
                onChange={(e) => setReviewDuration(e.target.value)}
                style={styles.input}
              >
                <option value="" disabled>
                  작업 소요 기간을 선택하세요
                </option>
                <option value="3일 이내">3일 이내</option>
                <option value="5일 이내">5일 이내</option>
                <option value="7일 이내">7일 이내</option>
                <option value="7일 이상">7일 이상</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label>간단한 후기</label>
              <textarea
                placeholder="수리에 대한 후기를 작성해주세요"
                style={styles.textarea}
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>

            <button style={styles.primaryButton} onClick={handleSubmitReview}>
              후기 제출하기
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 9,
  },
  modalContainer: {
    position: 'fixed',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '24px',
    zIndex: 10,
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  closeBtn: {
    fontSize: '18px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  centerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  logo: {
    width: '50px',
    height: '50px',
  },
  name: {
    fontWeight: 'bold',
    fontSize: '15px',
  },
  address: {
    fontSize: '13px',
    color: '#777',
  },
  inputGroup: {
    marginBottom: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  input: {
    padding: '10px',
    borderRadius: '12px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  textarea: {
    padding: '10px',
    borderRadius: '12px',
    border: '1px solid #ccc',
    minHeight: '80px',
    resize: 'none',
    outline: 'none',
  },
  primaryButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '999px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    marginTop: '8px',
    cursor: 'pointer',
  },
  secondaryButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '999px',
    backgroundColor: '#eee',
    color: '#444',
    fontWeight: 'bold',
    border: 'none',
    marginTop: '8px',
    cursor: 'pointer',
  },
};
