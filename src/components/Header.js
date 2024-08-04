import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/userActions';
import logo from '../../src/assets/logo.png';
import '../../src/styles/Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nickname = useSelector((state) => state.user.nickname);

  const handleLogout = () => {
    //로그아웃시 전역상태를 초기화하는 기능도 필요()
    localStorage.removeItem('savedUsername');
    dispatch(logout());
    navigate('/login');
  };

  //Login에서 저장되고 Header에서 저장되어서 로그인하고 새로고침해야 닉네임이 뜨는 현상
  //전역상태 라이브러리 공부하고 적용하기
  // useEffect(() => {
  //   const savedNickname = localStorage.getItem('nickname');
  //   if (savedNickname) {
  //     setNickname(savedNickname);
  //   }
  // }, []);


  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="로고" />
      </div>
      <div className="user-info">
        {nickname ? <span>{nickname}님</span> : <span>로그인 해주세요</span>}
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </header>
  );
};


export default Header;
