import {  Socket } from 'socket.io-client';
import io from 'socket.io-client';
import axios,{ type AxiosResponse} from 'axios';
import { type UserInter } from '@/types/UserType'


const baseIP = import.meta.env.BASE_IP;
const serverIP=import.meta.env.SERVER_IP;
let socket:Socket;
let socketIoPort:String;

async function getSocketIoPort(){
    let res:AxiosResponse=await axios.get(baseIP+":8200/api/socket/getSocketIoPort")
    let socketIoPort=<String>res.data.data;
    console.log("getSocketIoPort:",socketIoPort)
    return socketIoPort;
}

export function socketInstance(id:string,userName:string, password:string):Socket {
    const baseIP = import.meta.env.BASE_IP;
    console.log("@@ServrrIp:",serverIP)
    // socketIoPort=await getSocketIoPort();
    // console.log("@@@socketIOPort:",socketIoPort)
    socket = io("ws://"+serverIP+":8271", {
        // path:"/",
        auth:{
            Authorization : sessionStorage.getItem("Authorization") as string || ""
        },
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
        // let socketIoPort=getSocketIoPort();
        let user=JSON.parse(sessionStorage.getItem("userInfo") as string) as UserInter
        socket = io("ws://"+serverIP+":8271", {
            // path:"/",
            auth:{
                Authorization :  sessionStorage.getItem("Authorization") as string || ""
            },
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
