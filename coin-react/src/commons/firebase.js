import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAb4T2NKUN987fPibQYRXARqn7D8KfwUms',
  authDomain: 'coin-tube-dc1c4.firebaseapp.com',
  projectId: 'coin-tube-dc1c4',
  storageBucket: 'coin-tube-dc1c4.appspot.com',
  messagingSenderId: '812079327528',
  appId: '1:812079327528:web:ce2024b1fe0dc7c541c81d',
  measurementId: 'G-L9B3KWCN51',
};
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export default app;
