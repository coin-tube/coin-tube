import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    height: 255px; width: 166px;
    border: 1px solid #cccccc;
    text-align: center;

    position: relative;
    margin-left: 10px;
    margin-top:1px;
`
const BuyContainer = styled.div`
    height: 255px; width: 166px;
    border: 2px solid black;
    text-align: center;

    position: relative;
    margin-left: 10px;
    margin-top:1px;
`

const BadgeImg = styled.img`
    max-width: 100%; height: 110px;
`

const TextCotainer = styled.div`
    display: block;
    text-align: center;
`
const YouserName = styled.text`
    font-size: 23px; font-weight: bold;
    display: block;

    text-align: center;
`
const Font1 = styled.text`
    display: block;
    color: #CCCCCC;
    font-size: 16px;
`

const BuyButton = styled.div`
    font-size: 23px; font-weight: bold;
    width: 100%;
    background-color: black; color: #FFFFFF;
    position: absolute; bottom: 0;
    cursor: pointer;
`

function Badge(){
    const badgeImg = "https://cdn.shopify.com/s/files/1/0514/6332/3817/products/Prefect_Hufflepuff2_grande.png?v=1610030025";
    const userName = "username";
    const badgeSubscriber = "0.00";
    const badgePrice = "33";
    const badgeBought = false;

    // const badgeImg = badgeinfo.youtuber_img_url;
    // const userName = badgeinfo.youtuber_name;
    // const badgeSubscriber = badgeinfo.floor_price;
    // const badgePrice = badgeinfo.available_badges;
    // const badgeState = badgeinfo.youtuber_img_url;

    const CanBuy =
        <BuyContainer>
            <BadgeImg src={badgeImg}/>
            <TextCotainer>
                <YouserName>{userName}</YouserName>
                <Font1>{badgeSubscriber}</Font1>
                <Font1>{badgePrice} klay</Font1>
            </TextCotainer>
            <BuyButton onClick={""}>BUY</BuyButton>
        </BuyContainer>

    const CantBuy = 
        <Container>
            <BadgeImg src={badgeImg}/>
            <TextCotainer>
                <YouserName>{userName}</YouserName>
                <Font1>{badgeSubscriber}</Font1>
                <Font1>{badgePrice} klay</Font1>
            </TextCotainer>
        </Container>

    return(
        <div>
            {badgeBought? CanBuy: CantBuy}
        </div>
    )
}

export default Badge;