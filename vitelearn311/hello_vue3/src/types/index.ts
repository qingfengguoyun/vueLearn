export class newsIns{
    id?:number;
    title?:string;
    content?:string;
    constructor();
    constructor(id?:number,title?:string,content?:string);
    constructor(id?:number,title?:string,content?:string){
        this.id=id;
        this.title=title;
        this.content=content;
    }

}

export interface Config{
    isOver:boolean
}