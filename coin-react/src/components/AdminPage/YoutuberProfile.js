import React, { useEffect, useState } from 'react';
import config from "../../config";
import { Button, Modal } from 'react-bootstrap';
import { findCreators, addCreator, getMintingInfo } from '../../commons/firestore';
import styled from 'styled-components';

const Text1 = styled.input.attrs(props => ({
    type: "text",
    size: props.size || "1em",
  }))`
    color: black;
    font-size: 1em;
    border: 2px solid #b5b5b5;
    border-radius: 3px;
    width: 450px;
    margin: 10px;
    padding: 10px;
  `;

const Row = styled.text`
    display: flex;
    justify-content: center;
    align-items: center;
`
const Row1 = styled(Row)`
    padding-top: 100px;
`
const Row3 = styled(Row)`
    padding-bottom: 60px;
`
const Font1 = styled.text`
    font-size: 20px;
    color: black;
    font-weight: bold;
    padding-right: 10px;
`
const Font2 = styled.text`
    display: block;
    font-size: 16px;
    color: #b5b5b5;
`
const Font3 = styled.text`
    margin-top: 15px;
    display: block;
    font-size: 16px;
    color: #1b1b1b;
`
const ApplyButton = styled.button`
    display: inline-block;
    color: #b5b5b5;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px  #E0E0E0;
    display: block;
`
const StyledTextarea = styled.textarea`
    font-size: 16px;
    width: 100%;
`
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
    width: 100%;
    height: 100px;
    display: flex;
    background-repeat: no-repeat;
`
const Line = styled.hr`
    border: 1px solid #cccccc;
`
const TitleTd = styled.td`
    border: 1px solid #e9eaef;
    border-right: 0px;
    width: 100px;
`
const SubTd = styled.td`
    border: 1px solid #e9eaef;
    border-left: 0px;
    border-right: 0px;
    width: 100px;
`
const DateTd = styled.td`
    border: 1px solid #e9eaef;
    border-left: 0px;
    border-right: 0px;
    width: 100px;
`
const FeeTd = styled.td`
    border: 1px solid #e9eaef;
    border-left: 0px;
    border-right: 0px;
    width: 100px;
`
const NumberTd = styled.td`
    border: 1px solid #e9eaef;
    border-left: 0px;
    width: 100px;
`
const TableArea = styled.table`
    min-width: 100%;
`

const MintInfo = styled.div`
    
`
const MintingRow = styled.div`
    
