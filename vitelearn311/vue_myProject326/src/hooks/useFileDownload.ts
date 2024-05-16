
import type { FileVo, NativePage,PagePojo } from "@/types"
import type { ResultInter } from "@/types/ResultType";
import { getRequest,postRequest } from "@/utils/axiosUtils";
import {requestPrefix} from "@/utils/commonUtils"
import { type Ref ,ref } from "vue";
export default function(){

    let fileVos:Ref<FileVo[]>=ref([])

    let totalpages:Ref<number>=ref(1)

    let currentPage:Ref<number>=ref(0);

    let currentPageSize:Ref<number>=ref(5);

    let defaultPage=ref(1);

    let defaultPageSzie=ref(5);

    async function getFilesByPage(params:PagePojo) {
        console.log("getFilesByPage:","page:"+params.page,"pageSize:"+params.pageSize)
        currentPage.value=params.page || 1
        currentPageSize.value=params.pageSize || 5
        let url=("/api/file/getFilesByPage/"+params.page || defaultPage+"/"+params.pageSize ||defaultPageSzie) as string
        console.log(url)
        let response=await getRequest<ResultInter>(url);
        if(response.data.code=='200'){
            let res=response.data.data as NativePage;
            totalpages.value=res.totalPages || 1
            currentPage.value=res.currentPage || 1
            fileVos.value=res.data || []
        }
        console.log(fileVos.value)
    }

    return{
        fileVos,
        totalpages,
        currentPage,
        currentPageSize,
        defaultPage,
        defaultPageSzie,
        getFilesByPage
    }

}