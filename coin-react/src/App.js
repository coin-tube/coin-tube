import './App.css';

// react router-dom 사용 //
import { BrowserRouter,Routes, Route, useNavigate } from "react-router-dom";
import MainPage from './components/MainPage/MainPage';
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import YoutuberPage from './components/YoutuberPage/YoutuberPage';
import AdminPage from './components/AdminPage/AdminPage';


// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAb4T2NKUN987fPibQYRXARqn7D8KfwUms',
  authDomain: 'coin-tube-dc1c4.firebaseapp.com',
  projectId: 'coin-tube-dc1c4',
  storageBucket: 'coin-tube-dc1c4.appspot.com',
  messagingSenderId: '812079327528',
  appId: '1:812079327528:web:ce2024b1fe0dc7c541c81d',
  measurementId: 'G-L9B3KWCN51',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

function App() {
  const onClick = async () => {
    console.log('test');
    const citiesCol = collection(db, 'cities');
    const res = await addDoc(citiesCol, {
      test: 123,
    });
    console.log(res);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/youtuber" element={<YoutuberPage/>} />
        <Route path="/admin" element={<AdminPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
