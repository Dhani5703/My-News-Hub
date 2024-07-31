import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="로고" />
      </div>
      <div className="user-info">
        <span>테스트님</span>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </header>
  );
};

export default Header;
