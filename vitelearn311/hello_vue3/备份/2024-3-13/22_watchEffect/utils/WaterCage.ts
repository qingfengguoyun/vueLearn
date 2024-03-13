export default class WaterCage{
    public temp: number;
    public height: number;
    constructor();
    constructor(temp:number,height:number);
    constructor(temp?:number,height?:number)
    {
        this.temp=temp;
        this.height=height;
    }
}