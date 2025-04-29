import React from 'react';


function SearchBar() {
  return (
    <div style={styles.container}>
      
      <input
        type="text"
        placeholder="Search"
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: {
    marginTop: '80px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '20px',
    padding: '8px 16px',
    margin: '16px',
  },
  icon: {
    marginRight: '8px',
    color: '#888',
  },
  input: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    width: '100%',
    fontSize: '16px',
  },
};

export default SearchBar;
