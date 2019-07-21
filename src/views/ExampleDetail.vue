<template>
    <common id="example-detail">
        <div class="app-inner containner">
            <div class="example-detail">
                <img src="../../static/images/home_exparence.jpg">
            </div>
        </div>
    </common>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        jumpToDetail() {}
    }
}
</script>

<style lang="less">
@import url('../../static/css/base');
#example-detail {
    .app-common-bg {
        display: none;
    }
    .example-detail {
        padding: 0 0 30px;
    }
}
</style>
