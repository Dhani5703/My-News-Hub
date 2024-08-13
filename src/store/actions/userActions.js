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

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('https://fa6e5082-57ca-4bc2-b453-f9ba3f1bd89c.mock.pstmn.io/api/login', { email, password });

    if (response.data.success) {
      const nickname = response.data.nickname; // 로그인 응답에서 닉네임 가져오기

      localStorage.setItem('savedEmail', email);
      localStorage.setItem('savedNickname', nickname);

      dispatch(loginSuccess(email, nickname)); // Redux store 업데이트
    } else {
      console.error('Login failed:', response.data.message);
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};



