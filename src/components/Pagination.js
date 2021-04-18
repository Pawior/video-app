import React, { useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginationed = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  setCurrentPage,
  posts,
}) => {
  useEffect(() => {
    if (posts.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [posts]); // eslint-disable-line react-hooks/exhaustive-deps
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
        active={currentPage === number}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      {" "}
      <Pagination>{pageNumbers}</Pagination>
    </div>
  );
};
export default Paginationed;
