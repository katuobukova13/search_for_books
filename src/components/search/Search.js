import React, { useRef, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonCastome from "../button/Button";
import "./search.css";
import Spinner from "../spinner/Spinner";
import { loadBooks, changeValue, loadMoreBooks } from "./searchSlice";
import Sorting from "../sorting/Sorting";

const Search = () => {
  const input = useRef(null);

  const { value, books, loading, total, start, step, category, sort } =
    useSelector((state) => state.search);

  const dispatch = useDispatch();

  const focus = useCallback(() => input.current?.focus(), []);

  const handleChange = (e) => {
    dispatch(changeValue(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value !== "") {
      dispatch(loadBooks(value, start, step, category, sort));
    }
  };

  useEffect(() => {
    loadMoreBooks();
  }, []);

  return (
    <div className="search">
      <form onSubmit={handleSubmit} autoComplete="off" className="search__form">
        <div className="search__form">
          <input
            className="search__input"
            label="Search"
            ref={input}
            value={value}
            onChange={handleChange}
          />
        </div>
        <ButtonCastome
          onClick={focus}
          buttonName="Search"
          id="search__button"
        />
      </form>

      <Sorting />

      <p className="total">{total}</p>

      {loading && <Spinner />}

      <div className="books">
        {books.map((book, key) => {
          return (
            <div className="book" key={book.id}>
              <a target="_blank" href="#">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail}
                  alt={book.volumeInfo.title}
                  className="book__img"
                />
                <p className="book__category">{book.volumeInfo.categories}</p>
                <h3 className="book__title">{book.volumeInfo.title}</h3>
                <p className="book__authors">{book.volumeInfo.authors}</p>
              </a>
            </div>
          );
        })}
      </div>
      {!loading && (
        <ButtonCastome
          onClick={() => dispatch(loadMoreBooks(value, start, step))}
          buttonName="Load More"
          id="load__button"
        />
      )}
    </div>
  );
};

export default Search;
