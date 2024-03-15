export class User{
    userId?:number;
    userName?:string;
    password?:String;
    constructor();
    constructor(userId:number,userName:string,password:String);
    constructor(userId?:number,userName?:string,password?:String){
        this.userId=userId
        this.userName=userName;
        this.password=password;
    };
}

export type Result={
    data:any,
    code:number,
    status:string
}

export type Card={
    color: number
    num: number
    img: any
}