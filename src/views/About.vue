<template>
    <common id="about">
        <div class="app-inner containner">
            <menu-list :menuList="menuList"
                       menuTitle="关于我们"
                       @change="changeMenu"></menu-list>
            <div class="app-inner-right">
                <div v-show="this.currentIndex === 0">
                    <img class="news-img"
                         src="../../static/images/news_img.png">
                    <div class="news-title">关于我们</div>
                    <div class="news-common-time">发布时间:{{new Date(details.updateTime).format('yyyy-MM-dd hh:mm:ss')}}</div>
                    <div class="news-content"
                         v-html="details.content">
                    </div>
                </div>
                <!-- 中心风貌 -->
                <div v-show="this.currentIndex === 1">

                </div>
            </div>
        </div>
    </common>
</template>

<script>
import Vue from 'vue'

export default {
    data() {
        return {
            menuList: [],
            details: {},
            currentIndex: 0
        }
    },
    methods: {
        changeMenu(index) {
            this.currentIndex = index
        },
        getList() {
            const data = {
                page: 1,
                rows: 12,
                collegeId: 0,
                columnId: 19
            }
            Vue.axios
                .post(this.API_ROOT + 'columnContent/listFront', data)
                .then(res => {
                    this.details =
                        (res.data && res.data.items && res.data.items[0]) || {}
                })
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style lang="less">
@import url('../../static/css/base');
#about {
    .about {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
}
</style>
