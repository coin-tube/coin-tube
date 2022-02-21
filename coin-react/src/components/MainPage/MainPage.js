import React, {useState, useEffect} from 'react';
import Header from '../Header';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import styled from 'styled-components';
import YoutuberCard from './YoutuberCard';

function MainPage() {
  const [page, setPage] = useState(1);
  const [Youtubers, setYoutubers] = useState([]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    console.log(scrollTop);
    if (scrollHeight - scrollTop === clientHeight) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    const loadYoutuber = async () => {
      // const NewYoutubers = await ;
      // setYoutubers((prev) => [...prev, ...NewYoutubers]);
    };

    loadYoutuber();
  }, [page]);

  return (
    <div>
      <Header/>
      <Container onScroll={handleScroll}>
        {Youtubers && Youtubers.map((Youtuber) => <YoutuberCard/>)}
      </Container>
    </div>
  );
}

export default MainPage;