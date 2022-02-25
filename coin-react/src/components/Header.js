import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  width: 500px;

  input {
    margin-left: 100px;
    width: 300px;
    height: 34px;
    background: #cccccc;
    border: 1px solid #aaaaaa;
    box-sizing: border-box;
    border-radius: 10px;
  }
`;

function Header() {
  const [keyword, setKeyword] = React.useState('');
  let navigate = useNavigate();
  const user = localStorage.getItem('user');

  const search = () => {
    navigate.replace(`/?search=${keyword}`);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('userid');
    navigate('/');
  };
  return (
    <div>
      <div class="inner">
        <div class="nav_body">
          <nav>
            <ul class="nav-container">
              <li class="nav-item">
                <a href="/">CoinTube</a>
              </li>
              <li>
                <SearchContainer>
                  <input
                    type="text"
                    onKeyDown={onKeyDown}
                    onChange={handleChange}
                    value={keyword}
                  ></input>
                  {/* <button onClick={search}>검색하기</button> */}
                </SearchContainer>
              </li>

              {user ? (
                <>
                  <li class="nav-item">
                    <a href="/admin">My page</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" onClick={logout}>
                      logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li class="nav-item">
                    <a href="/login">Login</a>
                  </li>
                  <li class="nav-item">
                    <a href="/register">register</a>
                  </li>
                </>
              )}
            </ul>
            <div class="search_input"></div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
