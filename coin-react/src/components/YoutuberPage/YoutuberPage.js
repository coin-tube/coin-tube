import React from 'react'
import styled from 'styled-components';
import Badge from '../AdminPage/Badge';
import Header from '../Header';
import {useLocation} from "react-router-dom";


const BackgroundIMG = styled.div`
  width: 100%; height: 250px;
  background-color: #cccccc;
`
const YoutuberProfileIMG = styled.div`
  width: 170px; height: 170px;
  background-color: #dddddd;
  margin: 0 auto; margin-top: -100px;
  border-radius: 50%
`
const YoutuberName = styled.div`
  text-align: center;
  margin-top: 10px;
  font-weight: bold; font-size: 30px;
`

const FontArea = styled.div`
  display: inline-block;
  text-align: center;
  margin-left: 15px; margin-right: 15px;
`
const Font1 = styled.text`
  font-size: 18px;
  font-weight: bold;
`
const Font2 = styled.text`
  display: block; 
  font-size: 16px; color: #cccccc;
  margin-top: -5px;
`
const Partition = styled.div`
  height: 35px;
  display: inline-block;
  border: 1px solid #ededed;
`

const YoutuberPageArea = styled.div`
  margin-top: 20px;
  text-align: center;
`

const YoutuberText = styled.div`
  border: 1px solid #ebebeb;
  width: 800px; height:200px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 15px;
  text-align: center;
  color: #1b1b1b; font-size: 14px;
`

const BadgeArea = styled.div`
  display: grid;
  margin-top: 30px; margin-left: 30px; margin-right: 30px;
  grid-template-columns: repeat(auto-fill, minmax(10%, auto));
  grid-row-gap: 5%; grid-column-gap: 1%;
  margin-bottom: 7%;
`

function YoutuberSummary(){
  return(
    <YoutuberPageArea>
      <FontArea>
        <Font1>1st</Font1>
        <Font2>publisher</Font2>
      </FontArea>
      <Partition/>
      <FontArea>
        <Font1>13</Font1>
        <Font2>available badges</Font2>
      </FontArea>
      <Partition/>
      <FontArea>
        <Font1>1st</Font1>
        <Font2>subscriber</Font2>
      </FontArea>
    </YoutuberPageArea>
  )
}

function YoutuberPage() {
  const location = useLocation();
  console.log('state', location.state.creatorID);
  return (
    <>
      <Header/>
      <div style={{display: "relative"}}>
        <BackgroundIMG/>
        <YoutuberProfileIMG/>
        <YoutuberName>{"youtubername"}</YoutuberName>
      </div>
      <YoutuberSummary/>
      <YoutuberText>{"안녕하세요"}</YoutuberText>
      <BadgeArea>
        {/* {a && a.map((cardinfo) => <Badge/>)} */}
        <Badge/>
      </BadgeArea>
    </>
  )
}

export default YoutuberPage