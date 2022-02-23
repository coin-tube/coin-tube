import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import styled from 'styled-components';
import YoutuberCard from './YoutuberCard';
import { getCreators } from '../../commons/firestore';

const CardContainer = styled.div`
  display: grid;
  background-color: white;
  margin-left: 30px; margin-right: 30px;
  grid-template-columns: repeat(auto-fill, minmax(18%, auto));
  grid-row-gap: 3%; grid-column-gap: 1%;
  margin-bottom: 7%;
`

function MainPage() {
  const [page, setPage] = useState(1);
  const [Youtubers, setYoutubers] = useState([]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    console.log(scrollTop);
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const loadYoutuber = async () => {
      const NewYoutubers = await getCreators();;
      setYoutubers((prev) => [...prev, ...NewYoutubers]);
      console.log(Youtubers);
      
    };

    loadYoutuber();
  }, [page]);

  return (
    <div>
      <Header />
      <CardContainer onScroll={handleScroll}>
        {Youtubers && Youtubers.map((cardinfo) => <YoutuberCard cardinfo={cardinfo}/>)}
      </CardContainer>
    </div>
  );
}

export default MainPage;
