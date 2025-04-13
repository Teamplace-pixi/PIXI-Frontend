import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MyPage from './pages/MyPage';
import Wiki from './pages/Wiki';
import WikiNewDocs from './pages/WikiNewDocs';
import Subscribe from './pages/Subscribe';
import Layout from './layout/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Subscribe />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
