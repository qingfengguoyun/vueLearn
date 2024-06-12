import type { User, UserVo } from "@/types";
import type { ResultInter } from "@/types/ResultType";
import { postRequest } from "@/utils/axiosUtils";
import { useOnlineUser } from "@/store/onlineUser";
import { ElMessage } from "element-plus";

export default function(){
    let updateUserInfo=async function(user:User){
        let res=await postRequest<ResultInter>("/api/user/updateUser",user);
        //更新用户信息成功
        if(res.data.code==200){
            let updatedUser=res.data.data as User
            //存入sessionStorage
            sessionStorage.setItem("userInfo", JSON.stringify(updatedUser))
            //更新pinia onlineUser.ts 中的user
            let onlineUser=useOnlineUser();
            onlineUser.user=updatedUser
            console.log("用户信息更新成功")
            ElMessage({
                message:"用户信息更新成功",
                type:"success"
            })
        }else{
            ElMessage({
                message:"用户信息更新失败",
                type:"error"
            })
        }
    }
    return {
        updateUserInfo,
    }
}