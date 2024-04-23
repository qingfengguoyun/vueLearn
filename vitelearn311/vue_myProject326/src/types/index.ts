import { type DefineComponent } from "vue"

interface User{
    id?:string
    userName?:string
    password?:string
}

export interface UserVo{
    userId?:string
    userName?:string
    isOnline?:boolean
    lastOnlineTime?:Date
}

interface Message{

}

export interface MessagePojo{
    sendUserId?:String;

    content?:String;

    replyMessageId?:String;

    receiveUserId?:String;

    isBroadcast?:Boolean;
}

export interface MessageVo{
    sendUser:User
    receiveUser?:User
    messageId:string
    messageContent:string
    date:Date
    isUnRead:Boolean 
}

export interface ComponentsMap {
    [key: string ]: any;
}

export interface UnReadMessageCount{
    id?:string,
    unReadMessageCount?:number,
    userName?:string
}