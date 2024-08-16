import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/actions/userActions';

import '../../src/styles/Login.css';
import logo from '../assets/logo.png'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isEmailValid, setIsEmailValid] = useState(true); (수정 email변수로 이메일 유효성 검사하기.)
  const [rememberMe, setRememberMe] = useState(false); // 아이디 저장 체크박스 상태
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  //이메일 형식으로 유효성 체크
  const validateEmail = (email) => { 
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  //이메일 입력 값 변경 시 호출되는 함수
  const handleEmailChange = (e) => {
    setEmail(e.target.value); //이메일 상태 업데이트
    // setIsEmailValid(validateEmail(e.target.value)); //이메일 유효성 검사 결과 업데이트
  };

  //비밀번호 입력 값 변경 시 호출되는 함수
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // "아이디 저장" 체크박스 상태 변경 시 호출되는 함수
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
    };


  //페이지 로드시 로컬 스토리지에서 이메일 가져오기
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail'); 
    if(savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true); // 저장된 이메일이 있을 경우 체크박스를 체크 상태로 설정
    }
  }, []);

    //로그인 제출 시 호출되는 함수
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateEmail(email)) {
        //로그인요청
        dispatch(loginUser(email, password, rememberMe, navigate)); //로그인 통신 전역상태로 관리
      } else {
        alert('이메일 형식이 올바르지 않습니다.');
      }
    };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="logo">
          <img src={logo} alt="로고" />
        </div>
        <div>
          <label htmlFor="email">아이디</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className={!validateEmail(email) ? 'error' : ''} 
          /> 
          {!validateEmail(email) && email && (
            <div className="error-message">이메일 형식이 올바르지 않습니다.</div>
            )} {/* 이메일 유효하지 않은 경우 에러 메시지 표시 */}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="remember-me">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            아이디 저장
          </label>
        </div>
        <button type="submit" disabled={!email || !password}>로그인</button> {/* 이메일 또는 비밀번호가 비어 있는 경우 로그인 버튼 비활성화 */} 
      </form>
    </div>
  );
};

export default LoginPage;
