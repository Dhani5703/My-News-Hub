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

export const loginUser = (email, password, rememberMe, navigate) => async (dispatch) => {
  try {
    const response = await axios.post('https://fa6e5082-57ca-4bc2-b453-f9ba3f1bd89c.mock.pstmn.io/api/login', { email, password });

    if (response.data.status === 200 ) {
      const nickname = response.data.data; // 로그인 응답에서 닉네임 가져오기

      if (rememberMe) {
        localStorage.setItem('savedEmail', email);
      } else {
        localStorage.removeItem('savedEmail');
      }

      localStorage.setItem('savedEmail', email);
      localStorage.setItem('savedNickname', nickname);
      dispatch(loginSuccess(email, nickname)); // Redux store 업데이트

      alert('로그인 성공!');
      navigate('/news');

    } else {
      console.error('로그인 실패! :', response.data);
    }
  } catch (error) {
    console.error('로그인 중 에러가 발생했습니다. :', error);
  }
};



