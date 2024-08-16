import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { format, subDays } from 'date-fns'; // 날짜 처리를 위해 date-fns 사용
import { useNavigate, useLocation } from 'react-router-dom'; // 페이지네이션을 위한 react-router-dom 사용
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, setSearchDate } from '../store/actions/searchActions';

import '../styles/News.css';

const NewsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // URL에서 페이지 번호를 가져오거나 기본값으로 1을 사용
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page')) || 1;
  const fromDate = format(subDays(new Date(), 1), 'yyyy-MM-dd'); // 기본날짜(어제)

  const [articles, setArticles] = useState([]); // 뉴스 기사 목록을 저장할 상태 변수
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(initialPage); // 현재 페이지 번호를 저장할 상태 변수

  //console.log(page, pageCount)

  const searchQuery = useSelector((state) => state.search.searchQuery) || 'Apple'; // Redux에서 검색어 가져오기, searchQuery가 변경될 때만 API를 호출하기
  const searchDate = useSelector((state) => state.search.searchDate) || fromDate; // Redux에서 검색 날짜 가져오기, 없으면 기본 날짜(어제)

  const pageSize = 10; // 한 페이지에 표시할 기사 수
  const maxPage = 10;
  const apiKey = process.env.REACT_APP_API_KEY; // 환경 변수에서 API 키 가져오기

   //최초 렌더링 시
  useEffect(() => {
    dispatch(setSearchQuery('Apple')); // 기본 검색어 설정
    dispatch(setSearchDate(fromDate)); // 기본 날짜 설정
  }, [dispatch, fromDate]); // dispatch를 종속성 배열에 추가

  //[질문] 이런 경우 보통 전역상태에서 API 호출 기능을 관리하는지 궁금합니다! 옮겨보려고 했는데 오류가 많이 떠서 일단 작동되는 버전으로 저장했습니다.
  //console.log(searchDate)
  useEffect(() => {
    const fetchNews = async (query, searchDate, page) => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything`, {
          params: {
            apiKey: apiKey,
            qInTitle: query, // 제목에서만 검색
            from: searchDate, // 선택한 날짜 
            to: '2024-08-14',// 선택한 날짜의 하루 또는 현재까지
            //[오류] 가끔 하루정도의 오차가 있습니다. (ex:11일 선택하면 11일,12일 뉴스가 나옴) 찾아보니 한국표준시간이랑 안맞아서 그렇다는데, 아직 해결방법은 못찾았습니다..! 
            page: page,
            pageSize: pageSize,
            // sortBy: 'publishedAt'
          }
        });
        //console.log(response.data)
        if (response.data.articles.length > 0) {
          setArticles(response.data.articles);
          setPageCount(Math.ceil(response.data.totalResults / pageSize));
        } else {
          setArticles([]);
          setPageCount(0);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        if (error.response) {
          console.error('Response:', error.response);
        }
      }
    };

    fetchNews(searchQuery, searchDate, page); // 페이지, 날짜 또는 검색어가 변경될 때마다 API 호출(ferchNews 함수 호출)
  }, [searchQuery, searchDate, page]); // apiKey가 변경될 가능성이 없기 때문에 eslint경고를 무시해도 된다.

  useEffect(() => { //page 상태가 변경될 때마다 useEffect를 통해 스크롤을 맨위로 이동하도록 설정
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }, [page]);
  
  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setPage(selectedPage);
    navigate(`?page=${selectedPage}`);
    //window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleFirstPage = () => {
    navigate('?page=1');
    setPage(1);
    //window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  //[질문] 1페이지가 아닌 페이지에서 검색하면 콘솔에 426에러가 뜨는데, 이유를 모르겠습니다..
  const handleLastPage = () => {
    navigate(`?page=${Math.min(pageCount, maxPage)}`); // 마지막 페이지가 최대 페이지 수 이하로 이동하도록 설정
    setPage(Math.min(pageCount, maxPage));
    //window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="news-container">
      <main>
        <div className="news-list">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div className="news-item" key={index}>
                {article.urlToImage ? (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    onError={(e) => {   // 이미지 로드 실패 시 이미지 숨기고 대체 텍스트 표시
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : (
                  <div className="no-image">No Image Available</div> // 이미지 없을 시, 대체 텍스트
                )}
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <p>{article.author} - {new Date(article.publishedAt).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <div className="no-news">해당 뉴스가 없습니다.</div>
          )}
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
            pageRangeDisplayed={5}  //[질문]버튼 5개만 설정해놨는데 2,3페이지 누르면 6개씩 뜨는 오류가 있어서 페이지네이션 라이브러리 찾아보고 있습니다..!
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            pageClassName={'pagination-item'}
            pageLinkClassName={'pagination-link'}
            activeClassName={'active'}
            forcePage={Math.min(page - 1, pageCount - 1)}
          />
          <button
            onClick={handleLastPage}
            disabled={page === Math.min(pageCount, maxPage)}
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


 