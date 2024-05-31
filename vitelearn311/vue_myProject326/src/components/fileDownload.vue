<template>
    
    <h2> 下载文件</h2>
    <div class="FileDownLoad">
        <div class="wrapper wrapper-content">
            <div class="row">
                <!-- <div class="col-lg-3">
                    <div class="ibox ">
                        <div class="ibox-content">
                            <div class="file-manager">
                                <h5>Show:</h5>
                                <a href="file_manager.html#" class="file-control active">Ale</a>
                                <a href="file_manager.html#" class="file-control">Documents</a>
                                <a href="file_manager.html#" class="file-control">Audio</a>
                                <a href="file_manager.html#" class="file-control">Images</a>
                                <div class="hr-line-dashed"></div>
                                <button class="btn btn-primary btn-block">Upload Files</button>
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
                                <h5 class="tag-title">Tags</h5>
                                <ul class="tag-list" style="padding: 0">
                                    <li><a href="file_manager.html">Family</a></li>
                                    <li><a href="file_manager.html">Work</a></li>
                                    <li><a href="file_manager.html">Home</a></li>
                                    <li><a href="file_manager.html">Children</a></li>
                                    <li><a href="file_manager.html">Holidays</a></li>
                                    <li><a href="file_manager.html">Music</a></li>
                                    <li><a href="file_manager.html">Photography</a></li>
                                    <li><a href="file_manager.html">Film</a></li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="col-lg-12 animate__animated ">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="file-box" v-for="(vo,index) in fileDownLoad.fileVos"  >
                                <div class="file">
                                    <a href="#">
                                        <span class="corner"></span>
                                        <!-- <div class="icon">
                                            <i class="fa fa-file"></i>
                                        </div> -->
                                        <div class="preview-image" style="display: flex; justify-content: center; ">
                                            <!-- :preview-src-list="fileDownLoad.previewUrlList" 设置预览图片队列 :initial-index="index" 点击预览图从index下标的图片开始 -->
                                            <el-image :src="getImagePreviewById(vo.fileId)" fit="cover" :preview-src-list="fileDownLoad.previewUrlList" :initial-index="index"></el-image>
                                            <!-- <img alt="image" class="img-fluid" :src="getImagePreviewById(vo.fileId)"> -->
                                            
                                        </div>
                                        <div class="file-name">
                                            {{ vo.fileName }}
                                            <br/>
                                            <small>Added: {{ vo.userVo?.userName }} {{ vo.date}}</small>
                                            <div class="download m-t-xs right">
                                                <!-- <el-button type="primary" @click="fileDownLoad.downloadFile(vo.fileId)">下载</el-button> -->
                                                <el-button type="primary" :loading="vo.isDownloading" @click="handleDownload($event,vo)">下载</el-button>
                                            </div>                                           
                                        </div>
                        
                                    </a>
                                </div>

                            </div>
                            <!-- <div class="file-box">
                                <div class="file">
                                    <a href="file_manager.html#">
                                        <span class="corner"></span>

                                        <div class="image">
                                            <img alt="image" class="img-fluid" src="#">
                                        </div>
                                        <div class="file-name">
                                            Italy street.jpg
                                            <br/>
                                            <small>Added: Jan 6, 2014</small>
                                        </div>
                                    </a>

                                </div>
                            </div>
                            <div class="file-box">
                                <div class="file">
                                    <a href="file_manager.html#">
                                        <span class="corner"></span>

                                        <div class="image">
                                            <img alt="image" class="img-fluid" src="#">
                                        </div>
                                        <div class="file-name">
                                            My feel.png
                                            <br/>
                                            <small>Added: Jan 7, 2014</small>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="file-box">
                                <div class="file">
                                    <a href="#">
                                        <span class="corner"></span>

                                        <div class="icon">
                                            <i class="fa fa-music"></i>
                                        </div>
                                        <div class="file-name">
                                            Michal Jackson.mp3
                                            <br/>
                                            <small>Added: Jan 22, 2014</small>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="file-box">
                                <div class="file">
                                    <a href="file_manager.html#">
                                        <span class="corner"></span>

                                        <div class="image">
                                            <img alt="image" class="img-fluid" src="#">
                                        </div>
                                        <div class="file-name">
                                            Document_2014.doc
                                            <br/>
                                            <small>Added: Fab 11, 2014</small>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="file-box">
                                <div class="file">
                                    <a href="file_manager.html#">
                                        <span class="corner"></span>

                                        <div class="icon">
                                            <i class="img-fluid fa fa-film"></i>
                                        </div>
                                        <div class="file-name">
                                            Monica's birthday.mpg4
                                            <br/>
                                            <small>Added: Fab 18, 2014</small>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="file-box">
                                <div class="file">
                                    <a href="file_manager.html#">
                                        <span class="corner"></span>

                                        <div class="icon">
                                            <i class="img-fluid fa fa-film"></i>
                                        </div>
                                        <div class="file-name">
                                            Monica's birthday.mpg4
                                            <br/>
                                            <small>Added: Fab 18, 2014</small>
                                        </div>
                                    </a>
                                </div>
                            </div> -->
                            

                        </div>
                    </div>
                    <el-pagination background layout="prev, pager, next, jumper , total" 
                    :total="fileDownLoad.totalCount"
                    :page-count="fileDownLoad.totalpages"
                    :current-page="fileDownLoad.currentPage"
                    @current-change="handleCurrentPageChange"
                    ref="pagination"/>
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
import type { FileVo } from '@/types';
import { getImageById,getImagePreviewById } from '@/utils/commonUtils';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
let fileDownLoad=ref(useFileDownload());
let {fileVos}=useFileDownload();
let fileDownLoadStore=useFileDownLoadStore();

fileDownLoad.value.getFilesByPage({page:1,pageSize:5});

let pagination=ref();
console.log(pagination.value)

let handleCurrentPageChange=function (val:number){
    let pagePojo={
        page:val,
        pageSize:fileDownLoad.value.currentPageSize
    }
    fileDownLoad.value.getFilesByPage(pagePojo);
}
let handleDownload=function(event:PointerEvent,vo:FileVo){
    // console.log('this',element)
    vo.isDownloading=true;
    fileDownLoad.value.downloadFile(vo.fileId).then(()=>{
        vo.isDownloading=false
    })
}

</script>
<style scoped>
.download{
    display: block;
}

</style>