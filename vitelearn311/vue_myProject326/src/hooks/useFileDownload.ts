
import type { FileVo, NativePage,PagePojo } from "@/types"
import type { ResultInter } from "@/types/ResultType";
import { getRequest,postRequest } from "@/utils/axiosUtils";
import {getImagePreviewById, requestPrefix} from "@/utils/commonUtils"
import { type Ref ,ref,computed } from "vue";
export default function(){

    let fileVos:Ref<FileVo[]>=ref([])

    let totalpages:Ref<number>=ref(1)

    let totalCount:Ref<number>=ref(0)

    let currentPage:Ref<number>=ref(0);

    let currentPageSize:Ref<number>=ref(5);

    let defaultPage=ref(1);

    let defaultPageSzie=ref(5);


    let previewUrlList=computed(()=>{
        return fileVos.value.map(vo=>getImagePreviewById(vo.fileId))
    })

    async function getFilesByPage(params:PagePojo) {
        console.log("getFilesByPage:","page:"+params.page,"pageSize:"+params.pageSize)
        currentPage.value=params.page || 1
        currentPageSize.value=params.pageSize || 5
        let url=("/api/file/getFilesByPage/"+params.page || defaultPage+"/"+params.pageSize ||defaultPageSzie) as string
        console.log(url)
        let response=await getRequest<ResultInter>(url);
        if(response.data.code=='200'){
            let res=response.data.data as NativePage;
            totalpages.value=Number(res.totalPages) || 1
            currentPage.value=Number(res.currentPage) || 1
            fileVos.value=res.data || []
            totalCount.value=Number(res.totolCount) || 0
        }
        console.log(fileVos.value)
    }


    return{
        fileVos,
        totalpages,
        totalCount,
        currentPage,
        currentPageSize,
        defaultPage,
        defaultPageSzie,
        getFilesByPage,
        previewUrlList
    }

}