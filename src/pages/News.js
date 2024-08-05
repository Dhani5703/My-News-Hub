import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, subDays } from 'date-fns'; // 날짜 처리를 위해 date-fns 사용
import { useNavigate, useLocation } from 'react-router-dom'; // 페이지네이션을 위한 react-router-dom 사용
import '../styles/News.css';

const NewsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // URL에서 페이지 번호를 가져오거나 기본값으로 1을 사용
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page')) || 1;

  const [articles, setArticles] = useState([]); //뉴스 기사 목록을 저장할 상태 변수 articles를 선언하고 초기값을 빈 배열로 설정.
  const [page, setPage] = useState(initialPage); //현재 페이지 번호를 저장할 상태 변수 page를 선언하고 초기값을 1로 설정.
  const [date, setDate] = useState(format(subDays(new Date(), 1), 'yyyy-MM-dd')); // 어제 날짜를 'yyyy-MM-dd' 형식으로 설정
  const [query, setQuery] = useState(''); // 사용자가 입력한 검색어를 저장할 상태 변수
  const [searchQuery, setSearchQuery] = useState('Apple'); // 실제 검색에 사용할 상태 변수
  const pageSize = 10; // 한페이지에 표시할 기사 수
  const apiKey = process.env.REACT_APP_API_KEY; // 환경 변수에서 API 키 가져오기

  useEffect(() => {
    const fetchNews = async (query, date, page) => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything`, {
          params: {
            apiKey: apiKey,
            qInTitle: query, // 제목에서만 검색
            from: date,
            page: page,
            pageSize: pageSize,
          }
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
        if (error.response) {
          console.error('Response:', error.response);
      }
    }
  };

    fetchNews(searchQuery, date, page); // 페이지, 날짜 또는 검색어가 변경될 때마다 API를 호출
  }, [page, date, searchQuery, apiKey]); // 만약 apiKey가 애플리케이션의 실행 중에 절대 변경되지 않는다면, 종속성 배열에서 제외할 수도 있습니다.
  
  //오늘 쓴 코드에서 오류난 이유: useEffect를 상위에 둬서 계속 API호출을 심하게 했음.
  //setQuery를 사용해서 (타이핑 할 때X)검색을 할 때만 API호출하도록 수정하였음!

  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(`?page=${newPage}`); // URL에 페이지 번호를 반영
  };

  const handleSearch = () => {
    setSearchQuery(query || 'Apple'); // 검색어가 비어있으면 기본값으로 설정
    setPage(1); // 새로운 검색어로 검색 시 페이지를 1로 리셋
    navigate(`?page=1`); // 검색 시 페이지를 1로 설정하고 URL 업데이트
  };

  const handleKeyPress = (e) => { // Enter 키를 감지하여 handleSearch 함수를 호출합니다.
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="news-container">
      <main>
        <div className="news-search"> {/* 검색바 */}
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress} // Enter 키를 감지하는 이벤트 핸들러 추가
            placeholder="Search" 
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
        <div className="news-list"> {/* 뉴스 리스트 */}
          {articles.map((article, index) => (
            <div className="news-item" key={index}>
              <img src={article.urlToImage} alt={article.title} />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <p>{article.author} - {new Date(article.publishedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
        <div className="pagination"> {/* 페이지네이션 */}
          <button 
            className="pagination-button"
            onClick={() => handlePageChange(page - 1)} 
            disabled={page === 1}
          >
            Previous
          </button>
          {[...Array(5)].map((_, index) => (
            <button 
              key={index} 
              className={page === index + 1 ? 'active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button 
            className="pagination-button"
            onClick={() => handlePageChange(page + 1)} 
            disabled={page === 5}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default NewsPage;
