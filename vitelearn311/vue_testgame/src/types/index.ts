export interface BaseCom{
    id?:number,
    top:number,
    left:number,
    width:number,
    height:number,
    hitbox_top:number,
    hitbox_left:number,
    hitbox_width:number,
    hitbox_height:number,
    display_img:string,
    isActive:boolean,
    isPause:boolean,
}

export interface HitBox extends BaseCom{

}

export interface Enemy extends BaseCom{

    speed?:number,
    score?:number,

}

export interface Player extends BaseCom{

    speed?:number,

}