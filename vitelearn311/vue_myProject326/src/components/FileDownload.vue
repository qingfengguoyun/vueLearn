<template>


    <div class="FileDownLoad">
        <div class="wrapper wrapper-content">
            <div class="row">
                <div class="col-lg-3">
                    <div class="ibox ">
                        <div class="ibox-content">
                            <div class="file-manager">
                                <h2> 查询文件 </h2>
                                <div class="hr-line-dashed"></div>
                                <el-button type="primary" auto-insert-space :style="{ 'width': '100%' }"
                                    @click="handleFileQueryByCondition()">
                                    查询
                                </el-button>
                                <div class="hr-line-dashed"></div>
                                <el-row gutter="20" align="middle">
                                    <el-col span="6">
                                        <h5>文件名:</h5>
                                    </el-col>
                                    <el-col span="18">
                                        <el-input placeholder="" v-model="fileDownLoad.queryFileName"
                                            :style="{ 'width': '100%' }"></el-input>
                                    </el-col>
                                </el-row>
                                <div class="hr-line-dashed"></div>
                                <div v-if="tagService.selectedTags.length>0">
                                    <h5 class="tag-title">已选标签</h5>
                                    <ul class="tag-list" style="padding: 0">
                                        <el-tag :type="`primary`" :effect="tag.isSelected ? 'dark' : 'plain'"
                                            class="p-xs m-r-xs m-t-xs" v-for="(tag, index) in tagService.selectedTags"
                                            :key="tag.id">
                                            {{ tag.tagName }}
                                        </el-tag>
                                    </ul>
                                </div>
                                <h5 class="tag-title">全部标签</h5>
                                <ul class="tag-list" style="padding: 0">
                                    <el-tag :type="`primary`" :effect="tag.isSelected ? 'dark' : 'plain'"
                                        class="p-xs m-r-xs m-t-xs" v-for="(tag, index) in tagService.tags" :key="tag.id"
                                        @click="tagService.selectTag(index)">
                                        {{ tag.tagName }}
                                    </el-tag>
                                </ul>
                                <div class="hr-line-dashed"></div>
                                <h5>Folders</h5>
                                <ul class="folder-list" style="padding: 0">
                                    <li><a href="file_manager.html"><i class="fa fa-folder"></i> Files</a></li>
                                    <li><a href="file_manager.html"><i class="fa fa-folder"></i> Pictures</a></li>
                                    <li><a href="file_manager.html"><i class="fa fa-folder"></i> Web pages</a></li>
                                    <li><a href="file_manager.html"><i class="fa fa-folder"></i> Illustrations</a></li>
                                    <li><a href="file_manager.html"><i class="fa fa-folder"></i> Films</a></li>
                                    <li><a href="file_manager.html"><i class="fa fa-folder"></i> Books</a></li>
                                </ul>

                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9 animate__animated ">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="file-box-container">
                                <div class="file-box" v-for="(vo, index) in fileDownLoad.fileVos">
                                    <div class="file">
                                        <a href="#">
                                            <span class="corner"></span>
                                            <!-- <div class="icon">
                                            <i class="fa fa-file"></i>
                                        </div> -->
                                            <div class="preview-image" style="display: flex; justify-content: center; ">
                                                <!-- :preview-src-list="fileDownLoad.previewUrlList" 设置预览图片队列 :initial-index="index" 点击预览图从index下标的图片开始 -->
                                                <el-image :src="getImagePreviewById(vo.fileId)" fit="cover"
                                                    :preview-src-list="fileDownLoad.previewUrlList"
                                                    :initial-index="index"></el-image>
                                                <!-- <img alt="image" class="img-fluid" :src="getImagePreviewById(vo.fileId)"> -->

                                            </div>

                                            <div style="background-color: #f8f8f8;" class="p-xs gap-2">
                                                <el-tag v-for="tag in vo.tags" :key="tag.id" :type="`primary`"
                                                    effect="plain" class="p-xs m-r-xs">
                                                    {{ tag.tagName }}
                                                </el-tag>
                                            </div>

                                            <div class="file-name">
                                                <span>{{ vo.fileName }}</span><span v-if="vo.fileSuffix!=null && vo.fileSuffix!=''">{{ `.`+vo.fileSuffix }}</span>
                                                <br />
                                                <small>Added: {{ vo.userVo?.userName }} {{ vo.date }}</small>
                                                <div class="download m-t-xs right">
                                                    <!-- <el-button type="primary" @click="fileDownLoad.downloadFile(vo.fileId)">下载</el-button> -->
                                                    <el-button type="primary" :loading="vo.isDownloading"
                                                        @click="handleDownload($event, vo)">下载</el-button>
                                                </div>
                                            </div>

                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <el-pagination background layout="prev, pager, next, jumper , total"
                        :total="fileDownLoad.totalCount" :page-count="fileDownLoad.totalpages"
                        :current-page="fileDownLoad.currentPage" @current-change="handleCurrentPageChange"
                        ref="pagination" />
                </div>
            </div>
        </div>
    </div>

</template>
<script lang='ts'>
export default
    {
        name: "FileDownload"
    }
</script>
<script lang='ts' setup>
import useFileDownload from '@/hooks/useFileDownload';
import { useFileDownLoadStore } from '@/store/fileDownload';
import type { FileQueryPojo, FileVo, PagePojo } from '@/types';
import { getImageById, getImagePreviewById } from '@/utils/commonUtils';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import useTagService from '@/hooks/useTagService';

let fileDownLoad = ref(useFileDownload());
let { fileVos } = useFileDownload();
let fileDownLoadStore = useFileDownLoadStore();
let tagService = ref(useTagService());

fileDownLoad.value.getFilesByPage({ page: 1, pageSize: 5 });

let pagination = ref();
console.log(pagination.value)

let handleCurrentPageChange = function (val: number) {
    let params: FileQueryPojo = {
        tagIds: selectedTagIdsStage,
        fileName: queryFileNameStage,
    }
    let pagePojo: PagePojo = {
        page: val,
        pageSize: fileDownLoad.value.currentPageSize
    }
    fileDownLoad.value.getFilesByPageAndConditions(pagePojo, params);
}
let handleDownload = function (event: PointerEvent, vo: FileVo) {
    // console.log('this',element)
    vo.isDownloading = true;
    fileDownLoad.value.downloadFile(vo.fileId).then(() => {
        vo.isDownloading = false
    })
}
// 条件查询标签缓存
let selectedTagIdsStage: string[] = []
// 条件查询文件名缓存
let queryFileNameStage: string = ""
let handleFileQueryByCondition = function () {
    selectedTagIdsStage = tagService.value.selectedTagIds;
    queryFileNameStage = fileDownLoad.value.queryFileName;
    let params: FileQueryPojo = {
        tagIds: selectedTagIdsStage,
        fileName: queryFileNameStage,
    }
    let pagePojo = {
        page: 0,
        pageSize: fileDownLoad.value.currentPageSize
    }
    fileDownLoad.value.getFilesByPageAndConditions(pagePojo, params);
}

</script>
<style scoped>
    .download {
        display: block;
    }

    .file-box-container {
        display: flex;
        flex-wrap: wrap;
    }

</style>