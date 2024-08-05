import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice'; // searchSlice를 import합니다.

export const store = configureStore({
  reducer: {
    search: searchReducer, // searchSlice로 상태를 관리합니다.
  },
});
