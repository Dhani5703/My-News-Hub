import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from '../api';
import NewsList from '../components/NewsList';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { setSearchQuery, setSearchDate } from '../store/actions/searchActions';
import '../styles/News.css';

const NewsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page')) || 1;
  const [articles, setArticles] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(initialPage);

  const searchQuery = useSelector((state) => state.search.searchQuery) || 'Apple';
  const searchDate = useSelector((state) => state.search.searchDate) || '2024-08-13';

  useEffect(() => {
    dispatch(setSearchQuery('Apple'));
    dispatch(setSearchDate('2024-08-13'));
  }, [dispatch]);

  useEffect(() => {
    navigate('?page=1');
    setPage(1);
  }, [searchQuery, navigate]);

  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchNews(searchQuery, searchDate, page);
      setArticles(data.articles || []);
      setPageCount(Math.ceil(data.totalResults / 10));
    };
    loadNews();
  }, [searchQuery, searchDate, page]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setPage(selectedPage);
    navigate(`?page=${selectedPage}`);
  };

  return (
    <div className="news-container">
      <SearchBar />
      <NewsList articles={articles} />
      <Pagination pageCount={pageCount} currentPage={page} onPageChange={handlePageClick} />
    </div>
  );
};

export default NewsPage;
