import {io} from "socket.io-client"
const socket = io();

socket.on('connect', () => {
  console.log('소켓 연결됨');
});

socket.on('disconnect', () => {
  console.log('소켓 연결 끊김');
});
export default socket;