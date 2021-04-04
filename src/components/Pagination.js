import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";

const Paginationed = ({ postsPerPage, totalPosts, paginate, stats }) => {
  //   const [active, setActive] = useState(false);
  const pageNumbers = [];
  //   const activeHandler = () => {
  //     setActive(() => !active);
  //   };
  let active = 2;
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
          active = number + 1;
        }}
        active={number == active}
      >
        {number}
      </Pagination.Item>
    );
    console.log(pageNumbers);
  }

  return (
    // <nav>
    //   <ul className="pagination">
    //     {pageNumbers.map((number) => (
    //       <li
    //         key={number}
    //         onClick={activeHandler}
    //         className={`page-item ${active ? "active" : ""}`}
    //       >
    //         <a
    //           onClick={() => paginate(number)}
    //           href="!#"
    //           className="page-link "
    //         >
    //           {number}
    //         </a>
    //       </li>
    //     ))}
    //   </ul>
    // </nav>

    // <nav>
    //   <Pagination>
    //     {pageNumbers.map((number) => (
    //       <Pagination.Item key={number} active={number === active}>
    //         <a
    //           onClick={() => paginate(number)}
    //           href="!#"
    //           className="page-link "
    //         >
    //           {number}
    //         </a>
    //       </Pagination.Item>
    //     ))}
    //   </Pagination>
    // </nav>

    <div>
      {" "}
      <Pagination>{pageNumbers}</Pagination>
    </div>
  );
};
export default Paginationed;
