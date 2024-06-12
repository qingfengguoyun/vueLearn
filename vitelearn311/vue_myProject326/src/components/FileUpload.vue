<template>

    <div class="p-md">
        <el-button type="primary" @click="handleUploadAll">上传全部文件</el-button>
    </div>
    <el-upload v-model:file-list="fileList" class="upload-demo" action="#"
        :on-preview="handlePreview" :multiple="true" :on-remove="handleRemove" list-type="picture" :auto-upload="false"
        drag ref="uploadRef">


        <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
            </div>
        </template>
    </el-upload>


</template>
<script lang='ts'>
export default
    {
        name: "FileUpload"
    }
</script>
<script lang='ts' setup>

import { ref, type Ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadFile, UploadProps, UploadUserFile, UploadRawFile } from 'element-plus'
import { requestPrefix } from '@/utils/commonUtils'
import { fileUploadRequest } from '@/utils/axiosUtils'
import type { ResultInter } from '@/types/ResultType'
import type { RefSymbol } from '@vue/reactivity'


const fileList: Ref<UploadUserFile[]> = ref([])
let uploadRef = ref()

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
    console.log(file)
}
let handleUploadAll = async () => {
    // 通过ref获取el-upload组件实例，并手动提交上传操作
    // console.log(uploadRef.value)
    // uploadRef.value.submit();
    let fd = new FormData();
    console.log(fileList.value)
    // ts for( .. in ..)遍历的是下标 ，for(.. of ..) 遍历的是数组
    // 或者使用 list.foreach((var,index,array)=>{})
    for (let el of fileList.value) {
        console.log(el)
        fd.append("file", el.raw as UploadRawFile);
        // let imageRequestUrl=requestPrefix+'/api/file/uploadByBatch'
    }
    let res = await fileUploadRequest<ResultInter>("/api/file/uploadByBatch",fd); 
    if (res.data) {
        console.log(res.data.data)
        if (res.data.code == '200') {
            alert("上传成功");
            uploadRef.value.clearFiles();
        }
    }

};
// const handleRemove = (file: UploadFile) => {
//     console.log(file)
// }

// const handlePictureCardPreview = (file: UploadFile) => {
//     dialogImageUrl.value = file.url!
//     dialogVisible.value = true
// }

// const handleDownload = (file: UploadFile) => {
//     console.log(file)
// }
</script>
<style scoped></style>