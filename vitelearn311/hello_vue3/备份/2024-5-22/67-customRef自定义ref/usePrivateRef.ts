import { customRef } from "vue";

//自定义Ref通常被封装为hook函数
export function usePrivateRef(initValue:any,delay:number){

    // 定时器（setTimeout方法返回的定时器类型为number）
    let timer:number
    
    //track：跟踪 trigger：触发
    let privateRefMsg=customRef((track,trigger)=>{
        return{
            get(){
                //读数据开始调用track
                track();
                return initValue;
            },
            set(value){
                console.log("privateRef set");
                //清除定时器，使initValue仅在结束输入时更新
                clearTimeout(timer)
                timer=setTimeout(()=>{
                    initValue=value;
                    //写数据结束后条用trigger
                    trigger();
                },delay)
            }
        }
    })
    return {
        privateRefMsg
    }
}