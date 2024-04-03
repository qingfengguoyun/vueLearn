<template>
    <div class="ibox-content">
        <h2>用户列表</h2>

        <div class="input-group">
            <input type="text" placeholder="Search client " class="input form-control">
            <span class="input-group-append">
                <button type="button" class="btn btn btn-primary"> <i class="fa fa-search"></i> Search</button>
            </span>
        </div>
        <div class="clients-list">
            <ul class="nav nav-tabs">
                <li><a class="nav-link active" data-toggle="tab" href="clients.html#tab-1"><i class="fa fa-user"></i>
                        全部用户</a></li>
            </ul>
            <div class="tab-content">
                <div id="tab-1" class="tab-pane active">
                    <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 100%;">
                        <div class="full-height-scroll" style="overflow: hidden; width: auto; height: 100%;">
                            <div class="table-responsive">
                                <table class="table table-striped table-hover">
                                    <tbody>
                                        <tr>
                                            <td class="client-avatar"><img alt="image" > </td>
                                            <td><a href="clients.html#contact-1" class="client-link">Anthony Jackson</a>
                                            </td>
                                            <td> Tellus Institute</td>
                                            <td class="contact-type"><i class="fa fa-envelope"> </i></td>
                                            <td> gravida@rbisit.com</td>
                                            <td class="client-status"><span class="label label-primary">Active</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="client-avatar"><img alt="image"> </td>
                                            <td><a href="clients.html#contact-2" class="client-link">Rooney Lindsay</a>
                                            </td>
                                            <td>Proin Limited</td>
                                            <td class="contact-type"><i class="fa fa-envelope"> </i></td>
                                            <td> rooney@proin.com</td>
                                            <td class="client-status"><span class="label label-primary">Active</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="client-avatar"><img alt="image"> </td>
                                            <td><a href="clients.html#contact-3" class="client-link">Lionel Mcmillan</a>
                                            </td>
                                            <td>Et Industries</td>
                                            <td class="contact-type"><i class="fa fa-phone"> </i></td>
                                            <td> +432 955 908</td>
                                            <td class="client-status"></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="slimScrollBar"
                            style="background: rgb(0, 0, 0); width: 7px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 366.599px;">
                        </div>
                        <div class="slimScrollRail"
                            style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;">
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
        name:"TestPage2"
}
</script>
<script lang='ts' setup>

</script>
<style scoped></style>