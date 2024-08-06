import { createStore, combineReducers } from 'redux';
import searchReducer from './reducers/searchReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  search: searchReducer,
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
