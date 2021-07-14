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
  },
  reducers: {
    changeValue: (state, action) => {
      state.value = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    booksSuccess: (state, action) => {
      state.books = action.payload;
      state.loading = false;
    },
  },
});

export const loadBooks = (value) => async (dispatch) => {
  dispatch(startLoading());
  try {
    await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${value}&key=${APIKEY}`
      )
      .then((response) => dispatch(booksSuccess(response.data.items)));
  } catch (e) {
    console.error(e.response.data.error);
    dispatch(hasError(e.message));
  }
};

export const { startLoading, hasError, booksSuccess, changeValue } =
  searchSlice.actions;
export default searchSlice.reducer;
