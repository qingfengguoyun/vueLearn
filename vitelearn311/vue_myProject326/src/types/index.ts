import { type DefineComponent } from "vue"

export interface User{
    id?:string
    userName?:string
    password?:string
    userImageId?:string
    userDefaultImage?:string
}

export interface UserVo{
    userId?:string
    userName?:string
    isOnline?:boolean
    lastOnlineTime?:Date
    userImageId?:string
    userDefaultImage?:string
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

export interface FileVo{
    fileId:string,
    fileName?:string,
    userVo?:UserVo,
    fileSuffix?:string,
    fileUrl?:string,
    filePreviewUrl?:string
    fileType?:string,
    date:Date
}

export interface NativePage{
    pageSize?:number,
    totalPages?:number,
    currentPage?:number,
    data?:any,
    totolCount?:number,
}
export interface PagePojo{
    page?:number
    pageSize?:number
}