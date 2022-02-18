import './App.css';

// react router-dom 사용 //
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import YoutuberPage from './components/YoutuberPage/YoutuberPage';
import AdminPage from './components/AdminPage/AdminPage';
import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import * as app from './commons/firebase';

// Import the functions you need from the SDKs you need
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase

// const db = getFirestore(app);
function App() {
  // const onClick = async () => {
  //   console.log('test');
  //   const citiesCol = collection(db, 'cities');
  //   const res = await addDoc(citiesCol, {
  //     test: 123,
  //   });
  //   console.log(res);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/youtuber" element={<YoutuberPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
