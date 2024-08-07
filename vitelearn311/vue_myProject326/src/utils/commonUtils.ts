import axios from "axios";
import { type UserInter } from "@/types/UserType";
import type { MessageVo } from '../types/index';
import type { UserVo,User } from "../types/index";

const baseIP = import.meta.env.BASE_IP;
const serverPort=import.meta.env.SERVER_PORT
const serverIp=import.meta.env.SERVER_IP;
const socketIoPort=import.meta.env.SOCKETIO_PORT

// axios请求的前缀，包括服务器地址和端口号
export let requestPrefix=baseIP+":"+serverPort || "http://localhost:8200"

// export let imageRequestPrefix=serverIp+":"+serverPort || "localhost:8200"

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
    return url;
}

//对数组去重
export function arrayDuplicate<T>(array:T[]):Array<T>{
    console.log("arrayDuplicate")
    let newArray=array.reduce((newArray,obj)=>{
        if(newArray.indexOf(obj)===-1){
            newArray.push(obj);
        }
        return newArray;
    },new Array<T>);
    return newArray;
}

// 判断数组是否包含重复元素
export function isArrayHasDuplicates<T>(array:T[]):Boolean{
    if(!array || array.length==0){
        return false;
    }
    let set=new Set(array);
    return set.size!=array.length;
}

// 返回原图的请求路径
export function getImageById(imageId:string):string{
    return "/api/file/getImage/"+imageId;
}

// 返回预览图的请求路径
export function getImagePreviewById(imageId:string):string{
    return "/api/file/getPreviewImage/"+imageId;
}

// 返回用户头像的请求路径
export function getProfilePhotoById(imageId:string):string{
    return "/api/file/getProfilePhoto/"+imageId;
}

// 根据用户获取头像
export function getUserProfilePhoto(user:any){
    if (!user.userImageId) {
        if (user.userDefaultImage) {
            return ('img/' + user.userDefaultImage) as string;
        } else {
            return 'img/default_head_photo.jpg'
        }

    } else {
        return getProfilePhotoById(user.userImageId)
        // return requestPrefix + "/api/file/getProFile/" + this.user.userImageId
    }
}

