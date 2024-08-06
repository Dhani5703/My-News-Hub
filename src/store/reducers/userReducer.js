const initialState = {
  nickname: localStorage.getItem('savedNickname') || ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      localStorage.setItem('savedNickname', action.payload);
      return {
        ...state,
        nickname: action.payload,
      };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('savedNickname', action.payload.nickname);
      return {
        ...state,
        nickname: action.payload.nickname,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      localStorage.removeItem('savedNickname');
      return {
        ...state,
        nickname: '',
      };
    default:
      return state;
  }
};

export default userReducer;
