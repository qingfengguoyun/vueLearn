import { type DefineComponent } from "vue"

interface User{
    userId?:string
    userName?:string
}

export interface UserVo{
    userId?:string
    userName?:string
    isOnline?:boolean
    lastOnlineTime?:Date
}

interface Message{

}

export interface MessageVo{
    sendUser:User
    receiveUser?:User
    id:string
    messageContent:string
    date:Date
}

export interface ComponentsMap {
    [key: string]: any;
}