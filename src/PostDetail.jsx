import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import api from './api';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import RepairapplyModal from './components/RepairapplyModal'; // ✅ 수정된 모달 import

let options = [
  { value: '모집중', label: '모집중' },
  { value: '예약중', label: '예약중' },
  { value: '모집 완료', label: '모집 완료' },
  { value: '삭제하기', label: '삭제하기' },
];

export default function PostDetail() {
  const location = useLocation();
  const boardId = location.state?.id;
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [myBoardId, setMyBoardId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ 모달 상태

  const [selectValue, setSelectValue] = useState('');
  const selectInputRef = useRef(null);

  const onClearSelect = () => {
    if (selectInputRef.current) {
      selectInputRef.current.clearValue();
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('정말로 게시글을 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      await api.delete(`/board/board_id=${boardId}`);
      alert('게시글이 삭제되었습니다.');
      navigate(-1);
    } catch (err) {
      alert('게시글 삭제에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    }
  };

  const fetchPost = async () => {
    try {
      const [response, userRes, boardListRes] = await Promise.all([
        api.get(`/board/board_id=${boardId}`),
        api.get('/myPage'),
        api.get('/myPage/boardList'),
      ]);

      setPost(response.data);
      setUser(userRes.data);
      setMyBoardId(boardListRes.data.map((board) => board.boardId));
    } catch (err) {
      setError('게시글 정보를 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!boardId) {
      setError('게시글 ID가 전달되지 않았습니다.');
      setLoading(false);
      return;
    }

    fetchPost();
  }, [boardId]);

  if (loading) return <div>불러오는 중...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  const isMyPost = myBoardId.includes(boardId);

  return (
    <>
      <Header />

      {/* 본문 내용 */}
      <div style={{ padding: '80px 16px 120px', fontFamily: 'sans-serif' }}>
        {/* 모집 상태 및 날짜 */}
        <div
          style={{
            marginBottom: '8px',
            color: '#2563eb',
            fontWeight: 'bold',
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ marginTop: '7px', fontSize: '20px' }}>
            {post.boardStatus || '모집중'}
          </span>

          {isMyPost && (
            <Select
              ref={selectInputRef}
              value={options.find((option) => option.value === selectValue)}
              onChange={async (e) => {
                if (!e) {
                  setSelectValue('');
                  return;
                }
                if (e.value === '삭제하기') {
                  handleDelete();
                  return;
                }

                try {
                  await api.put(`/board/board_id=${boardId}`, {
                    status: e.value,
                  });
                  setSelectValue(e.value);
                  alert(`게시글 상태가 '${e.value}'(으)로 변경되었습니다.`);
                  await fetchPost();
                } catch (err) {
                  alert('상태 변경에 실패했습니다. 다시 시도해주세요.');
                  console.error(err);
                }
              }}
              options={options}
              placeholder="수정하기"
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: 20,
                  borderColor: '#2563eb',
                  boxShadow: 'none',
                  minWidth: 140,
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: 10,
                  zIndex: 5,
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? '#2563eb'
                    : state.data.value === '삭제하기'
                    ? '#ffe5e5'
                    : state.isFocused
                    ? '#f0f0f0'
                    : '#fff',
                  color:
                    state.data.value === '삭제하기'
                      ? '#d00'
                      : state.isSelected
                      ? '#fff'
                      : '#333',
                  fontWeight: state.isSelected ? 'bold' : 'normal',
                  cursor: 'pointer',
                }),
              }}
            />
          )}
        </div>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>
          등록일시 {post.createdAt || '알 수 없음'}
        </div>

        {/* 제목 */}
        <h2
          style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}
        >
          {post.boardTitle}
        </h2>

        {/* 구분선 */}
        <div style={{ borderTop: '1px solid #eee', margin: '20px 0' }} />

        {/* 상세정보 */}
        <div style={{ fontSize: '14px', color: '#333', lineHeight: '1.8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>📱 기종</span>
            <span>{post.deviceName}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>💰 가능 금액</span>
            <span>{post.boardCost}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>🕒 필요 날짜</span>
            <span>{post.boardDate}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>📍 위치</span>
            <span>{post.boardLoc}</span>
          </div>
        </div>

        {/* 구분선 */}
        <div style={{ borderTop: '1px solid #eee', margin: '24px 0' }} />

        {/* 본문 */}
        <div style={{ fontSize: '14px', color: '#555' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            사진 및 본문
          </div>

          {Array.isArray(post.imageUrls) && post.imageUrls.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              {post.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`게시글 이미지 ${index + 1}`}
                  style={{
                    width: '100%',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '10px',
                  }}
                />
              ))}
            </div>
          )}
          <div style={{ whiteSpace: 'pre-wrap' }}>{post.boardContent}</div>
        </div>
      </div>

      {/* 수리 지원하기 버튼 */}
      {user?.rollId === 1 && (
        <div
          style={{

            backgroundColor: '#2563eb',
            color: '#fff',
            padding: '14px',
            width: '95%',
            border: 'none',
            borderRadius: '20px',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          }}
          onClick={() => setIsModalOpen(true)}

        >
          <button
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              padding: '14px',
              width: 'calc(100% - 32px)',
              border: 'none',
              borderRadius: '20px',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            }}
            onClick={() => alert('수리 지원이 접수되었습니다!')}
          >
            수리 지원하기
          </button>
        </div>
      )}

      <BottomNav />

      {/* 모달 렌더링 */}
      {isModalOpen && (
        <RepairapplyModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
