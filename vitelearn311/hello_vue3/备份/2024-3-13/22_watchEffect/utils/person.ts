export default class PersonClass{
    public name: any;
    public age: any; 
    public datas: any;
    public obj:Object={
        a:"123",
        b:"234"
    }

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
        this.obj={
            p:"qwe"
        }
    }
}