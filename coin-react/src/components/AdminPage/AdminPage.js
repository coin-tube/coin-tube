import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import MypageProfile from './MypageProfile';
import MyPageBadges from './MyPageBadges';
import YoutuberProfile from './YoutuberProfile';
// import { getBalance } from "../../api/UseCaver";
import { getKlipAddress } from '../../commons/firestore';
import { getAddress } from '../../api/UseKlip';

const TabText = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 10px; margin-right: 10px;
  padding-top: 10px; padding-bottom: 20px; 
  color: #b1b1b1;
  text-align: center;
  cursor: pointer;
`
const UnderLine = styled.div`
  position: absolute; bottom: 0;
  width: 100%; height: 4px;
  background-color: #8a8a8a;
`

const InfomationDiv = styled.div`
  border: 1px solid #cccccc;
  width: 0 auto;
  margin-top: -4px;
  padding: 5px 30px 60px 30px; 
`

const Username = styled.text`
  font-size: 30px;
  font-weight: bold;
`
const Font1 = styled.text`
    margin-top: -3px;
    display: block;
    font-size: 14px;
    color: #b5b5b5;
`

function SelectToggle(){
  const [tabState, setTabState] = useState({
    tabProfile: true,
    tabBadge: false,
    tabYoutuber: false
  });

  const tabHandler = (e) => {
    const newTabState = {...tabState};
    const activeTab = e.currentTarget.id;
    for(let key in newTabState){
      key === activeTab
        ? (newTabState[key] = true)
        : (newTabState[key] = false)
    }
    setTabState(newTabState);
  }

  return(
    <div>
    <div style={{ marginLeft: "30px"}}>
      { tabState.tabProfile ?
        <>
          <TabText id='tabProfile' onClick={tabHandler} style={{color: '#1b1b1b', fontWeight: "bold"}}>
            profile
            <UnderLine/>
          </TabText>
        </>:
        <TabText id='tabProfile' onClick={tabHandler}>
          profile
        </TabText>}

      { tabState.tabBadge ?
        <>
          <TabText id='tabBadge' onClick={tabHandler} style={{color: '#1b1b1b', fontWeight: "bold"}}>
          Badges
            <UnderLine/>
          </TabText>
        </>:
        <TabText id='tabBadge' onClick={tabHandler}>
          Badges
        </TabText>}

      { tabState.tabYoutuber ?
        <>
          <TabText id='tabYoutuber' onClick={tabHandler} style={{color: '#1b1b1b', fontWeight: "bold"}}>
          Youtuber Manage
            <UnderLine/>
          </TabText>
        </>:
        <TabText id='tabYoutuber' onClick={tabHandler}>
          Youtuber Manage
        </TabText>}
    </div>

    <InfomationDiv>
      { tabState.tabProfile ? <MypageProfile/> : "" }
      {/******************  컴포넌트 추가 ***********************/}
      { tabState.tabYoutuber ? <YoutuberProfile/> : "" }
      { tabState.tabBadge ? <MyPageBadges/> : "" }
    </InfomationDiv>
    </div>
  )
}

function AdminPage(){
  const userId = localStorage.getItem('userid');
  const userName = "Username";
  const [myBalance, setMyBalance] = useState("0");

  const getUserData = async() => {
    const user_data = await getKlipAddress(userId);
    // const _balance = await getBalance(user_data[0].address);
    // setMyBalance(_balance);
  }
  return(
    <div><Header/>
      <div style={{paddingLeft: "30px", paddingRight: "30px"}}>
        <div style={{padding: "10px 30px 30px 30px"}}>
          <Username>{userName}</Username>
          <Font1>Something</Font1>
        </div>
        <SelectToggle/>
        <button onClick={getUserData}>klay 잔고 조회</button> {myBalance} klay
      </div>
    </div>
  )
}

export default AdminPage;