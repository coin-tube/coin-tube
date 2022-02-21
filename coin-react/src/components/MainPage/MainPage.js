import React from 'react';
import Header from '../Header';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

import YoutuberCard from './YoutuberCard';

function MainPage() {
  return (
    <div>
      <Header/>
      Main
      <YoutuberCard/>
    </div>
  );
}

export default MainPage;
