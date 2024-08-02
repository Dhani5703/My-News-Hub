import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import '../../src/styles/Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Header/>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
