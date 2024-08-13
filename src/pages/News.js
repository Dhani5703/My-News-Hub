import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
// import { format, subDays } from 'date-fns'; // 날짜 처리를 위해 date-fns 사용
import { useNavigate, useLocation } from 'react-router-dom'; // 페이지네이션을 위한 react-router-dom 사용
import { useSelector } from 'react-redux';
import '../styles/News.css';

const NewsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // URL에서 페이지 번호를 가져오거나 기본값으로 1을 사용
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page')) || 1;

  const [articles, setArticles] = useState([]); // 뉴스 기사 목록을 저장할 상태 변수
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(initialPage); // 현재 페이지 번호를 저장할 상태 변수
  // const [date, setDate] = useState(format(subDays(new Date(), 1), 'yyyy-MM-dd')); // 어제 날짜 설정

  const searchQuery = useSelector((state) => state.search.searchQuery) || 'Apple'; // Redux에서 검색어 가져오기, searchQuery가 변경될 때만 API를 호출하기
  const searchDate = useSelector((state) => state.search.searchDate);

  const pageSize = 10; // 한 페이지에 표시할 기사 수
  const maxPage = 10;
  const apiKey = process.env.REACT_APP_API_KEY; // 환경 변수에서 API 키 가져오기


  //[질문] 이런경우 전역상태에서 API 호출 기능을 관리하는지?!
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
            order: 'desc'
          }
        });
        setArticles(response.data.articles);
        setPageCount(Math.ceil(response.data.totalResults / pageSize));

      } catch (error) {
        console.error('Error fetching news:', error);
        if (error.response) {
          console.error('Response:', error.response);
        }
      }
    };

    fetchNews(searchQuery, searchDate, page); // 페이지, 날짜 또는 검색어가 변경될 때마다 API 호출(ferchNews 함수 호출)
  }, [searchQuery, searchDate, page, apiKey]); // searchQuery 상태도 디펜던시로 추가

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setPage(selectedPage);
    navigate(`?page=${selectedPage}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleFirstPage = () => {
    setPage(1);
    navigate('?page=1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLastPage = () => {
    setPage(pageCount);
    navigate(`?page=${pageCount}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="news-container">
      <main>
        <div className="news-list"> {/* 뉴스 리스트 */}
          {articles.map((article, index) => (
            <div className="news-item" key={index}>
              {article.urlToImage ? (
              <img src={article.urlToImage} alt={article.title} />
            ) : (
              <div className="no-image">No Image Available</div> // 대체 텍스트나 스타일 추가
            )}
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <p>{article.author} - {new Date(article.publishedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
        <div className="pagination-wrapper">
          <button 
            onClick={handleFirstPage} 
            disabled={page === 1} 
            className="pagination-button"
          >
            First
          </button>
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={null}
            pageCount={Math.min(pageCount, maxPage)}
            marginPagesDisplayed={0}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            pageClassName={'pagination-item'}
            pageLinkClassName={'pagination-link'} 
            activeClassName={'active'}
            forcePage={page - 1}
          />
          <button 
            onClick={handleLastPage} 
            disabled={page === pageCount} 
            className="pagination-button"
          >
            Last
          </button>
        </div>
      </main>
    </div>
  );
};

export default NewsPage;
