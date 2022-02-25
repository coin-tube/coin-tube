import React, { useEffect, useState } from 'react';
import config from "../../config.js";
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header';
import { getBadges, getMintingInfo, findCreatorsByChannelId } from '../../commons/firestore';
import BadgeCard from './BadgeCard';
import ReactDOM from 'react-dom';

const ImageArea1 = styled.div`
    background-image: url(${props => props.image});
    width: 100%;
    background-size: cover;
    background-position: center center;
    height: 200px;
    background-repeat: no-repeat;
    display: flex;
`
const ImageArea2 = styled.div`
    background-image: url(${props => props.image});
    width: 90px;
    height: 90px;
    flex: none;
    border-radius: 50%;
    background-color: transparent;
    overflow: hidden;
    margin-top: -50px;
    display: block;
    margin-left: auto;
    margin-right: auto;
`
const Font1 = styled.text`
    font-size: 35px;
    color: black;
    font-weight: bold;
`
const Row = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
`
const TableArea = styled.table`
    min-width: 500px;
    margin-top: 10px;
`
const TableTr = styled.tr`
    height: 70px;
`
const TableTd = styled.td`
    border-left: 0px;
    width: 100px;
    text-align: center;
`
const SubTd = styled(TableTd)`
    border-right: 1px solid #e9eaef;
`
const BadgeTd = styled(TableTd)`
    border-right: 1px solid #e9eaef;
`
const Font2 = styled.text`
    display: block;
    font-size: 16px;
    color: gray;
`
const Font3 = styled.text`
    display: block;
    font-size: 16px;
    color: black;
`
const Line = styled.hr`
    border: 1px solid #cccccc;
    width: 90%;
    margin: auto;
`
const Filter = styled.div`
    display: flex;
    // color: white;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px  #E0E0E0;
    border-radius: 3px;
`
const FilterSelected = styled(TableTd)`
    background-color: #b5b5b5;
`
const BadgeArea = styled.div`
    display: flex;
`

function YoutuberPage() {
  const location = useLocation();
  const [channelId, setChannelId] = useState(location.state.creatorID);
  const [channelName, setChannelName] = useState();
  const [subscriberCount, setSubscriberCount] = useState();
  const [channelBanner, setChannelBanner] = useState();
  const [description, setDescription] = useState();
  const [channelNameThumbnails, setChannelNameThumbnails] = useState();
  const [badgeCount, setBadgeCount] = useState(0);
  const [mintingCount, setMintingCount] = useState(0);
  const [badgeInfo, setBadgeInfo] = useState();
  
  const getData = async () => {
    Promise.all([setCreatorInfo(), setMintInfo()]);
    console.log('END');
  };

  const setCreatorInfo = async () => {
    // 유튜버 정보 셋팅
    console.log('유튜버 정보 셋팅');
    const {api_key} = config;
    const infoCall = `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings,snippet,statistics&`;
    await fetch(`${infoCall}id=${channelId}&key=${api_key}`)
    .then(result => result.json())
    .then(data => {
        setChannelName(data.items[0].snippet.title);
        setDescription(data.items[0].snippet.description);
        var temp = data.items[0].statistics.subscriberCount;
        if (1000 < temp && temp < 10000) {
          setSubscriberCount(temp/1000 + 'K');
        } else if (temp > 10000) {
          setSubscriberCount(temp/10000 + 'M');
        } else {
          setSubscriberCount(temp);
        }
        if (data.items[0].brandingSettings.image != undefined) {
            setChannelBanner(data.items[0].brandingSettings.image.bannerExternalUrl);
        }
        setChannelNameThumbnails(data.items[0].snippet.thumbnails.default.url);
    });
  }

  const setMintInfo = async () => {
    // 뱃지 셋팅
    console.log('뱃지 셋팅')
    const ret = await findCreatorsByChannelId(channelId);
    const mintingData = await getMintingInfo(ret[0].user_id);
    if (mintingData.length > 0) {
      // 민팅횟수
      setMintingCount(mintingData.length);
      console.log('민팅횟수',mintingData.length);
      // const badges = null;
      
      // 민팅 정보로 뱃지 획득
      (async () => {
        const result = await Promise.all(
          mintingData.map(async (info) => {
            const badges = await getBadges(info.id);
            return badges;
          })
        );
        setBadgeInfo(result);
        var count = 0;
        if (result != null) {
          for (let i = 0; i <result.length; i++) {
            count = count + result[i].length;
          }
        }
        setBadgeCount(count);
        SettingBadge(result);
      })();
    }
  }

  const SettingBadge = (param) => {
    const result = param.map(function(info, i){
      const sub = info.map(function(one, i){ 
        return <BadgeCard key={i} param={one}/>
      })
      return sub;
    })
    ReactDOM.render(result, document.getElementById('badge'));
  }

  useEffect(() => {
    getData();
    // settingBadge();
  },[]);

  return (
    <div><Header/>
      <ImageArea1 image={channelBanner}></ImageArea1>
      <ImageArea2 image={channelNameThumbnails}></ImageArea2>
      <Row><Font1>{channelName}</Font1></Row>
      <Row>
        <TableArea>
          <TableTr>
            <SubTd>
              <Font3>{mintingCount}차</Font3>
              <Font2>publisher</Font2>
            </SubTd>
            <BadgeTd>
              <Font3>살수있는뱃지</Font3>
              <Font2>available badges</Font2>
            </BadgeTd>
            <TableTd>
              <Font3>{subscriberCount}</Font3>
              <Font2>subscriber</Font2>
            </TableTd>
          </TableTr>
        </TableArea>
      </Row>
      <Line/>
      <Row>
        <Filter>
          <Font3>All</Font3><Font2>|</Font2>{badgeCount}
        </Filter>
        <Filter>
          <Font3>필터</Font3><Font2>|</Font2>5
        </Filter>
        <Filter>
          <Font3>필터</Font3><Font2>|</Font2>5
        </Filter>
        {/* {mintingCount.map((info) => (
        <Filter>
          <Font3>Sold</Font3><Font2>|</Font2>5
        </Filter>
        ))} */}
      </Row>
      <BadgeArea id='badge'/>
    </div>
  )
}

export default YoutuberPage