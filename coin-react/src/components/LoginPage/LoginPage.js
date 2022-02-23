import React, { useState, useEffect } from 'react';
import Header from '../Header';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getUser } from '../../commons/firestore';

function LoginPage() {
  let navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });
  const [errorFromSubmit, setErrorFromSubmit] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {});
  const auth = getAuth();

  const onSubmit = async (data) => {
    try {
      // console.log('test', data);
      setLoading(true);
      const firebaseUser = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      setLoading(false);
      console.log('user', firebaseUser);

      const user = await getUser(firebaseUser.user.uid);
      if (user.size > 0) {
        // 로그인 성공처리
        console.log('로그인 성공', user);
        const data = user.docs[0];
        localStorage.setItem('user', data.data());
        localStorage.setItem('userid', data.data().uid);
        navigate('/');
      } else {
        // 아직 주소 등록 안한 경우 -> 회원가입 처리
        navigate(
          `/register?uid=${firebaseUser.user.uid}&email=${firebaseUser.user.email}`
        );
      }
    } catch (error) {
      console.log(error);
      setErrorFromSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit('');
      }, 5000);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const firebaseUser = result.user;
      console.log('loginWithGoogle success', token, firebaseUser);

      const user = await getUser(firebaseUser.uid);
      if (user.size > 0) {
        // 로그인 성공처리
        const data = user.docs[0];
        localStorage.setItem('user', data.data());
        localStorage.setItem('userid', firebaseUser.uid);
        navigate('/');
      } else {
        // 아직 주소 등록 안한 경우 -> 회원가입 처리
        navigate(
          `/register?uid=${firebaseUser.uid}&token=${token}&email=${firebaseUser.email}`
        );
      }
    } catch (error) {
      console.log('loginWithGoogle error', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="login-form">
        <div className="login-head">Coin-Tube</div>
        <div className="baseline"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="acinput-container">
            <input
              type="email"
              name="email"
              className="text-field"
              placeholder="email"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && errors.email.type === 'required' && (
              <p>This name field is required</p>
            )}
            {errors.email && errors.email.type === 'maxLength' && (
              <p>알맞는 이메일 형식이 아닙니다</p>
            )}
            <input
              type="password"
              name="pw"
              className="text-field"
              placeholder="password"
              {...register('password', { required: true })}
            />
          </div>
          <input type="submit" value="Login" className="submit-btn" />
          <Link to="/register">
            <input type="submit" value="Signup" className="signup-btn" />
          </Link>
        </form>
        <div className="line"> info </div>
        <div className="links">
          {errorFromSubmit && <p>{errorFromSubmit}</p>}
          <div>
            <button onClick={loginWithGoogle} className="google-login-form">
              continue with google
            </button>
          </div>
          <a href="#">비밀번호를 잊어버리셨나요?</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
