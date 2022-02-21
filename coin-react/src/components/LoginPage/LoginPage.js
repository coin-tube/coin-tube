import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {Link} from 'react-router-dom';

function LoginPage() {
  useEffect(() => {});

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
        <form method="get" action="#">
          <div className= "acinput-container">
            <input type="text" name="user_name" className="text-field" placeholder="email"/>
            <input type="password" name="pw" className="text-field" placeholder="password"/>
          </div>
          <input type="submit" value="Login" className="submit-btn"/>
          <Link to="/register"><input type="submit" value="Signup" className="signup-btn"/></Link>
        </form>
        <div className="line">  or  </div>
        <div className="links">
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
