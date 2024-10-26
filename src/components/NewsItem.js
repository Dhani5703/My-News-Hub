// src/components/NewsItem.js
import React from 'react';
// import '../styles/NewsItem.css';
import Feedback from './Feedback';

const NewsItem = ({ article }) => (
  <div className="news-item">
    {article.urlToImage ? (
      <img
        src={article.urlToImage}
        alt={article.title}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'block';
        }}
      />
    ) : (
      <div className="no-image">No Image Available</div>
    )}
    <h3>{article.title}</h3>
    <p>{article.description}</p>
    <p>{article.author} - {new Date(article.publishedAt).toLocaleDateString()}</p>
    {/*피드백 컴포넌트 추가 */}
    <Feedback articleId={article.source.id} />
  </div>
);

export default NewsItem;
