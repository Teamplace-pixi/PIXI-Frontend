import React, { useState } from 'react';
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
import NewPost from './NewPost';
import ServiceCenter from './ServiceCenter';
import PostDetail from './PostDetail';
import SettingsPage from './SettingsPage';
import EditProfilePage from './EditProfilePage';
import FixerPage from './FixerPage';
import FixerBusinessSetting from './FixerBusinessSetting';
import AIchatmain from './AIchatmain';
import AIHowMuchLoading from './AIHowMuchLoading';
import AIHowMuchResult from './AIHowMuchResult';
import BusinessForm from './BusinessForm';
import BusinessFormCheck from './BusinessFormCheck';
import SubscriptionPage from './SubscriptionPage';
import ChatListPage from './ChatListPage';
import ChatRoomPage from './ChatRoomPage';
import Subscribe from './Subscribe';
import PayPalExecutePage from './PayPalExecutePage';
import Estimatehistory from './Estimatehistory';

function App() {
  const [posts, setPosts] = useState([]);

  //구해요
  const handleAddPost = (newPost) => {
    setPosts((prev) => [...prev, newPost]);
  };
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
        <Route path="/finder" element={<Finder posts={posts} />} />
        <Route path="/aichatmain" element={<AIchatmain />} />
        <Route path="/ai" element={<AIHowMuch />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/estimate-history" element={<Estimatehistory />} />
        <Route
          path="/new-post"
          element={<NewPost onAddPost={handleAddPost} />}
        />{' '}
        {/* 작성기능 전달 */}
        <Route path="/service-center/" element={<ServiceCenter />} />
        <Route path="/post/" element={<PostDetail />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/fixer" element={<FixerPage />} />
        <Route path="/aichat" element={<AIChat />} />
        <Route path="/fixer-business" element={<FixerBusinessSetting />} />
        <Route path="/loading" element={<AIHowMuchLoading />} />
        <Route path="/result" element={<AIHowMuchResult />} />
        <Route path="/business" element={<BusinessForm />} />
        <Route path="/businesscheck" element={<BusinessFormCheck />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/chatlist" element={<ChatListPage />} />
        <Route path="/chat/:id" element={<ChatRoomPage />} />
        <Route
          path="/myPage/paypal/execute-payment"
          element={<PayPalExecutePage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
