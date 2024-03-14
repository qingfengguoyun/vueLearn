export default class WaterCage{
    public temp: number;
    public height: number;
    constructor();
    constructor(temp:number,height:number);
    constructor(temp?:number,height?:number)
    {
        this.temp=temp || 0;
        this.height=height || 0;
    }
}