`

function YoutuberProfile() {
    console.log("유튜버 정보페이지 로드");
    const [applyResults, setApplyResults] = React.useState(4);
    const [subscriberCount, setSubscriberCount] = useState();
    const [channelName, setChannelName] = useState();
    const [channelBanner, setChannelBanner] = useState();
    const [channelNameThumbnails, setChannelNameThumbnails] = useState();
    const [description, setDescription] = useState();
    const [mintingInfo, setMintingInfo] = useState([]);


    const userId = localStorage.getItem('userid');
    
    // 유튜버 체크
    const checkCreators = async () => {
        const creator = await findCreators(userId);
        console.log(creator);
        if (creator.length > 0) {
            setApplyResults(creator[0].apply_flag);
            
            if (creator[0].apply_flag === 2) {
                Promise.all([setCreatorInfo(creator), setMintInfo()]);
            }
        } else {
            setApplyResults(0);
        }
     };

    useEffect(() => {
        checkCreators();
    },[]);

    const setMintInfo = async () => {
        // 뱃지 셋팅
        const ret = await getMintingInfo(userId);
        await setMintingInfo(ret);
    }

    const setCreatorInfo = async (creator) => {
        // 유튜버 정보 셋팅
        console.log('유튜버 정보 셋팅');
        var channelId = creator[0].channel_id;
        const {api_key} = config;
        const infoCall = `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings,snippet,statistics&`;
        await fetch(`${infoCall}id=${channelId}&key=${api_key}`)
        .then(result => result.json())
        .then(data => {
            console.log(data);
            setChannelName(data.items[0].snippet.title);
            setSubscriberCount(data.items[0].statistics.subscriberCount);
            if (data.items[0].brandingSettings.image != undefined) {
                setChannelBanner(data.items[0].brandingSettings.image.bannerExternalUrl);
            }
            setChannelNameThumbnails(data.items[0].snippet.thumbnails.default.url);
        });
    }

    const Init = () => {
         if (applyResults === 0) {
            // URL입력화면
            return (
                <NoApply />
            )
        } else if (applyResults === 1) {
            // 신청진행화면
            return (
                <Apply />
            )
        } else if (applyResults === 2) {
            // 유튜버정보화면
            return (
                <CreatorInfo/>
            )
        } else {
            return (
                <div>로딩중</div>
            )
        }
    }

    const Apply = () => (
        <div>
            <Row1>
                <Font1>유튜버 인증 신청이 완료되었습니다.</Font1>
            </Row1>
            <Row3>
                <Font2>심사기간은 1-3일 소요됩니다.(공휴일 제외)</Font2>
            </Row3>
        </div>
    )
    let youtubeUrl = React.createRef();
    const NoApply = () => (
        <div>
            <Row1>
                <Font1>Youtube 채널 URL</Font1>
                <Text1 ref={youtubeUrl} name='youtubeUrl' placeholder="https://www.youtube.com/채널" />
            </Row1>
            <Row>
                <Font2>회원가입 정보와 유튜브 계정이 다를 경우 거절될 수 있습니다.</Font2>
            </Row>
            <Row3>
                <ApplyButton type="button" onClick={HandleClick}>유튜버 인증 신청</ApplyButton>
            </Row3>
        </div>
    )
    const CreatorInfo = () => (
        <div>
            <div>
                <Font3>내 소개 작성</Font3>
                <StyledTextarea value={description}/>
                <Font3>배경 이미지</Font3>
                <ImageArea1 image={channelBanner}></ImageArea1>
                <Font3>프로필 이미지</Font3>
                <ImageArea2 image={channelNameThumbnails}></ImageArea2>
                <Line/>
                <Font3>mint</Font3>
                <MintInfo>
                    <TableArea>
                        {mintingInfo.map((info) => (
                        <tr>
                            <TitleTd>
                                <span>{info.title}</span>
                            </TitleTd>
                            <SubTd>
                            </SubTd>
                            <DateTd></DateTd>
                            <FeeTd></FeeTd>
                            <NumberTd>
                            </NumberTd>
                        </tr>
                        ))}
                        <tr>
                            <TitleTd>
                                4차
                            </TitleTd>
                            <SubTd>
                                {subscriberCount}
                            </SubTd>
                            <DateTd></DateTd>
                            <FeeTd></FeeTd>
                            <NumberTd>
                                발행
                            </NumberTd>
                        </tr>
                    </TableArea>    
                </MintInfo>
            </div>
        </div>
    )

    const HandleClick = () => {
        var stringUrl = youtubeUrl.current.value;
        // 체크
        // TODO URL형식체크
        console.log(stringUrl);
        if (stringUrl.length === 0) {
            setShow(true);
        } else {
            // Creator에 신청 정보 저장
            setApplyResults(1);
            AddCreator(stringUrl);
        }
    }

    const AddCreator = async (url) => {
        let res = null;
        const words = url.split('/');
        const {api_key} = config;
        var username = words[words.length-1];
        var channelId = null;
        var channelName = null;
        var channelImage = null;
        const searchCall = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${username}&key=${api_key}`;
        await fetch(searchCall)
        .then(result => result.json())
        .then(data => {
            channelId = data.items[0].id.channelId;
            channelName = data.items[0].snippet.title;
            channelImage = data.items[0].snippet.thumbnails.default.url
            });
        // Creator에 저장
        res = await addCreator(userId, "", url, channelId, 1, channelImage, channelName);
        console.log('addCreator finish', res);
    }
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    return (
        <div>
            <Init />
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>URL 형식의 유튜브 주소를 입력하세요</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default YoutuberProfile