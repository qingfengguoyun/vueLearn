
import type { FileVo, NativePage,PagePojo } from "@/types"
import type { ResultInter } from "@/types/ResultType";
import { getRequest,postRequest,fileDownLoadRequest } from "@/utils/axiosUtils";
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

    async function downloadFile(fileIdParam:string){
        console.log("downloadFile fileId:",fileIdParam);
        let param={
            fileId:fileIdParam
        }
        let url="/api/file/downloadFile"
        console.log(url)
        let response=await fileDownLoadRequest(url,param);
        console.log(response);
        let fileName= response.headers['content-disposition']
        console.log(fileName)
        if (fileName) {
            fileName = decodeURI(fileName.split("filename=")[1])
        }
        //response.data转化为bolb文件
        let blob=new Blob([response.data as any],{type:response.headers['content-type']})
        //前端的文件下载本质上是创造一个隐藏a标签，然后模拟点击，最后再移除a标签
        const a = document.createElement("a");
        // 创建下载的链接
        a.href = window.URL.createObjectURL(blob);
        a.download = fileName;
        a.style.display = "none";
        //a标签追加元素到body内
        document.body.appendChild(a);
        //模拟点击下载
        a.click();
        // 下载完成移除元素
        document.body.removeChild(a);
        // 释放掉blob对象
        window.URL.revokeObjectURL(a.href);
        
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
        previewUrlList,
        downloadFile
    }

}