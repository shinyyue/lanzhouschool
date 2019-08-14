<template>
    <common id="guide">
        <div class="app-inner containner">
            <menu-list class="center-menu"
                       :menuList="menuList"
                       menuTitle="教学指南"
                       :activeIndex="currentIndex"
                       @change="changeMenu"></menu-list>
            <div class="app-inner-right">
                <img class="news-img"
                     src="../../static/images/news_img.png">
                <!-- 学术信息 -->
                <ul v-show="currentIndex === 0"
                    class="guide-notice-list">
                    <li v-for="(item, index) in newsList"
                        @click="jumpToDetail(item.id, 0)"
                        :key="index"
                        class="guide-item">
                        <i class="guide-style"></i>
                        <span class="guide-desc clamp-line">{{item.title}}</span>
                        <span class="guide-time">{{new Date(item.updateTime).format('yyyy-MM-dd hh:mm:ss')}}</span>
                    </li>
                </ul>
                <!-- 通知公告 -->
                <ul v-show="currentIndex === 1"
                    class="guide-notice-list">
                    <li v-for="(item, index) in newsList"
                        :key="index"
                        @click="jumpToDetail(item.id, 1)"
                        class="guide-item">
                        <i class="guide-style"></i>
                        <span class="guide-desc clamp-line">{{item.title}}</span>
                        <span class="guide-time">{{new Date(item.updateTime).format('yyyy-MM-dd hh:mm:ss')}}</span>
                    </li>
                </ul>
                <ul v-show="currentIndex === 2"
                    class="guide-notice-list">
                    <li v-for="(item, index) in newsList"
                        :key="index"
                        @click="jumpToDetail(item.id, 2)"
                        class="guide-item">
                        <i class="guide-style"></i>
                        <span class="guide-desc clamp-line">{{item.title}}</span>
                        <span class="guide-time">{{new Date(item.updateTime).format('yyyy-MM-dd hh:mm:ss')}}</span>
                    </li>
                </ul>
                <ul v-show="currentIndex === 3"
                    class="guide-notice-list">
                    <li v-for="(item, index) in newsList"
                        :key="index"
                        @click="jumpToDetail(item.id, 3)"
                        class="guide-item">
                        <i class="guide-style"></i>
                        <span class="guide-desc clamp-line">{{item.title}}</span>
                        <span class="guide-time">{{new Date(item.updateTime).format('yyyy-MM-dd hh:mm:ss')}}</span>
                    </li>
                </ul>
                <div class="my-pagination">
                    <button :class="{'disable': pageCount === 1}"
                            :disabled="pageCount === 1">首页</button>

                    <el-pagination background
                                   :current-page="pageCount"
                                   @current-change="changeCount"
                                   layout="prev, pager, next"
                                   :total="total">
                    </el-pagination>
                    <button :class="{'disable': pageCount === 100}"
                            :disabled="pageCount === 100">尾页</button>
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
            menuList: [
                {
                    name: '学生指南'
                },
                {
                    name: '教师指南'
                },
                {
                    name: '管理指南'
                },
                {
                    name: '评审指南'
                }
            ],
            currentIndex: 0,
            newsList: [],
            pageCount: 1,
            total: 0
        }
    },
    computed: {
        currentIndexInit() {
            return this.$route.query && Number(this.$route.query.index)
        }
    },
    watch: {
        currentIndex: {
            handler(val) {
                this.pageCount = 1
                var index = val;
                var columnId = null;
                if(val != this.currentIndexInit){
                    index = this.currentIndexInit
                }
                if (index == 0){
                    columnId = 97;
                } else if (index == 1) {
                    columnId = 98;
                } else if (index == 2){
                    columnId = 99;
                } else {
                    columnId = 100;
                }
                this.getList(columnId)
            },
            immediate: true
        }
    },
    methods: {
        changeMenu(index) {
            this.$router.push('/guide?index=' + index)
            this.currentIndex = index
        },
        changeCount(index) {
            this.pageCount = index
        },
        jumpToDetail(id, currentIndex) {
            this.$router.push(`/guidedetail?id=${id}&index=${currentIndex}`)
        },
        getList(columnId) {
            const data = {
                page: this.pageCount,
                rows: 20,
                collegeId: 0,
                columnId: columnId
            }
            Vue.axios
                .post(this.API_ROOT + 'columnContent/listFront', data)
                .then(res => {
                    this.newsList = (res.data && res.data.items) || []
                    this.total = (res.data && res.data.total) || 0
                })
        },
        // getList2() {
        //     const data = {
        //         page: this.pageCount,
        //         rows: 20,
        //         collegeId: 0,
        //         columnId: 14
        //     }
        //     Vue.axios
        //         .post(this.API_ROOT + 'columnContent/listFront', data)
        //         .then(res => {
        //             this.newsList = (res.data && res.data.items) || []
        //             this.total = (res.data && res.data.total) || 0
        //         })
        // }
    },
    mounted() {
        const query = this.$route.query
        if (query && query.index) {
            this.currentIndex = Number(query.index)
        }
    }
}
</script>

<style lang="less">
@import url('../../static/css/base');
#guide {
    .guide-notice-list {
        margin: 30px 0;
    }
    .guide-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 5px;
        font-size: 16px;
        padding: 8px 0;
        .guide-style {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgb(0, 101, 156);
            margin-right: 10px;
        }
        .guide-desc {
            flex: 1;
            &:hover {
                color: rgb(0, 101, 156);
                cursor: pointer;
            }
        }
        .guide-time {
            width: 200px;
            text-align: right;
        }
    }
}
</style>
