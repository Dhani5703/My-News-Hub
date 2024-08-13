import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: 'Apple', // 초기 검색어
    date: new Date().toISOString().split('T')[1], // 어제 날짜를 기본값으로 설정
    page: 1, // 초기 페이지
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setQuery, setDate, setPage } = searchSlice.actions;
export default searchSlice.reducer;
