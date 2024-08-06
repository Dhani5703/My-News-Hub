import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/userActions';
import { setSearchQuery } from '../store/actions/searchActions'; // 검색 액션 추가
import logo from '../../src/assets/logo.png';
import '../../src/styles/Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nickname = useSelector((state) => state.user.nickname);
  const searchQuery = useSelector((state) => state.search.searchQuery); // 검색어를 가져옴
  const [query, setQuery] = React.useState(searchQuery); // 입력 상태

  const handleLogout = () => {
    localStorage.removeItem('savedUsername');
    dispatch(logout());
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value); // 검색어 작성 (검색어 한글자씩 업데이트 될 때마다 호출 되는거 수정)
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert('검색어를 입력하세요.');
      return;
    }
    dispatch(setSearchQuery(query)); // 검색 버튼을 눌렀을 때 전송 상태로 설정 searchAction호출
    navigate('/news');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="로고" />
      </div>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search"
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
