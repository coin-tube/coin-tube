import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    height: 415px; width: 345px;
    border: 1px solid #cccccc;
`

const ImgContainer = styled.div`
    height: 270px; width: 345px;
    position: relative;
`
const AvailableBadges = styled.div`
    position: absolute; z-index: 1;
    width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0);
    color: rgba(0, 0, 0, 0);
    padding-top: 60px;
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
    position: absolute; z-index: 0;
    object-fit: cover;
`

const TextContainer = styled.div`
    position: static;
    padding-left: 30px;
`
const YoutuberName = styled.text`
    font-size: 23px; font-weight: bold;
    display: inline-block;
    text-decoration: none; cursor: pointer; color: black;
    margin-top: 20px;
`
const FloorPrice = styled.text`
    font-size: 23px; font-weight: bold;
    display: block;

    margin-top: 10px;
    margin-bottom: -10px;
`

const Font1 = styled.text`
    color: #CCCCCC;
    font-size: 16px;
`

function YoutuberCard({}){
    const navigate = useNavigate();

    const youtuberName = "yourubername";
    const floorPrice = "0.00";
    const availableBadges = "33";
    const youtuberImgUrl = "https://mground.kr/wp-content/uploads/2022/01/%EC%B9%A8%EC%B0%A9%EB%A7%A8.webp";

    // const youtuberName = cardinfo.youtuber_name;
    // const floorPrice = cardinfo.floor_price;
    // const availableBadges = cardinfo.available_badges;
    // const youtuberImgUrl = cardinfo.youtuber_img_url;

    function toYoutuberPage(creatorID){
        navigate({
            pathname: "/youtuberPage",
            state: {creatorID}
       })
    }

    return(
        <Container>
            <ImgContainer>
                <AvailableBadges onClick={() => toYoutuberPage(youtuberName)}>
                    {availableBadges}
                </AvailableBadges>
                <YoutuberImg src={youtuberImgUrl}/>
            </ImgContainer>
            <TextContainer>
                <YoutuberName onClick={() => toYoutuberPage(youtuberName)}>
                    {youtuberName}
                </YoutuberName>
                <FloorPrice>{floorPrice}</FloorPrice>
                <Font1>floor price</Font1>
            </TextContainer>
        </Container>
    );
}

export default YoutuberCard;