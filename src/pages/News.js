import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/News.css';

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState('2024-07-30'); // 초기 날짜 설정
  const pageSize = 10;
  const apiKey = process.env.REACT_APP_API_KEY; // 환경 변수에서 API 키 가져오기

  useEffect(() => {
    // console.log('API Key: ',apiKey);

    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          },
          params: {
            q: 'Apple',
            from: date,
            page: page,
            pageSize: pageSize,
            // apiKey: apiKey
          }
        });
        // console.log(response.data)
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
        if (error.response) {
          // console.error('Response data:', error.response.data);
          // console.error('Response status:', error.response.status);
          // console.error('Response headers:', error.response.headers);
        }
      }
    };

    fetchNews();
  }, [page, date, apiKey]); // apiKey는 환경 변수로 변경되지 않으므로, 디펜던시에서 제외해도 됨

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <main>
        <div className="news-search">
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Search" 
          />
          <button>Search</button>
        </div>
        <div className="news-list">
          {articles.map((article, index) => (
            <div className="news-item" key={index}>
              <img src={article.urlToImage} alt={article.title} />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <p>{article.author} - {new Date(article.publishedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
        <div className="pagination">
          {[...Array(5)].map((_, index) => (
            <button 
              key={index} 
              className={page === index + 1 ? 'active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NewsPage;
