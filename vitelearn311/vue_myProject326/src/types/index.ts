

interface User{
    userId?:string
    userName?:string
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