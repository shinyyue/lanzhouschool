<template>
    <common id="video-detail">
        <div class="app-inner containner">
            <video class="video-detail-item"
                   :src="details.videoUrl"
                   controls>
                你的浏览器不支持 <code>video</code> 标签.
            </video>
        </div>
    </common>
</template>

<script>
import Vue from 'vue'

export default {
    data() {
        return {
            details: {}
        }
    },
    computed: {
        id() {
            return this.$route.query && Number(this.$route.query.id)
        }
    },
    methods: {
        getDetails() {
            const data = {
                id: this.id
            }
            Vue.axios
                .get(this.API_ROOT + 'columnContent/queryContentById', {
                    params: data
                })
                .then(res => {
                    this.details = res.data || {}
                    this.details.updateTime =
                        this.details.updateTime &&
                        new Date(this.details.updateTime).format(
                            'yyyy-MM-dd hh:mm:ss'
                        )
                })
        }
    },
    mounted() {
        this.getDetails()
    }
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
