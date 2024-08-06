import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, fetchUserNickname, setUser } from '../store/actions/userActions';
import { setSearchQuery, setSearchDate } from '../store/actions/searchActions'; // 검색 액션 추가
import '../../src/styles/Header.css';
import { format, subDays } from 'date-fns'; // 날짜 처리를 위해 date-fns 사용

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nickname = useSelector((state) => state.user.nickname);
  const searchQuery = useSelector((state) => state.search.searchQuery); // 검색어를 가져옴
  const searchDate = useSelector((state) => state.search.searchDate);
  const [query, setQuery] = React.useState(searchQuery); // 입력 상태
  const [date, setDate] = React.useState(searchDate || format(subDays(new Date(), 1), 'yyyy-MM-dd'));

  useEffect(() => {
    const savedNickname = localStorage.getItem('savedNickname');
    if (savedNickname) {
      dispatch(setUser(savedNickname));
    } else {
      dispatch(fetchUserNickname());
    }
  }, [dispatch]);
  
  useEffect(() => { 
    if (!nickname) { // 로그인 상태 확인, 닉네임 없을 시 loginPage로 이동
      navigate('/login');
    }
  }, [nickname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('savedNickname');
    dispatch(logout());
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value); // 검색어 작성 (검색어 한글자씩 업데이트 될 때마다 호출 되는 현상 수정)
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    dispatch(setSearchDate(e.target.value)); // 날짜가 변경될 때마다 전역 상태 업데이트
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert('검색어를 입력하세요.');
      return;
    }
    dispatch(setSearchQuery(query)); // 검색 버튼을 눌렀을 때 전송 상태로 설정 searchAction호출
    // dispatch(setSearchDate(date)); // 검색 날짜 설정
    navigate('/news');
  };

  return (
    <header className="header">
      <form className="search-form" onSubmit={handleSearchSubmit}>
      <input
          type="date"
          value={date}
          onChange={handleDateChange}
        />        
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
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
