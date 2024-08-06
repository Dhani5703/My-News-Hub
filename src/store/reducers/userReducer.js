const initialState = {
    username: '',
    nickname: '',
    isLoggedIn: false,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          username: action.payload.username,
          nickname: action.payload.nickname,
          isLoggedIn: true,
        };
      case 'LOGOUT':
        return {
          ...state,
          nickname: '',
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  