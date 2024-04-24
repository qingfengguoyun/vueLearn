export interface privateMap{
    [key: string ]: any;
}

export default class PersonClass{
    public name: any;
    public age: any; 
    public datas: any;
    public obj: number[]=[1,2,3,4];

    constructor();
    
    constructor(name: string);
    constructor(name: string,age:number);
    constructor(name: string,age:number,data:any);
    constructor(name?: string,age?:number,datas?:any) {
        if (name) {
            this.name=name;
        } 
        if(age){
            this.age=age;
        }
        if(datas){
            this.datas=datas;
        }
    }

    changeObj(){
        this.obj.push(1);
    }
}