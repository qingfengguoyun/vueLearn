

interface User{
    userId?:string
    userName?:string
}

export interface UserVo{
    userId?:string
    userName?:string
    isOnline?:boolean
}

interface Message{

}

export interface MessageVo{
    sendUser:User
    receiveUser?:User
    messageId:number
    messageContent:string
    date:Date
}