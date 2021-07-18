import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./sorting.css";
import Filter from "../filter/Filter";
import {
  changeCategory,
  loadSortedBooks,
  changeSort,
} from "../search/searchSlice";

const CATEGORY = [
  "all",
  "art",
  "biography",
  "computers",
  "history",
  "medical",
  "poetry",
];
const SORT = ["relevance", "newest"];

const Sorting = () => {
  const { value, start, step, category, sort } = useSelector(
    (state) => state.search
  );
  const dispatch = useDispatch();

  const handleChange = (event) => {
    console.log(event.target.value);
    dispatch(changeCategory(event.target.value));
  };

  const handleChangeSort = (event) => {
    console.log(event.target.value);
    dispatch(changeSort(event.target.value));
  };

  useEffect(() => {
    dispatch(loadSortedBooks(value, start, step, category, sort));
  }, [category, sort]);

  return (
    <div className="sorting">
      <Filter
        name="Category"
        array={CATEGORY}
        onChange={handleChange}
        value={category}
      />
      <Filter
        name="Sort by"
        array={SORT}
        onChange={handleChangeSort}
        value={sort}
      />
    </div>
  );
};

export default Sorting;
