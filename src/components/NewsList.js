// src/components/NewsList.js
import React from 'react';
import NewsItem from './NewsItem';
import '../styles/NewsList.css';

const NewsList = ({ articles }) => (
  <div className="news-list">
    {articles.length > 0 ? (
      articles.map((article, index) => (
        <NewsItem key={index} article={article} />
      ))
    ) : (
      <div className="no-news">해당 뉴스가 없습니다.</div>
    )}
  </div>
);

export default NewsList;
