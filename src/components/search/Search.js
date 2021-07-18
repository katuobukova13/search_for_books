import React, { useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonCastome from "../button/Button";
import "./search.css";
import { loadBooks, changeValue } from "./searchSlice";
import Sorting from "../sorting/Sorting";

const Search = () => {
  const input = useRef(null);

  const { value, start, step, category, sort } = useSelector(
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
      dispatch(loadBooks(value, start, step, category, sort));
    }
  };

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
    </div>
  );
};

export default Search;
