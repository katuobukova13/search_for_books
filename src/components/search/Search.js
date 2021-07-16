import React, { useRef, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import "./search.css";
import Spinner from "../spinner/Spinner";
import { loadBooks, changeValue, loadMoreBooks } from "./searchSlice";

const Search = () => {
  const input = useRef(null);

  const { value, books, loading, total, start, step, hasMore } = useSelector(
    (state) => state.search
  );

  const dispatch = useDispatch();

  const focus = useCallback(() => input.current?.focus(), []);

  const handleChange = (e) => {
    dispatch(changeValue(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value !== "") {
      dispatch(loadBooks(value, start, step));
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
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className="search__button"
          onClick={focus}
        >
          Search
        </Button>
      </form>

      <p className="total">{total}</p>

      {loading && <Spinner />}

      <div className="books">
        {books.map((book, key) => (
          <div className="book" key={book.id}>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
              className="book__img"
            />
            <p className="book__category">
              Category: {book.volumeInfo.categories}
            </p>
            <h3 className="book__title">{book.volumeInfo.title}</h3>
            <p className="book__authors">{book.volumeInfo.authors}</p>
          </div>
        ))}
      </div>
      {!loading && (
        <button onClick={() => dispatch(loadMoreBooks(value, start, step))}>
          Load more
        </button>
      )}
    </div>
  );
};

export default Search;
