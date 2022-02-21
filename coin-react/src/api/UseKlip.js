import axios from "axios";

const A2P_API_PREPARE_URL = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const APP_NAME = "KLAY_MARKET";
const isMobile = window.screen.width >= 1280 ? false : true;


const getKlipAccessUrl = (method, request_key) => {
  if (method === "QR") {
    return `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
  }
  return `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
};

export const getAddress = (setQrvalue, callback) => {
  axios
    .post(A2P_API_PREPARE_URL, {
      bapp: {
        name: APP_NAME,
      },
      type: "auth",
    })
    .then((response) => {
      const { request_key } = response.data;
      if (isMobile) {
        window.location.href = getKlipAccessUrl("android", request_key);
      } else {
        setQrvalue(getKlipAccessUrl("QR", request_key));
      }
      let timerId = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          )
          .then((res) => {
            if (res.data.result) {
              console.log(`[Result] ${JSON.stringify(res.data.result)}`);
              callback(res.data.result.klaytn_address);
              clearInterval(timerId);
              setQrvalue("DEFAULT");
            }
          });
      }, 1000);
    });
};

















































// // settings //
// import axios from "axios";
// import { COUNT_CONTRACT_ADDRESS } from "../constants";

// // pre declaration //
// const A2P_API_PREPARE_URL = "https://a2a-api.klipwallet.com/v2/a2a/prepare"; // A2P API를 쓰기 위한 URL
// const APP_NAME = "KLAY_MARKET" // A2P에 기재해야 하는 APP_NAME, 임의로 설정


// // 기능1. //
// export const setCount = (count, setQrvalue) => { 
//     axios.post( // 참조 https://docs.klipwallet.com/tutorial/tutorial-a2a-rest-api
//         A2P_API_PREPARE_URL,{ // curl 형태로 A2A API 요청 // // 지갑 사용해도 되니 물어보는 거
//             bapp : {
//                 name: APP_NAME
//             },
//             type: "execute_contract", // 스마트컨트랙트 실행을 뜻하는 타입
//             transaction: { // app2app에 prepare 위치에 execute transation에 대해 설명되어 있음
//                 to: COUNT_CONTRACT_ADDRESS, // 스마트 컨트랙트 주소
//                 abi: '{ "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }', // /실행할 함수에 대한 abi(setcount)
//                 value: "0", // 클레이 가격, 클레이 안사용하니까
//                 params: `[\"${count}\"]`  // 보낼 값, 
//             }
//         }
//     ).then((response) => { // 위에서 나온 값(반환 키)을 response에 넣어줌
//         const {request_key} = response.data; // reponse의 data의 request_key를 꺼내서 저장해줌
//         const qrcode = `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`; // 아이폰용 QR url, 카톡클립에서 얻어온 사용자 address를 얻는데 씀
//         setQrvalue(qrcode) // App.js의 qrValue를 KAS에서 제공해준 QR로 수정해줌
//         let timerid = setInterval(()=> {  // 계속 반복 때리면서 연동받은 사용자 주소 보내줌, 
//             axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`).then((res) =>{
//                 if (res.data.result){ // requestkey 보내가지고 받은 값을 res에 넣고
//                     console.log(`[Result] ${JSON.stringify(res.data.result)}`); // res의 result값을 출력?
//                     if (res.data.result.status === "success"){
//                         clearInterval(timerid) // 성공시 CountContract의 count 값 변경됌
//                     }
//                     clearInterval(timerid)
//                 }
//             })
//         }, 1000)
//     })
// }

// //기능2. //
// export const getAddress = (setQrvalue, callback) => {
//     // rest api로 get, post, put등을 사용하기 위해 axios 호출
//     axios.post( // 참조 https://docs.klipwallet.com/tutorial/tutorial-a2a-rest-api
//         A2P_API_PREPARE_URL,{ // curl 형태로 A2A API 요청 
//             bapp : {
//                 name: APP_NAME
//             },
//             type: "auth"
//         }
//     ).then((response) => { // 위에서 나온 값을 response에 넣어줌
//         const {request_key} = response.data; // reponse의 data에 request_key가 들어가는데
//         const qrcode = `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
//         setQrvalue(qrcode)
//         let timerid = setInterval(()=> { 
//             axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`).then((res) =>{ //http통신으로 인증
//                 if (res.data.result){ // requestkey 보내가지고 받은 값을 res에 넣고
//                     console.log(`[Result] ${JSON.stringify(res.data.result)}`); // res의 result값을 출력?
//                     callback(res.data.result.klaytn_address) // 클레이튼 address로 들어온 값 콜백해줌
//                     clearInterval(timerid)
//                 }
//             })
//         }, 1000)
//     })
// }
