<template>
<div >
    <div class="ibox " >
        <div class="ibox-title">
            <h5>Your daily feed</h5>
            <div class="ibox-tools">
                <span class="label label-warning-light float-right">10 Messages</span>
                </div>
        </div>
        <div class="ibox-content">

            <div>
                <div class="feed-activity-list">

                    <div class="feed-element">
                        <a class="float-left" href="profile.html">
                            <img alt="image" class="rounded-circle" :src="''">
                        </a>
                        <div class="media-body ">
                            <small class="float-right">5m ago</small>
                            <strong>Monica Smith</strong> posted a new blog. <br>
                            <small class="text-muted">Today 5:60 pm - 12.06.2014</small>

                        </div>
                    </div>

                    <div class="feed-element">
                        <a class="float-left" href="profile.html">
                            <img alt="image" class="rounded-circle" :src="''">
                        </a>
                        <div class="media-body ">
                            <small class="float-right">2h ago</small>
                            <strong>Mark Johnson</strong> posted message on <strong>Monica Smith</strong> site. <br>
                            <small class="text-muted">Today 2:10 pm - 12.06.2014</small>
                        </div>
                    </div>
                    <div class="feed-element">
                        <a class="float-left" href="profile.html">
                            <img alt="image" class="rounded-circle" :src="''">
                        </a>
                        <div class="media-body ">
                            <small class="float-right">2h ago</small>
                            <strong>Janet Rosowski</strong> add 1 photo on <strong>Monica Smith</strong>. <br>
                            <small class="text-muted">2 days ago at 8:30am</small>
                        </div>
                    </div>
                    <div class="feed-element">
                        <a class="float-left" href="profile.html">
                            <img alt="image" class="rounded-circle" :src="''">
                        </a>
                        <div class="media-body ">
                            <small class="float-right text-navy">5h ago</small>
                            <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>. <br>
                            <small class="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
                            <div class="actions">
                                <a href="index.html"  class="btn btn-xs btn-white"><i class="fa fa-thumbs-up"></i> Like </a>
                                <a href="index.html"  class="btn btn-xs btn-white"><i class="fa fa-heart"></i> Love</a>
                            </div>
                        </div>
                    </div>
                    <div class="feed-element">
                        <a class="float-left" href="profile.html">
                            <img alt="image" class="rounded-circle" :src="''">
                        </a>
                        <div class="media-body ">
                            <small class="float-right">2h ago</small>
                            <strong>Kim Smith</strong> posted message on <strong>Monica Smith</strong> site. <br>
                            <small class="text-muted">Yesterday 5:20 pm - 12.06.2014</small>
                            <div class="well">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                Over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                            </div>
                            <div class="float-right">
                                <a href="index.html"  class="btn btn-xs btn-white"><i class="fa fa-thumbs-up"></i> Like </a>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- <button class="btn btn-primary btn-block m-t"><i class="fa fa-arrow-down"></i> Show More</button> -->

            </div>

        </div>
    </div>

</div>
</template>
<script lang='ts'>
export default
{
    name: "test"
}
</script>
<script lang='ts' setup>

</script>
<style scoped>

</style>