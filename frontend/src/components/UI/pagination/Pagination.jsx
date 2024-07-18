import React from "react";
import { getPagesArray } from "../../../utils/pages";

function Pagination({ totalPages, page, changePage }) {
  let pagesArray = getPagesArray(totalPages);
  return (
    <div className="page-wrapper">
      {pagesArray.map((pageNumber) => (
        <span
          className={page === pageNumber ? "page page-current" : "page"}
          onClick={() => changePage(pageNumber)}
          key={pageNumber}
        >
          {pageNumber}
        </span>
      ))}
    </div>
  );
}

export default Pagination;
