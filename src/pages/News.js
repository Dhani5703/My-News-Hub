import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/News.css';

const NewsPage = () => {
  const [articles, setArticles] = useState([]); //뉴스 기사 목록을 저장할 상태 변수 articles를 선언하고 초기값을 빈 배열로 설정.
  const [page, setPage] = useState(1); //현재 페이지 번호를 저장할 상태 변수 page를 선언하고 초기값을 1로 설정.
  const [date, setDate] = useState('2024-07-30'); // 초기 날짜 설정
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('Apple'); // 실제 검색에 사용할 상태 추가
  const pageSize = 10; // 한페이지에 표시할 기사 수
  const apiKey = process.env.REACT_APP_API_KEY; // 환경 변수에서 API 키 가져오기


  const fetchNews = async (query, date, page) => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything`, {
        // headers: {
        //   'Authorization': `Bearer ${apiKey}`
        // },
        params: {
          apiKey : apiKey,
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
  
  // API 요청을 디바운싱하여 빈도 줄이기
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchNews(searchQuery, date, page);
    }, 500); // 500ms 지연
    
    return () => clearTimeout(timeoutId); // 이전 타임아웃을 정리하여 불필요한 호출 방지
  }, [page, date, searchQuery]); // searchQuery 상태도 디펜던시로 추가

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    setPage(1); // 새로운 검색어로 검색 시 페이지를 1로 리셋
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
