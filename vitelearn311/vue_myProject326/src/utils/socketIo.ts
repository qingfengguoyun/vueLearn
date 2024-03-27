import {  Socket } from 'socket.io-client';
import io from 'socket.io-client';



let socket:Socket;
export function socketInstance(userName:string, password:string):Socket {
    console.log('io:',io)
    console.log("Socekt",Socket)
    socket = io('http://localhost:8071', {
        // path:"/",
        transports: ['websocket'],//默认是HTTP轮训，设置这个就是为ws
        upgrade: false,//关闭自动升级ws，开启的话监听的通过消息会收不到
        query: { //通过参数的形式传参
            userName: userName,
            password: password,
        },
    });
    return socket;
  }

export function useSocket(){
return socket;
}
