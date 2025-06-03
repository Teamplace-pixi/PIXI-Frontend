import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

function SearchPage() {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.headerWrapper}>
        <Header title="FIX Finder" />
      </div>
      <div style={styles.body}>
        <SearchBar isSearchPage={true} />
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#F8F8F8',
  },
  headerWrapper: {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  body: {
    marginTop: '60px',
    padding: '10px',
  },
};

export default SearchPage;
