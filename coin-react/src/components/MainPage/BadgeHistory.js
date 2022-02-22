import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Container = styled.div`
    border: 1px solid #cccccc;
    width: 800px; height: 280px;
`

const IndexRow = styled.div`
    border-bottom: 1px solid #cccccc;
    width: 100%; height: 30px;
    padding-left: 30px;
    color: black;
    position: relative;
`
const DataRow = styled.div`
    border-bottom: 1px solid #cccccc;
    width: 100%; height: 50px;
    padding-left: 30px; padding-top:1.4%;
    color: #b5b5b5;
    position: relative;
`

const FromFont = styled.text`
    display: inline-block;
    position: absolute;
`
const ToFont = styled.text`
    display: inline-block;
    margin-left:20%;
    position: absolute;
`
const PurchaseFont = styled.text`
    display: inline-block;
    margin-left:40%;
    position: absolute;
`
const PriceFont = styled.text`
    display: inline-block;
    margin-left:70%;
    position: absolute;
`

function HistoryRow({badgeFrom, badgeTo, purcahseDate, badgePrice}){
    return(
        <DataRow>
            <FromFont>{badgeFrom}</FromFont>
            <ToFont>{badgeTo}</ToFont>
            <PurchaseFont>{purcahseDate}</PurchaseFont>
            <PriceFont>{badgePrice} K</PriceFont>
        </DataRow>
    )
}

function BadgeHistory(){
    const badgeFrom = "fromuser";
    const badgeTo = "touser";
    const purcahseDate = "2000 - 00 - 00";
    const badgePrice = "00.00";

    // const badgeFrom = badgeinfo.badgefrom;
    // const badgeTo = badgeinfo.badgeto ;
    // const purcahseDate = badgeinfo.purchasedate;
    // const badgePrice = badgeinfo.badgeprice;

    return(
        <Container>
            <IndexRow>
                <FromFont>From</FromFont>
                <ToFont>To</ToFont>
                <PurchaseFont>Purchase Date</PurchaseFont>
                <PriceFont>Price</PriceFont>
            </IndexRow>
            <HistoryRow
                badgeFrom={badgeFrom}
                badgeTo={badgeTo}
                purcahseDate={purcahseDate}
                badgePrice={badgePrice}/>
        </Container>
    )
}

export default BadgeHistory