
import { useOnlineUser } from "@/store/onlineUser";
import type {UserVo} from "@/types"
import { type Ref,ref } from "vue";
import { postRequest } from "@/utils/axiosUtils";
import type { ResultInter } from "@/types/ResultType";
import { getProfilePhotoById } from "@/utils/commonUtils";
export default function () {

    let onlineUser = useOnlineUser();
    let userId = onlineUser.showInfoUserId
    let vo: Ref<UserVo> = ref({});
    let profilePhoto = ref("")
    // console.log("userId", userId)

    async function getUserInfoById(userId?:string){
        if(!userId){
            userId=onlineUser.user.id;
        }
        let res = await postRequest<ResultInter>("/api/user/getUserInfoById", userId);
        if (res.data.code == 200) {
            console.log("res.data.data", res.data.data)
            vo.value = res.data.data;
            console.log("vo:", vo.value)
            if (vo.value.userImageId != null) {
                profilePhoto.value = getProfilePhotoById(vo.value.userImageId)
            } else if (vo.value.userDefaultImage != null) {
                profilePhoto.value = "img/" + vo.value.userDefaultImage;
            } else {
                profilePhoto.value = "img/default_head_photo.jpg";
            }
        }
    }

    return{
        vo,
        profilePhoto,
        getUserInfoById,
    }

}