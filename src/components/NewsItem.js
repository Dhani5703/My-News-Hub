// src/components/NewsItem.js
import React from 'react';
import '../styles/NewsItem.css';

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
  </div>
);

export default NewsItem;
