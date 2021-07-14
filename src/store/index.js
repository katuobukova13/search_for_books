import { configureStore, combineReducers } from "@reduxjs/toolkit";
import searchSlice from "../components/search/searchSlice";

const rootReducer = combineReducers({
  search: searchSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
