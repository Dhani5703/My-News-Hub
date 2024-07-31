import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/logo.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

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
          {!isEmailValid && <div className="error-message">이메일 형식이 올바르지 않습니다.</div>}
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
        <button type="submit" disabled={!email || !password}>로그인</button>
      </form>
    </div>
  );
};

export default Login;
