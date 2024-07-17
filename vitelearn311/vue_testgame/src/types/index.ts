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

    type?: string,
    speed?:number,
    score?:number,

}

export interface Player extends BaseCom{

    speed?:number,
    isProtected:boolean,

}

export interface GameConfig {
    isGameStart:boolean,
    isGameover:boolean,
    isPaused:boolean,
    score:number,
    lifeRemain?:number,
}