import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Banner from './components/Banner';
import CategorySection from './components/CategorySection';
import StoreListSection from './components/StoreListSection';
import TalentSection from './components/TalentSection';
import BottomNav from './components/BottomNav';

function Finder() {
  return (
    <div className="home-container" style={styles.container}>
      <Header />
      <div className="main-content" style={styles.mainContent}>
        <SearchBar />
        <Banner />
        <CategorySection />
        <StoreListSection />
        <TalentSection />
      </div>
      <BottomNav />
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    paddingBottom: '60px',
    backgroundColor: '#fff',
  },
  mainContent: {
    paddingBottom: '16px',
  },
};

export default Finder;
