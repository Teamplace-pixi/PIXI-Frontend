import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Banner from './components/Banner';
import StoreListSection from './components/StoreListSection';
import TalentSection from './components/TalentSection';
import BottomNav from './components/BottomNav';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const handleBannerClick = () => {
    navigate('/aichatmain'); 
  };
  return (
    <div className="home-container" style={styles.container}>
      <Header />
      <div className="main-content" style={styles.mainContent}>
        <SearchBar isSearchPage={false} />
        <Banner onClick={handleBannerClick}/>
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
    backgroundColor: '#F8F8F8',
  },
  mainContent: {
    paddingBottom: '16px',
  },
};

export default Home;
