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
      <div class="inner">
        <div class="nav_body">
          <nav>
            <ul class="nav-container">
              <li class="nav-item"><a href="/">Main</a></li>
              <li class="nav-item"><a href="/register">register</a></li>
              <li class="nav-item"><a href="/admin">admin</a></li>
              <li class="nav-item">            {user ? (
              <a href="#" onClick={logout}>
                logout
              </a>
            ) : (
              <a href="/login">Login</a>
            )}</li>
            </ul>
            <div>
            <input class="search_input" type="text" placeholder="Search"></input>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
