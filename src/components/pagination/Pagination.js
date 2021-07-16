import React from "react";

const Pagination = ({
  advantagesPerPage,
  totalAdvantages,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalAdvantages / advantagesPerPage); i++) {
    pages.push(i);
  }

  return (
/*     <nav>
      <div className="pagination">
        <a className="page__arrow" onClick={() => paginate(1)}>
          <img src={left_arrow} alt="arrow" />
        </a>
        {pages.map((page) => (
          <a
            onClick={() => paginate(page)}
            className={
              currentPage === page ? "page__link active" : "page__link"
            }
          ></a>
        ))}
        <a className="page__arrow" onClick={() => paginate(2)}>
          <img src={right_arrow} alt="arrow" />
        </a>
      </div>
    </nav> */
    );
};

export default Pagination;
