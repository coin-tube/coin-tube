import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  let navigate = useNavigate();
  const user = localStorage.getItem('user');

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div>
      Header
      <div>
        <a href="/">Main</a>
        <br></br>

        <br></br>
        <a href="/register">register</a>
        <br></br>
        <a href="/main">main-real</a>
        <br></br>

        {user ? (
          <a href="#" onClick={logout}>
            logout
          </a>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </div>
  );
}

export default Header;
