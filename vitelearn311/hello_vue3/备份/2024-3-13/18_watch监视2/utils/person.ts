export default class PersonClass{
    public name: any;
    public age: any; 

    constructor();
    
    constructor(name: string);
    constructor(name: string,age:number);
    constructor(name?: string,age?:number) {
        if (name) {
            this.name=name;
        } 
        if(age){
            this.age=age;
        }
    }
}