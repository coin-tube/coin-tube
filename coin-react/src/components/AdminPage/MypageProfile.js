import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Font1 = styled.text`
    margin-top: 15px;
    display: block;
    font-size: 16px;
    color: #1b1b1b;
`
const Font2 = styled.text`
    display: block;
    font-size: 16px;
    color: #b5b5b5;
`

const RecentActivityContainer = styled.div`
    margin-top: 5px;
    padding: 20px 0 30px 30px;
    border: 1px solid #cccccc;
    width: 100%; height: 150px;
`
const RecentActivityindex = styled.text`
    display: inline-block; width: 70px;
    color: #5c5c5c;
    font-weight: bold;
`
const RecentActivityText = styled.text`
    color: #b1b1b1;
    display: inline-block;
    font-size: 15px;
`

function RecentActivity({activityMessage, activityTimeStamp}){
    let returnText = "";

    if(activityMessage === "Buy")
        returnText = `${"a"}가 ${"a"} Klay에 판매한 ${"a"}의 뱃지를 구매하였습니다. `;
    else if(activityMessage === "Sale")
        returnText = `${"a"}의 뱃지를 ${"a"} Klay로 판매 시작했습니다.`;
    else if(activityMessage === "Cancel")
        returnText = `${"a"} Klay에 판매한 ${"a"}의 뱃지를 판매 취소하였습니다.`;
    else if(activityMessage === "Sold")
        returnText = `${"a"}의 뱃지를 ${"a"}로 부터 ${"a"} Klay에 구매하였습니다. `;
    else if(activityMessage === "Mint")
        returnText = `뱃지 ${"a"}개를 ${"a"} Klay로 ${"a"}차 발행하였습니다. `;

    return(
        <div>
            <RecentActivityindex>{activityMessage}</RecentActivityindex>
            <RecentActivityText>{returnText}</RecentActivityText>&nbsp;&nbsp;
            <RecentActivityText>{activityTimeStamp}</RecentActivityText>
        </div>
    )
}

function MypageProfile(){
    return(
        <div>
            <div>
                <Font1>recent activity</Font1>
                <RecentActivityContainer>
                    <RecentActivity activityMessage={"Sale"} activityTimeStamp={"0000 - 00 - 00"}/>
                </RecentActivityContainer>
            </div>
            <div>
                <Font1>wallet address</Font1>
                <Font2>{"0x123456789abcd123456789abcd123456789abcd"}</Font2>
            </div>
            <div>
                <Font1>email address</Font1>
                <Font2>{"username@email.com"}</Font2>
            </div>
        </div>
    )
}

export default MypageProfile;