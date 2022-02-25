import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Modal} from 'react-bootstrap';

const Container = styled.div`
    height: 230px; width: 150px;
    border: 1px solid #cccccc;
`

const ImgContainer = styled.div`
    height: 100px; width: 100%;
    position: relative;
    text-align: center;
`
const AvailableBadges = styled.div`
    position: absolute; z-index: 1;
    width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0);
    color: rgba(0, 0, 0, 0);
    // padding-top: 48px;
    font-size: 80px; 
    text-align: center;
    cursor: pointer;
    &:hover {
        transition: 0.5s;
        background-color: rgba(20, 20, 20, 0.7);
        color: rgb(255, 255, 255);
    }
`
const YoutuberImg = styled.img`
    max-width: 100%; height: 100%;
    margin: 0 auto;
`

const TextContainer = styled.div`
    text-align: center;
`

const FloorPrice = styled.text`
    font-size: 18px; font-weight: bold;
    display: block;

    margin-top: 10px;
    margin-bottom: -8px;
`

const Font1 = styled.text`
    color: #CCCCCC;
    font-size: 16px;
`

const AbleButton = styled.button`
    display: inline-block;
    font-size: 18px; font-weight: bold;
    border: 0px;
    display: block;
    width: 101%;
    height: 50px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    margin-top: 15px;
    background-color: black;
    color: #cccccc;
    &:hover {
        transition: 0.5s;
        background-color: rgba(20, 20, 20, 0.7);
        color: rgb(255, 255, 255);
    }
`

function BadgeCard({badgeInfo}){
    console.log('badgeInfo', badgeInfo);
    // const floorPrice = cardinfo.floor_price;
    // const availableBadges = cardinfo.available_badges;
    const [buyShow, setBuyShow] = useState(false);
    const buyClick = () => setBuyShow(true);
    const buyClose = () => setBuyShow(false);

    return(
        <Container>
            <ImgContainer>
                <AvailableBadges>
                </AvailableBadges>
                {/* <YoutuberImg src={}/> */}
            </ImgContainer>
            <TextContainer>
                <FloorPrice>username</FloorPrice>
                <Font1>0</Font1><br/>
                <Font1>0.00klay</Font1>
            </TextContainer>
            <AbleButton onClick={buyClick}>BUY</AbleButton>
            <Modal show={buyShow} onHide={buyClose}>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={buyClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default BadgeCard;