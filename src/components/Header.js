import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setUser } from '../store/actions/userActions';
import { setSearchQuery, setSearchDate } from '../store/actions/searchActions'; // 검색 액션 추가
import '../../src/styles/Header.css';
import { format, subDays } from 'date-fns'; // 날짜 처리를 위해 date-fns 사용

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const nickname = useSelector((state) => state.user.nickname); //사용자 닉네임을 가져옴(전역상태에서)
  const nickname = useSelector((state) => state.user.nickname) || localStorage.getItem('savedNickname');
  const searchQuery = useSelector((state) => state.search.searchQuery); // 검색어를 가져옴(전역상태에서)
  const searchDate = useSelector((state) => state.search.searchDate); // 검색 날짜를 가져옴(전역상태에서)

  const [query, setQuery] = React.useState(searchQuery); // 로컬상태에서 현재 입력중인 검색어를 관리.
  const [date, setDate] = React.useState(searchDate || format(subDays(new Date(), 1), 'yyyy-MM-dd')); // 로컬상태에서 현재 입력중인 날짜를 관리.

  useEffect(() => {
    const savedNickname = localStorage.getItem('savedNickname');
    if (savedNickname) {
      dispatch(setUser(savedNickname));
    } 
  }, [dispatch]);
  
  useEffect(() => { 
    if (!nickname) { // 로그인 상태 확인, 닉네임 없을 시 loginPage로 이동
      navigate('/login');
    }
  }, [nickname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('savedNickname');
    // localStorage.removeItem('nickname');
    dispatch(logout()); //로그아웃 액션 디스패치
    navigate('/login'); //로그인 페이지로 리다이렉트
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value); // 검색어 작성->로컬상태 업데이트 (검색어 한글자씩 업데이트 될 때마다 호출 되는 현상 수정)
  };

  const handleDateChange = (e) => {
    setDate(e.target.value); //로컬상태 업데이트
    dispatch(setSearchDate(e.target.value)); // 날짜가 변경될 때마다 전역 상태 업데이트
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert('검색어를 입력하세요.');
      return;
    }
    dispatch(setSearchQuery(query)); // 검색 버튼을 눌렀을 때 전송 상태로 설정 searchAction호출, 검색어 상태 Redux에 전역상태 업데이트
    navigate('/news');
  };

  return (
    <header className="header">
      <form className="search-form" onSubmit={handleSearchSubmit}>
      <input
          type="date"
          value={date}
          onChange={handleDateChange} //로컬상태 업데이트
        />        
        <input
          type="text"
          value={query}
          onChange={handleSearchChange} //로컬상태 업데이트
          placeholder="검색어를 입력하세요."
        />
        <button type="submit">Search</button>
      </form>
      <div className="user-info">
        {nickname ? <span>{nickname}님</span> : <span>_____님 </span>}
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </header>
  );
};

export default Header;
