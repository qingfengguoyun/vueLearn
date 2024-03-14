
//定义一个接口 用于限制person对象的具体属性
export interface PersonInter{
    id :string;
    name :string;
    age : number;
}

//自定义类型(两种写法)
// export type Persons = Array<PersonInter>
export type Persons = PersonInter[]