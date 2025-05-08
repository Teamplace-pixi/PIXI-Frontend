import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Banner from './components/Banner';
import StoreListSection from './components/StoreListSection';
import TalentSection from './components/TalentSection';
import BottomNav from './components/BottomNav';

function Home() {
  return (
    <div className="home-container" style={styles.container}>
      <Header />
      <div className="main-content" style={styles.mainContent}>
        <SearchBar isSearchPage={false} />
        <Banner />
        <StoreListSection />
        <TalentSection />
      </div>
      <BottomNav />
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'sans-serif',
    position: 'relative',
    minHeight: '100vh',
    paddingTop: '60px',
    paddingBottom: '16px',
    backgroundColor: '#fff',
  },
  mainContent: {
    paddingBottom: '16px',
  },
};

export default Home;
