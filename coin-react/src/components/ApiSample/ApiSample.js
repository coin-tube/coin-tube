import React, { useEffect, useState } from 'react';
import config from "./config.js";

const ApiSamplePage = () => {
    const [subscriberCount, setSubscriberCount] = useState();
    const [channelName, setChannelName] = useState();
    const [channelBanner, setChannelBanner] = useState();
    const [channelNameThumbnails, setChannelNameThumbnails] = useState();
    useEffect(() => {
        const { api_key, channel_id, username} = config;
        // 채널id로 획득
        // const infoCall = `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings,snippet,statistics&forUsername=${username}&key=${api_key}`;
        const infoCall = `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings,snippet,statistics&`;

        // 검색결과로 획득
        const searchCall = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${username}&key=${api_key}`;
        fetch(searchCall)
        .then(result => result.json())
        .then(data => {
            var channelId = data.items[0].id.channelId;
            fetch(`${infoCall}id=${channelId}&key=${api_key}`)
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
        });

    })
    return (
        <div>
            <div>채널명: {channelName}</div>
            <div>구독자: {subscriberCount}</div>
            <div>배너: <img src={channelBanner} /></div>
            <div>썸네일: <img src={channelNameThumbnails} /></div>
        </div>
    )
}

export default ApiSamplePage