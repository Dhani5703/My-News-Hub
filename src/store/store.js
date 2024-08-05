import { createStore, combineReducers } from 'redux';
import searchReducer from './reducers/searchReducer';
import userReducer from './reducers/userReducer'; // 기존 사용자 리듀서

const rootReducer = combineReducers({
  search: searchReducer,
  user: userReducer,
});

export const store = createStore(rootReducer);
