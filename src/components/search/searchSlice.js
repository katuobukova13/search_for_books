import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const APIKEY = process.env.REACT_APP_API_KEY;

const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: "",
    books: [],
    loading: false,
    error: false,
    total: 0,
    start: 1,
    step: 30,
    category: "",
    sort: "relevance",
    visible: false,
  },
  reducers: {
    changeValue: (state, action) => {
      state.value = action.payload;
    },
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
    changeSort: (state, action) => {
      state.sort = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    booksSuccess: (state, action) => {
      state.books = action.payload.items;
      state.total = action.payload.totalItems;
      state.loading = false;
      state.visible = true;
    },
    addMore: (state, action) => {
      state.start += 30;
      state.books = state.books.concat(action.payload.items);
      state.loading = false;
    },
    loadSort: (state, action) => {
      state.books = action.payload.items;
      state.total = action.payload.totalItems;
      state.loading = false;
    },
  },
});

export const loadBooks =
  (value, start, step, category, sort) => async (dispatch) => {
    dispatch(startLoading());
    try {
      await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${value}+subject:${category}&orderBy=${sort}&key=${APIKEY}&startIndex=${start}&maxResults=${step}`
        )
        .then((response) => {
          dispatch(booksSuccess(response.data));
        });
    } catch (e) {
      console.error(e.message);
      dispatch(hasError(e.message));
    }
  };

export const loadMoreBooks = (value, start, step) => async (dispatch) => {
  dispatch(startLoading());
  try {
    await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${value}&key=${APIKEY}&startIndex=${start}&maxResults=${step}`
      )
      .then((response) => {
        dispatch(addMore(response.data));
      });
  } catch (e) {
    console.error(e.message);
    dispatch(hasError(e.message));
  }
};

export const loadSortedBooks =
  (value, start, step, category, sort) => async (dispatch) => {
    dispatch(startLoading());
    try {
      await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${value}+subject:${category}&orderBy=${sort}&key=${APIKEY}&startIndex=${start}&maxResults=${step}`
        )
        .then((response) => {
          dispatch(changeCategory(category));
          dispatch(changeSort(sort));
          console.log(response.config.url);
          dispatch(loadSort(response.data));
        });
    } catch (e) {
      console.error(e.message);
      dispatch(hasError(e.message));
    }
  };

export const {
  startLoading,
  hasError,
  booksSuccess,
  changeValue,
  addMore,
  changeCategory,
  changeSort,
  loadSort,
} = searchSlice.actions;
export default searchSlice.reducer;
