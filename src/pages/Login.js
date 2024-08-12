import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/actions/userActions';

import '../../src/styles/Login.css';
import logo from '../assets/logo.png'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
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
    setIsEmailValid(validateEmail(e.target.value)); //이메일 유효성 검사 결과 업데이트
  };

  //비밀번호 입력 값 변경 시 호출되는 함수
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

    // "아이디 저장" 체크박스 상태 변경 시 호출되는 함수
    const handleRememberMeChange = (e) => {
      setRememberMe(e.target.checked);
    };

  //로그인 제출 시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      navigate('/news');
    } else {
      alert('이메일 형식이 올바르지 않습니다.');
    }
  };

  //페이지 로드시 로컬 스토리지에서 이메일 가져오기
  useEffect(() => {
    const savedEmail = localStorage.getItem('email'); //'email'?'savedEmail'?
    if(savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true); // 저장된 이메일이 있을 경우 체크박스를 체크 상태로 설정
    }
  }, []);

  const handleLogin = async () => {
    // 로그인 요청 보내기
    try {
      const response = await fetch('https://fa6e5082-57ca-4bc2-b453-f9ba3f1bd89c.mock.pstmn.io/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if(response.ok){
        if(rememberMe) {
          localStorage.setItem('savedEmail',email); //로그인 성공시 아이디를 로컬스토리지에 저장한다.
        } else {
          localStorage.removeItem('savedEmail'); // 체크 해제 시 저장된 이메일 삭제
        }
        dispatch(loginSuccess(email, data.data)); //data.data에 닉네임저장 
        alert('로그인 성공!');
        navigate('/news'); //
      } else {
        alert('로그인 실패!: ', data.message);
      }
      // window.location.href = '/news';
    } catch (error) {
      alert('로그인중 에러가 발생했습니다.');
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
        <button type="submit" onClick={handleLogin} disabled={!email || !password}>로그인</button> {/* 이메일 또는 비밀번호가 비어 있는 경우 로그인 버튼 비활성화 */}
      </form>
    </div>
  );
};

export default LoginPage;
