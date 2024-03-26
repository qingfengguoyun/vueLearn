export interface UserInter{
    id?:number
    userName?:string
    password?:string
}

export class UserClass{
    id?:number
    userName?:string
    password?:string
    constructor();
    constructor(id?:number,userName?:string,password?:string);
    constructor(id?:number,userName?:string,password?:string){
        this.id=id || 0;
        this.userName=userName || "";
        this.password=password || "";
    }
}