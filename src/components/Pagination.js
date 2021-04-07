import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";

const Paginationed = ({
  postsPerPage,
  totalPosts,
  paginate,
  stats,
  currentPage,
  setCurrentPage,
  posts,
}) => {
  const pageNumbers = [];
  for (
    let number = 1;
    number <= Math.ceil(totalPosts / postsPerPage);
    number++
  ) {
    pageNumbers.push(
      <Pagination.Item
        key={number}
        onClick={() => {
          paginate(number);
        }}
        active={currentPage == number}
      >
        {number}
      </Pagination.Item>
    );
  }
  useEffect(() => {
    if (posts.length == 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [posts]);

  return (
    <div>
      {" "}
      <Pagination>{pageNumbers}</Pagination>
    </div>
  );
};
export default Paginationed;
