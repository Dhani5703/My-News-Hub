const initialState = {
  searchQuery: '',
  searchDate: ''
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };
      case 'SET_SEARCH_DATE':
      return {
        ...state,
        searchDate: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
