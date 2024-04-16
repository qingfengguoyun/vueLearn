
import {defineStore} from 'pinia'
import { type UserInter } from '@/types/UserType'
import type { UserVo } from '@/types'

export let usePrivateChatRoom=defineStore("usePrivateChatRoom",{
    
    actions:{

        setConnectUser(param:UserVo){
            this.connectUser.id=param.userId;
            this.connectUser.userName=param.userName;
        }
    },
    state() {
        return{
           connectUser:{} as UserInter
        }
    },

})