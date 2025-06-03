import React, { useState, useEffect, useRef } from 'react'; // useRef 추가
import { useNavigate } from 'react-router-dom';
import api from '../api';

// isSearchPage prop을 받도록 수정
export default function SearchBar({ isSearchPage }) {
  const [name, setSearchQuery] = useState('');
  // Home 페이지에서는 자동완성 목록을 아예 표시하지 않도록 초기값 설정
  const [showSuggestions, setShowSuggestions] = useState(isSearchPage);
  const [suggestions, setSuggestions] = useState([]);
  const [deviceId, setDeviceId] = useState(null); // deviceId 상태 추가
  const [deviceName, setDeviceName] = useState(null); // deviceName 상태 추가
  const [deviceImg, setDeviceImg] = useState(null); // deviceImg 상태 추가
  const navigate = useNavigate();

  // 검색창 input 엘리먼트에 접근하기 위한 ref
  const inputRef = useRef(null);

  // isSearchPage prop이 true일 때만 자동완성 로직 실행
  useEffect(() => {
    if (!isSearchPage) {
      // SearchPage가 아니면 자동완성 관련 로직 실행 안 함
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // SearchPage일 때만 기존 자동완성 로직 실행
    if (name.length === 0) {
      setShowSuggestions(false);
      setSuggestions([]);
      return;
    }

    const debounceTimer = setTimeout(() => {
      fetchSuggestions(name);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [name, isSearchPage]); // isSearchPage도 의존성 배열에 추가

  const fetchSuggestions = async (query) => {
    // SearchPage가 아니면 API 호출 안 함
    if (!isSearchPage) return;

    try {
      const response = await api.get('/device/search', {
        params: {
          name: query,
        },
      });

      console.log('자동완성 API 응답:', response.data);

      if (response.data && Array.isArray(response.data)) {
        setSuggestions(response.data);
        // 검색 결과가 있을 때만 목록 표시
        setShowSuggestions(response.data.length > 0);
        console.log('자동완성 목록:', response.data);
        console.log('자동완성 목록 표시:', response.token);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        console.error(
          '자동완성 API 응답 형식이 예상과 다릅니다:',
          response.data
        );
      }
    } catch (error) {
      console.error('자동완성 목록 가져오기 실패:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchChange = (e) => {
    // SearchPage일 때만 입력값 변경 허용
    if (isSearchPage) {
      const value = e.target.value;
      setSearchQuery(value);
      // 입력 중에는 자동완성 목록 표시 (useEffect에서 처리)
    }
  };

  const handleSuggestionClick = (suggestion) => {
    // SearchPage일 때만 자동완성 항목 클릭 처리
    if (isSearchPage) {
      setSearchQuery(suggestion.deviceName);
      setDeviceId(suggestion.deviceId); // deviceId 상태 업데이트
      setDeviceName(suggestion.deviceName); // deviceName 상태 업데이트
      setDeviceImg(suggestion.deviceImg); // deviceImg 상태 업데이트
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // 검색 아이콘 클릭 또는 Enter 키 입력 시 전체 검색 시작
  const handleSearchStart = () => {
    // SearchPage일 때만 검색 시작 로직 실행
    if (isSearchPage) {
      if (name.length > 0) {
        // 검색어가 있을 때만 이동
        navigate('/Finder', {
          state: { id: deviceId, name: deviceName, img: deviceImg },
        });
        console.log(
          `SearchBar: 검색 -> Finder로 이동. ID: ${deviceId}, Name: ${deviceName}`
        );
        setShowSuggestions(false);
      }
    } else {
      navigate('/search');
    }
  };

  // Enter 키 눌렀을 때 검색 실행
  const handleKeyPress = (e) => {
    // SearchPage일 때만 Enter 키 처리
    if (isSearchPage && e.key === 'Enter') {
      handleSearchStart();
    }
  };

  // 검색창 클릭 시 동작 정의
  const handleInputClick = () => {
    // Home 페이지에서는 클릭 시 SearchPage로 이동
    if (!isSearchPage) {
      navigate('/search');
    }
  };

  // SearchPage에서 input이 포커스를 잃었을 때 자동완성 목록 숨김
  const handleInputBlur = () => {
    if (isSearchPage) {
      setTimeout(() => {
        setShowSuggestions(false);
        setSuggestions([]);
      }, 100);
    }
  };

  const styles = {
    container: {
      position: 'relative',
      marginTop: '0px',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: '20px',
      padding: '8px 16px',
      margin: '16px',
      // Home 페이지에서는 클릭 가능한 것처럼 보이도록 커서 변경
      cursor: isSearchPage ? 'text' : 'pointer',
    },
    input: {
      border: 'none',
      background: 'transparent',
      outline: 'none',
      width: '100%',
      fontSize: '16px',
      padding: '8px',
      // Home 페이지에서는 입력을 막고 클릭만 가능하게
      pointerEvents: isSearchPage ? 'auto' : 'none',
      // Home 페이지에서는 스타일 변경 (선택 사항)
      color: isSearchPage ? 'inherit' : '#555',
    },
    suggestions: {
      position: 'absolute',
      top: '100%', // input 아래에 정확히 위치하도록
      left: '0',
      right: '0',
      width: '100%',
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
      maxHeight: '200px',
      overflowY: 'auto',
      marginTop: '4px', // input과의 간격 조정
    },
    suggestionItem: {
      padding: '10px 16px',
      cursor: 'pointer',
      borderBottom: '1px solid #eee',
    },
    searchIcon: {
      cursor: 'pointer',
      marginLeft: '8px',
    },
  };

  return (
    // Home 페이지에서는 전체 컨테이너를 클릭 가능하게
    <div
      style={styles.container}
      onClick={!isSearchPage ? handleInputClick : undefined}
    >
      <input
        ref={inputRef} // ref 연결
        type="text"
        placeholder="Search"
        value={name}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        onClick={isSearchPage ? handleInputClick : undefined} // SearchPage일 때만 input 자체 클릭 이벤트 처리
        onBlur={handleInputBlur} // 포커스 잃었을 때 처리
        style={styles.input}
        disabled={!isSearchPage} // SearchPage가 아니면 입력 비활성화
      />
      {/* SearchPage일 때만 검색 아이콘 클릭 가능 */}
      <span
        onClick={isSearchPage ? handleSearchStart : undefined}
        style={styles.searchIcon}
      >
        🔍
      </span>

      {/* SearchPage이고, 자동완성 목록 표시 상태이며, 목록에 항목이 있을 때만 렌더링 */}
      {isSearchPage && showSuggestions && suggestions.length > 0 && (
        <div style={styles.suggestions}>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.deviceId}
              style={styles.suggestionItem}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.deviceName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
