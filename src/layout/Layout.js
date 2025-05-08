import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const Layout = () => {
  return (
    <div style={{ paddingBottom: '60px' }}>
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default Layout;
