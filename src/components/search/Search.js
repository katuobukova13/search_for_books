import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import "./search.css";
import Spinner from "../spinner/Spinner";
import { loadBooks, changeValue } from "./searchSlice";

const Search = () => {
  /*   const [value, setValue] = useState(""); */
  /*   const [books, setBooks] = useState([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyCB8PfFXDphK1Tya39UxBb-mzHv_qCSoK8"
  ); */
  const textArea = useRef(null);
  /*   const [loading, setLoading] = useState(false); */

  const { value, books, loading } = useSelector((state) => state.search);

  const dispatch = useDispatch();

  /*  useEffect(() => {
    dispatch(loadBooks());
  }, [dispatch]);  */

  const focus = useCallback(() => textArea.current?.focus(), []);

  /*   const loadBooks = useCallback(
    (value) => {
      setLoading(true);
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            value +
            "&key=" +
            apiKey
        )
        .then((data) => {
          setBooks(data.data.items);
        });
      setLoading(false);
    },
    [value]
  ); */

  const handleChange = (e) => {
    dispatch(changeValue(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value !== "") {
      dispatch(loadBooks(value));
    }
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit} autoComplete="off" className="search__form">
        <div className="search__form">
          <input
            className="search__input"
            label="Search"
            ref={textArea}
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

      {loading ? (
        <Spinner />
      ) : (
        <div className="books">
          {books.map((book, key) => (
            <div className="book" key={book.id}>
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
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
      )}
    </div>
  );
};

export default Search;
