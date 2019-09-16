<template>
    <common id="news">
        <div class="app-inner containner">
            <menu-list class="center-menu"
                       :menuList="menuList"
                       menuTitle="通知公告"
                       :activeIndex="currentIndex"
                       @change="changeMenu"></menu-list>
            <div class="app-inner-right">
                <img class="news-img"
                     src="../../static/images/news_img.png">
                <!-- 学术信息 -->
                <ul v-show="currentIndex === 0"
                    class="news-notice-list">
                    <li v-for="(item, index) in newsList"
                        @click="jumpToDetail(item.id, 0)"
                        :key="index"
                        class="news-item">
                        <i class="news-style"></i>
                        <span class="news-desc clamp-line">{{item.title}}</span>
                        <span class="news-time">{{new Date(item.updateTime).format('yyyy-MM-dd hh:mm:ss')}}</span>
                    </li>
                </ul>
                <!-- 通知公告 -->
                <ul v-show="currentIndex === 1"
                    class="news-notice-list">
                    <li v-for="(item, index) in newsList"
                        :key="index"
                        @click="jumpToDetail(item.id, 1)"
                        class="news-item">
                        <i class="news-style"></i>
                        <span class="news-desc clamp-line">{{item.title}}</span>
                        <span class="news-time">{{new Date(item.updateTime).format('yyyy-MM-dd hh:mm:ss')}}</span>
                    </li>
                </ul>
                <div class="my-pagination">
                    <button :class="{'disable': pageCount === 1}"
                            :disabled="pageCount === 1"
                            @click="changeCount(1)">首页</button>

                    <el-pagination background
                                   :current-page="pageCount"
                                   @current-change="changeCount"
                                   layout="prev, pager, next"
                                   :total="total">
                    </el-pagination>
                    <button :class="{'disable': pageCount === Math.ceil(total / 10)}"
                            :disabled="pageCount === Math.ceil(total / 10)"
                            @click="changeCount(Math.ceil(total / 10))">尾页</button>
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
                    name: '学术信息'
                },
                {
                    name: '通知公告'
                }
            ],
            currentIndex: 0,
            newsList: [],
            pageCount: 1,
            total: 0
        }
    },
    watch: {
        currentIndex: {
            handler(val) {
                this.pageCount = 1
                val === 0 ? this.getList() : this.getList2()
            },
            immediate: true
        }
    },
    methods: {
        changeMenu(index) {
            this.currentIndex = index
        },
        changeCount(index) {
            this.pageCount = index
            this.currentIndex === 0 ? this.getList() : this.getList2()
        },
        jumpToDetail(id, currentIndex) {
            this.$router.push(`/newsdetail?id=${id}&index=${currentIndex}`)
        },
        getList() {
            const data = {
                page: this.pageCount,
                rows: 10,
                collegeId: 0,
                columnId: 13
            }
            Vue.axios
                .post(this.API_ROOT + 'columnContent/listFront', data)
                .then(res => {
                    this.newsList = (res.data && res.data.items) || []
                    this.total = (res.data && res.data.total) || 0
                })
        },
        getList2() {
            const data = {
                page: this.pageCount,
                rows: 10,
                collegeId: 0,
                columnId: 14
            }
            Vue.axios
                .post(this.API_ROOT + 'columnContent/listFront', data)
                .then(res => {
                    this.newsList = (res.data && res.data.items) || []
                    this.total = (res.data && res.data.total) || 0
                })
        }
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
#news {
    .news-notice-list {
        margin: 30px 0;
    }
    .news-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 5px;
        font-size: 16px;
        padding: 8px 0;
        .news-style {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgb(0, 101, 156);
            margin-right: 10px;
        }
        .news-desc {
            flex: 1;
            &:hover {
                color: rgb(0, 101, 156);
                cursor: pointer;
            }
        }
        .news-time {
            width: 200px;
            text-align: right;
        }
    }
}
</style>
