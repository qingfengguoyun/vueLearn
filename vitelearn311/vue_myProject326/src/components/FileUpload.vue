<template>

    <div class="p-md">
        <el-button type="primary" @click="handleUploadAll">上传全部文件</el-button>
    </div>
    <el-upload v-model:file-list="fileList" class="upload-demo" action="#" :on-preview="handlePreview" :multiple="true"
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
    <div>
        <div class="ibox ">
            <div class="ibox-content">
                <div class="file-manager">

                    <div>
                        <h5 class="tag-title">添加标签（最多三个）</h5>
                        <ul class="tag-list" style="padding: 0">
                            <el-tag :type="`primary`" :effect="tag.isSelected ? 'dark' : 'plain'"
                                class="p-xs m-r-xs m-t-xs" v-for="(tag, index) in tagService.selectedTags"
                                :key="tag.id">
                                {{ tag.tagName }}
                            </el-tag>
                        </ul>
                        <el-button type="primary" text="primary" size="small" bg
                            @click="tagService.clearSelectTag()">清空所有标签</el-button>
                    </div>
                    <div class="hr-line-dashed"></div>
                    <h5 class="tag-title">全部标签</h5>
                    <ul class="tag-list" style="padding: 0">
                        <el-tag :type="`primary`" :effect="tag.isSelected ? 'dark' : 'plain'" class="p-xs m-r-xs m-t-xs"
                            v-for="(tag, index) in tagService.tags" :key="tag.id" @click="tagService.selectTag(index)">
                            {{ tag.tagName }}
                        </el-tag>
                    </ul>
                    <div class="hr-line-dashed"></div>


                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>


</template>
<script lang='ts'>
export default
    {
        name: "FileUpload"
    }
</script>
<script lang='ts' setup>

import { ref, watch, type Ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { type UploadFile, type UploadProps, type UploadUserFile, type UploadRawFile, ElMessage } from 'element-plus'
import { requestPrefix } from '@/utils/commonUtils'
import { fileUploadRequest, postRequest } from '@/utils/axiosUtils'
import type { ResultInter } from '@/types/ResultType'
import type { RefSymbol } from '@vue/reactivity'
import useTagService from '@/hooks/useTagService'
import type { BaseComponent } from '@/types'

let tagService = ref(useTagService());

const fileList: Ref<UploadUserFile[]> = ref([])
let uploadRef = ref()

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
    console.log(file)
}
watch(tagService.value.selectedTags, (newIns, oldIns) => {
    if(tagService.value.selectedTags.length>3){
        // console.log(oldIns.length)
        ElMessage({
            message:"最多添加三个标签",
            type:"warning",
            
        })
        let tagId=tagService.value.selectedTags.pop()?.id
        tagService.value.selectTagById(tagId!)
    }
})
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
    let res = await fileUploadRequest<ResultInter>("/api/file/uploadByBatch", fd);
    if (res.data) {
        console.log(res.data.data)
        if (res.data.code == '200') {
            alert("上传成功");
            // 对上传成功的文件添加标签
            console.log("文件添加标签")
            let fileList = res.data.data as BaseComponent[]
            let fileIdList= fileList.map(t=>t.id)
            let param = {
                fileIds: fileIdList,
                tagIds: tagService.value.selectedTagIds
            }
            console.log("文件添加标签",JSON.stringify(param))
            await postRequest("/api/file/updateFileTagsByBatch", param);
            uploadRef.value.clearFiles();
            tagService.value.clearSelectTag();
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