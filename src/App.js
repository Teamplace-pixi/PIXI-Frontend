import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './StartScreen';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import LoginScreen from './LoginScreen';
import StartLogin from './StartLogin';
import SignUpScreen from './SignUpScreen';
import Home from './Home';
import MyPage from './MyPage';
import Finder from './Finder';
import AIChat from './AIChat';
import AIHowMuch from './AIHowMuch';
import SearchPage from './SearchPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/dictionary" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} /> 
        <Route path="/page3" element={<Page3 />} /> 
        <Route path="/page4" element={<Page4 />} /> 
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/startlogin" element={<StartLogin />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/finder" element={<Finder />} />
        <Route path="/aichat" element={<AIChat />} />
        <Route path="/ai" element={<AIHowMuch />} />
        <Route path="/search" element={<SearchPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
