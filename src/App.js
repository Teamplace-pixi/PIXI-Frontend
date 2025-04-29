import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './StartScreen';
import DictionaryScreen from './DictionaryScreen';
import DictionaryScreen1 from './DictionaryScreen1';
import DictionaryScreen2 from './DictionaryScreen2';
import DictionaryScreen3 from './DictionaryScreen3';
import LoginScreen from './LoginScreen';
import StartLogin from './StartLogin';
import SignUpScreen from './SignUpScreen';
import Home from './Home';
import MyPage from './MyPage';
import Finder from './Finder';
import AIChat from './AIChat';
import AIHowMuch from './AIHowMuch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/dictionary" element={<DictionaryScreen />} />
        <Route path="/page1" element={<DictionaryScreen1 />} />
        <Route path="/page2" element={<DictionaryScreen2 />} />
        <Route path="/page3" element={<DictionaryScreen3 />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/startlogin" element={<StartLogin />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/finder" element={<Finder />} />
        <Route path="/aichat" element={<AIChat />} />
        <Route path="/ai" element={<AIHowMuch />} />
      </Routes>
    </Router>
  );
}

export default App;
