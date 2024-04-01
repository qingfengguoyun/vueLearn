import {  Socket } from 'socket.io-client';
import io from 'socket.io-client';
import { type UserInter } from '@/types/UserType'


const baseIP = import.meta.env.BASE_IP;
let socket:Socket;
export function socketInstance(id:number,userName:string, password:string):Socket {
    // console.log('io:',io)
    // console.log("Socekt",Socket)
    const baseIP = import.meta.env.BASE_IP;
    socket = io('http://localhost:8271', {
        // path:"/",
        transports: ['websocket'],//默认是HTTP轮训，设置这个就是为ws
        upgrade: false,//关闭自动升级ws，开启的话监听的通过消息会收不到
        query: { //通过参数的形式传参
            id: id,
            userName: userName,
            password: password,
        },
    });
    return socket;
  }

export function useSocket():Socket{
    if(socket===undefined){
        // console.log("rebuild")
        let user=JSON.parse(sessionStorage.getItem("userInfo") as string) as UserInter
            socket = io('http://localhost:8271', {
            // path:"/",
            transports: ['websocket'],//默认是HTTP轮训，设置这个就是为ws
            upgrade: false,//关闭自动升级ws，开启的话监听的通过消息会收不到
            query: { //通过参数的形式传参
                id: user.id,
                userName: user.userName,
                password: user.password,
            },
        });
    }
    return socket;
}
