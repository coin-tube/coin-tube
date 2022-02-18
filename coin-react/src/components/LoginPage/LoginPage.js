import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';

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
      <div>LoginPage</div>
      <div>
        <button onClick={loginWithGoogle}>구글로 로그인</button>
      </div>
    </div>
  );
}

export default LoginPage;
