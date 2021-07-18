import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonCastome from "../button/Button";
import "./books.css";
import Spinner from "../spinner/Spinner";
import { loadMoreBooks } from "../search/searchSlice";
import { BrowserRouter as Link } from "react-router-dom";

const Books = () => {
  const { value, start, step, books, total, loading, visible } = useSelector(
    (state) => state.search
  );

  const dispatch = useDispatch();

  useEffect(() => {
    loadMoreBooks();
  }, []);

  return (
    <>
      {loading && <Spinner />}

      {visible && !loading && <p className="total">Found: {total}</p>}

      {visible && (
        <div className="books">
          {books.map((book, key) => {
            let category = "";
            if (book.volumeInfo.categories) {
              category = book.volumeInfo.categories;
            }

            let authors = "";
            if (book.volumeInfo.authors) {
              authors = book.volumeInfo.authors;
            }

            let img = "";
            if (book.volumeInfo.imageLinks?.thumbnail) {
              img = book.volumeInfo.imageLinks?.thumbnail;
            }

            let description = "";
            if (book.volumeInfo.description) {
              description = book.volumeInfo.description;
            }

            return (
              <div className="book" key={book.id}>
                <Link
                  className="book__link"
                  to={{
                    pathname: `/${book.id}`,
                    state: {
                      id: `${book.id}`,
                      img: `${img}`,
                      title: `${book.volumeInfo.title}`,
                      categories: `${category}`,
                      authors: `${authors}`,
                      desc: `${description}`,
                    },
                  }}
                >
                  <img
                    src={img}
                    alt={book.volumeInfo.title}
                    className="book__img"
                  />
                  <div className="book__desc">
                    <p className="book__category">{category}</p>
                    <h3 className="book__title">{book.volumeInfo.title}</h3>
                    <p className="book__authors">{authors}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
      {!loading && visible && (
        <ButtonCastome
          onClick={() => dispatch(loadMoreBooks(value, start, step))}
          buttonName="Load More"
          id="load__button"
        />
      )}
    </>
  );
};

export default Books;
