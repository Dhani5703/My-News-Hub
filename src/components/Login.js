import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/logo.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigate = useNavigate();

  //이메일 형식으로 유효성 체크
  const validateEmail = (email) => { 
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  //이메일 입력 값 변경 시 호출되는 함수
  const handleEmailChange = (e) => {
    setEmail(e.target.value); //이메일 상태 업데이트
    setIsEmailValid(validateEmail(e.target.value)); //이메일 유효성 검사 결과 업데이트
  };

  //비밀번호 입력 값 변경 시 호출되는 함수
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //로그인 제출 시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      navigate('/table');
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
            className={!isEmailValid ? 'error' : ''}
          />
          {!isEmailValid && <div className="error-message">이메일 형식이 올바르지 않습니다.</div>} {/* 이메일 유효하지 않은 경우 에러 메시지 표시 */}
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
        <button type="submit" disabled={!email || !password}>로그인</button> {/* 이메일 또는 비밀번호가 비어 있는 경우 로그인 버튼 비활성화 */}
      </form>
    </div>
  );
};

export default Login;
