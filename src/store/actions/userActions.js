export const loginSuccess = (username, nickname) => ({
    type: 'LOGIN_SUCCESS',
    payload: { username, nickname },
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  