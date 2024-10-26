// src/api.js
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

export const fetchNews = async (query, searchDate, page, pageSize = 10) => {
  const response = await axios.get(`https://newsapi.org/v2/everything`, {
    params: {
      apiKey,
      qInTitle: query,
      from: searchDate,
      to: '2024-08-14',
      page,
      pageSize,
    }
  });
  return response.data;
};
