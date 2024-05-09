<template>

    <div class="p-md">
        <el-button type="primary" @click="handleUploadAll">上传全部文件</el-button>
    </div>
    <el-upload v-model:file-list="fileList" class="upload-demo" action="http://192.168.5.31" :on-preview="handlePreview"
        :on-remove="handleRemove" list-type="picture" :auto-upload="false" drag ref="uploadRef">


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
        name: "fileUpload"
    }
</script>
<script lang='ts' setup>

import { ref, type Ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import { UploadFilled } from '@element-plus/icons-vue'

import type { UploadFile, UploadProps, UploadUserFile } from 'element-plus'



const fileList: Ref<UploadUserFile[]> = ref([])
let uploadRef = ref()

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
    console.log(file)
}
let handleUploadAll = () => {
    // 通过ref获取el-upload组件实例，并手动提交上传操作
    uploadRef.value.submit();
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