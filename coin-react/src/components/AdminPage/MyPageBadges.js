import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BadgeHistory from './BadgeHistory';
import Badge from './Badge';

const BadgeIMG = styled.img`
    width: 200px; height: 200px;
    background-color: #777777;
    float: left;
`

const TextArea = styled.div`
    display: inline-block;  
    margin-top: 5px;
    margin-left: 30px;
`
const FontWrapper = styled.div`
    display: inline-block;  
`
const Font1 = styled.text`
    display: block;
    font-size: 16px;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 5px;
`
const Font2 = styled.text`
    color: #b1b1b1;
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
`

const BuyButton = styled.div`
    margin-top: 70px;
    width: 200px; height: 55px;
    background-color: gray;
    cursor: pointer;
    text-align: center; padding: 15px;
    font-weight: bold;
    color: white; font-size: 18px;
`
const BadgeArea = styled.div`
  display: grid;
  margin-top: 30px; margin-left: 30px; margin-right: 30px;
  grid-template-columns: repeat(auto-fill, minmax(10%, auto));
  grid-row-gap: 5%; grid-column-gap: 1%;
  margin-bottom: 7%;
`

function BadgeDetail(){
    return(
        <div style={{float: "left"}}>
            <BadgeIMG/>
            <TextArea>
                <FontWrapper>
                    <Font1>유튜버</Font1>
                    <Font1>발행</Font1>
                    <Font1>발행일</Font1>
                    <Font1>구독자</Font1>
                    <Font1>구매가격</Font1>
                </FontWrapper>
                <FontWrapper style={{marginLeft: "25px"}}>
                    <Font2>{"youtubername"}</Font2>
                    <Font2>{"1차"}</Font2>
                    <Font2>{"0000 - 00 - 00"}</Font2>
                    <Font2>{"000"}</Font2>
                    <Font2>{"00.00"}Klay</Font2>
                </FontWrapper>
            </TextArea>
            <BuyButton>판매</BuyButton>
        </div>
    )
}

function MyPageBadges(){
    return(
    <>
        <div style={{borderBottom: "1px solid #cccccc", height: "340px", padding: "30px"}}>
            <BadgeDetail/>
            <BadgeHistory/>
        </div>
        <BadgeArea>
            {/* {a && a.map((cardinfo) => <Badge/>)} */}
            <Badge/>
        </BadgeArea>
    </>)
}

export default MyPageBadges;