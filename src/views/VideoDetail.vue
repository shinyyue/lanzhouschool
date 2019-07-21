<template>
    <common id="video-detail">
        <div class="app-inner containner">
            <video class="video-detail-item"
                   src="../../static/images/test_1.mp4"
                   controls>
                你的浏览器不支持 <code>video</code> 标签.
            </video>
        </div>
    </common>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {}
}
</script>

<style lang="less">
@import url('../../static/css/base');
#video-detail {
    .video-detail-item {
        width: 100%;
        margin-bottom: 30px;
    }
}
</style>
