import type { BaseCom, Player, Enemy } from "@/types";

export function toStyle(config: BaseCom) {
    return {
        width: `${config.width}px`,
        height: `${config.height}px`,
        top: `${config.top}px`,
        left: `${config.left}px`,
        backgroundImage: `url('${config.display_img}')`,
        backgroundSize: 'auto 100%',
    }
}
export function toSizeStyle(config: BaseCom) {
    return {
        width: `${config.width}px`,
        height: `${config.height}px`,
        top: `${config.top}px`,
        left: `${config.left}px`,
    }
}

export function initBaseCom(w?: number, h?: number, left?: number, top?: number, h_w?: number, h_h?: number): BaseCom;
export function initBaseCom(w?: number, h?: number, left?: number, top?: number, h_w?: number, h_h?: number,display_img?:string): BaseCom;
export function initBaseCom(w?: number, h?: number, left?: number, top?: number): BaseCom;
export function initBaseCom(): BaseCom;
/**
 * 
 * @param w 
 * @param h 
 * @param top 
 * @param left 
 * @param h_w 碰撞箱x轴长度
 * @param h_h 碰撞箱y轴长度
 * @returns 
 */
export function initBaseCom(w?: number, h?: number, left?: number, top?: number, h_w?: number, h_h?: number,display_img?:string): BaseCom {
    let center = {
        x: left! + w! / 2,
        y: top! + h! / 2,
    }
    let h_l = h_w ? center.x - h_w / 2 : left;
    let h_t = h_h ? center.y - h_h / 2 : top;
    let baseCom: BaseCom = {
        width: w || 50,
        height: h || 50,
        top: top || 0,
        left: left || 0,
        hitbox_height: h_h || 50,
        hitbox_width: h_w || 50,
        hitbox_left: h_l || left || 0,
        hitbox_top: h_t || top || 0,
        isActive: false,
        isPause: false,
        display_img: display_img || '',
    }

    return baseCom;
}


export function initPlayer(w?: number, h?: number, left?: number, top?: number, h_w?: number, h_h?: number, speed?: number): Player;
export function initPlayer(w?: number, h?: number, left?: number, top?: number, h_w?: number, h_h?: number, speed?: number,display_img?:string): Player;
export function initPlayer(w?: number, h?: number, left?: number, top?: number, speed?: number): Player;
export function initPlayer(w?: number, h?: number, left?: number, top?: number, h_w?: number, h_h?: number, speed?: number,display_img?:string): Player {
    let baseCom = initBaseCom(w, h, left, top, h_w, h_h,display_img);
    let com: Player = {
        ...baseCom,
        speed: speed || 200,
    }
    return com;
}
export function initEnemy(w?: number, h?: number, left?: number, top?: number, h_w?: number, h_h?: number, speed?: number, score?: number): Enemy;
export function initEnemy(w?: number, h?: number, left?: number, top?: number, h_w?: number, h_h?: number, speed?: number, score?: number,display_img?:string): Enemy;
export function initEnemy(w?: number, h?: number, left?: number, top?: number, speed?: number, score?: number): Enemy;
export function initEnemy(w?: number, h?: number, left?: number, top?: number, h_w?: number, h_h?: number, speed?: number, score?: number,display_img?:string): Enemy {
    let baseCom = initBaseCom(w, h, left, top, h_w, h_h,display_img);
    let enemy: Enemy = {
        ...baseCom,
        speed: speed || 200,
        score: score || 10,
        type: ""
    }
    return enemy;
}
