import axios from "axios";
import { type UserInter } from "@/types/UserType";

const baseIP = import.meta.env.BASE_IP;
const serverPort=import.meta.env.SERVER_PORT

// axios请求的前缀，包括服务器地址和端口号
export let requestPrefix=baseIP+":"+serverPort || "http://localhost:8200"

export function getUserId(){
    let userInfo=JSON.parse(sessionStorage.getItem('userInfo') as string) as UserInter
    return userInfo.id 
}

export function getUserInfo():UserInter{
    let userInfo=JSON.parse(sessionStorage.getItem('userInfo') as string) as UserInter
    return userInfo
}

//获取本地components下图片
export function getImage(imgSrc: any) {
    // import.meta.url表示当前模块的url
    // let url = new URL(imgSrc, import.meta.url).href
    let url = `${imgSrc}`
    console.log("@@url:", url)
    return url;
}

