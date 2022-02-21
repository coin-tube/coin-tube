import Caver from "caver-js";
// import CounterABI from '../abi/CounterABI.json';
import KIP17ABI from "../abi/KIP17TokenABI.json";
import {
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  COUNT_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
  CHAIN_ID,
} from "../constants";
const option = {
  headers: [
    {
      name: "Authorization",
      value:
        "Basic " +
        Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64"),
    },
    { name: "x-chain-id", value: CHAIN_ID },
  ],
};

const caver = new Caver(
  new Caver.providers.HttpProvider(
    "https://node-api.klaytnapi.com/v1/klaytn",
    option
  )
);
const NFTContract = new caver.contract(KIP17ABI, NFT_CONTRACT_ADDRESS);


export const fetchCardsOf = async (address) => { // 카드 정보 반환 함수 //
  // Fetch Balance
  const balance = await NFTContract.methods.balanceOf(address).call(); // 입력받은 주소의 klay를 가져오는데, 이는 (line:29)에서 ABI를 이용해 배포된 스마트 컨트랙트의 함수를 이용함
  console.log(`[NFT Balance]${balance}`);
  // Fetch Token IDs
  const tokenIds = [];
  for (let i = 0; i < balance; i++) {
    const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
    tokenIds.push(id);
  }
  // Fetch Token URIs
  const tokenUris = [];
  for (let i = 0; i < balance; i++) {
    const uri = await NFTContract.methods.tokenURI(tokenIds[i]).call();
    tokenUris.push(uri);
  }
  const nfts = [];
  for (let i = 0; i < balance; i++) {
    nfts.push({ uri: tokenUris[i], id: tokenIds[i] });
  }
  console.log(nfts);
  return nfts;
};

export const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(
      caver.utils.hexToNumberString(response)
    );
    console.log(`BALANCE: ${balance}`);
    return balance;
  });
};
