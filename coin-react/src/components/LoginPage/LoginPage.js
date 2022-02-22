import React, { useState, useEffect, useRef } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword  } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';

function LoginPage() {
  const { register, watch, formState: { errors }, handleSubmit } = useForm({mode: "onChange"});
  const [errorFromSubmit, setErrorFromSubmit] = useState("")
  const [loading, setLoading] = useState(false);
  useEffect(() => {});
  const auth = getAuth();

  const onSubmit = async (data) => {
    try {
        console.log("test")
        setLoading(true)
        await signInWithEmailAndPassword(auth, data.email, data.password);
        setLoading(false)
    } catch (error) {
        setErrorFromSubmit(error.message)
        setLoading(false)
        setTimeout(() => {
            setErrorFromSubmit("")
        }, 5000);
    }
  }

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...

      console.log('loginWithGoogle success', token, user);
    } catch (error) {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log('loginWithGoogle error', error);
    }
  };

  return (
    <div>
      <div className="login-form" >
        <div className= "login-head">Coin-Tube</div>
        <div className="baseline"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className= "acinput-container">
            <input type="email" name="email" className="text-field" placeholder="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />{errors.email && errors.email.type === "required" && <p>This name field is required</p>}
            {errors.email && errors.email.type === "maxLength" && <p>알맞는 이메일 형식이 아닙니다</p>}
            <input type="password" name="pw" className="text-field" placeholder="password"/>
          </div>
          <input type="submit" value="Login" className="submit-btn"/>
          <Link to="/register"><input type="submit" value="Signup" className="signup-btn"/></Link>
        </form>
        <div className="line">  info  </div>
        <div className="links">

        {errorFromSubmit &&
                    <p>{errorFromSubmit}</p>
                }
        <div>
        <button onClick={loginWithGoogle} className="google-login-form">continue with google</button>
        </div>
        <a href ="#">비밀번호를 잊어버리셨나요?</a>
      </div>
      </div>
    </div>
  );
}

export default LoginPage;
