// src/components/SearchBar.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery, setSearchDate } from '../store/actions/searchActions';

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleQueryChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleDateChange = (e) => {
    dispatch(setSearchDate(e.target.value));
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." onChange={handleQueryChange} />
      <input type="date" onChange={handleDateChange} />
    </div>
  );
};

export default SearchBar;
