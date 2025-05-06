import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0); // 검색어가 있으면 자동완성 표시
  };

  const handleSearchClick = () => {
    navigate('/search'); // 검색 화면으로 이동
  };

  return (
    <div style={styles.container}>
      <span style={styles.icon}>🔍</span>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        onClick={handleSearchClick}
        style={styles.input}
      />
      {showSuggestions && (
        <div style={styles.suggestions}>
          {/* 자동완성 UI */}
          <div style={styles.suggestionItem}>자동완성 1</div>
          <div style={styles.suggestionItem}>자동완성 2</div>
          <div style={styles.suggestionItem}>자동완성 3</div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    marginTop: '0px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '20px',
    padding: '8px 16px',
    margin: '16px',
  },
  input: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    width: '100%',
    fontSize: '16px',
    padding: '8px',
  },
  suggestions: {
    position: 'absolute',
    top: '50px', 
    left: '0',
    width: '100%',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
    maxHeight: '200px',
    overflowY: 'auto',
  },
  suggestionItem: {
    padding: '10px 16px',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
  },
};

export default SearchBar;
