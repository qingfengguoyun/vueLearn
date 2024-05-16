<template>
    
    <h2> This is FilesRoom Component</h2>
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
                <div class="col-lg-12 animated fadeInRight">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="file-box" v-for="vo in fileDownLoad.fileVos.value"  >
                                <div class="file">
                                    <a href="#">
                                        <span class="corner"></span>
                                        {{ vo }}
                                        <!-- <div class="icon">
                                            <i class="fa fa-file"></i>
                                        </div> -->
                                        <div class="image">
                                            <img alt="image" class="img-fluid" :src="getImagePreviewById(vo.fileId)">
                                        </div>
                                        <div class="file-name">
                                            Document_2014.doc
                                            <br/>
                                            <small>Added: Jan 11, 2014</small>
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
import { getImageById,getImagePreviewById } from '@/utils/commonUtils';
let fileDownLoad=useFileDownload();
let {fileVos}=useFileDownload();
let fileDownLoadStore=useFileDownLoadStore();

fileDownLoad.getFilesByPage({page:1,pageSize:5});

</script>
<style scoped>

</style>