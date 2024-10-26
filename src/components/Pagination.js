// src/components/Pagination.js
import React from 'react';
import ReactPaginate from 'react-paginate';
// import '../styles/Pagination.css';

const Pagination = ({ pageCount, currentPage, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={'<'}
      nextLabel={'>'}
      breakLabel={null}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={'pagination'}
      activeClassName={'active'}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
