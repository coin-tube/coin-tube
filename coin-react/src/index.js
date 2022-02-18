import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAb4T2NKUN987fPibQYRXARqn7D8KfwUms',
//   authDomain: 'coin-tube-dc1c4.firebaseapp.com',
//   projectId: 'coin-tube-dc1c4',
//   storageBucket: 'coin-tube-dc1c4.appspot.com',
//   messagingSenderId: '812079327528',
//   appId: '1:812079327528:web:ce2024b1fe0dc7c541c81d',
//   measurementId: 'G-L9B3KWCN51',
// };
// const app = initializeApp(firebaseConfig);
// console.log('app', app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
