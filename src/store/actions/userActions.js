import axios from 'axios';

export const loginSuccess = (username, nickname) => ({
  type: 'LOGIN_SUCCESS',
  payload: { username, nickname },
});

export const setUser = (nickname) => ({
  type: 'SET_USER',
  payload: nickname,
});

export const logout = () => ({
  type: 'LOGOUT',
});


export const fetchUserNickname = () => async (dispatch) => {
  try {
    const response = await axios.get('https://fa6e5082-57ca-4bc2-b453-f9ba3f1bd89c.mock.pstmn.io/api/login'); 
    const nickname = response.data.nickname;

    // localStorage.setItem('savedNickname', nickname); // 로컬 스토리지에 저장

    dispatch(setUser(nickname));
  } catch (error) {
    console.error('Error fetching user nickname:', error);
  }
};
