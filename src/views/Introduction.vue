<template>
    <common id="center">
        <div class="app-inner containner">
            <menu-list :menuList="menuList"
                       menuTitle="学校介绍"
                       @change="changeMenu"></menu-list>
            <div class="app-inner-right">
                <!-- 交大概况 -->
                <div v-show="this.currentIndex === 0">
                    <img class="news-img"
                         src="../../static/images/news_img.png">
                    <div class="news-title">{{details.title}}</div>
                    <div class="news-common-time">发布时间:{{details.updateTime}}</div>
                    <div class="news-content"
                         v-html="details.content">
                    </div>
                </div>
                <!-- 校园风光 -->
                <div v-show="this.currentIndex === 1">
                    <ul class="news-style">
                        <li class="news-style-item"
                            v-for="(item, index) in newsStyleList"
                            :key="index">
                            <img :src="item.showImg">
                            <div class="style-item-title">{{item.content}}</div>
                        </li>
                    </ul>

                    <div class="my-pagination">
                        <button :class="{'disable': pageCount === 1}"
                                :disabled="pageCount === 1"
                                @click="jumpTo(1)">首页</button>

                        <el-pagination background
                                       :page-size="9"
                                       :current-page="pageCount"
                                       @current-change="changeCount"
                                       layout="prev, pager, next"
                                       :total="total">
                        </el-pagination>
                        <button :class="{'disable': pageCount === (Math.floor(total / 9) + 1)}"
                                :disabled="pageCount === (Math.floor(total / 9) + 1)"
                                @click="jumpTo(Math.floor(total / 9) + 1)">尾页</button>
                    </div>

                </div>
            </div>

        </div>
    </common>
</template>

<script>
import Vue from 'vue'
import { Pagination } from 'element-ui'

export default {
    components: {
        [Pagination.name]: Pagination
    },
    data() {
        return {
            menuList: [
                {
                    name: '交大概况'
                },
                {
                    name: '校园风光'
                }
            ],
            currentIndex: 0,
            newsStyleList: [],
            pageCount: 1,
            total: 0,
            details: {}
        }
    },
    methods: {
        changeMenu(index) {
            this.currentIndex = index
        },
        changeCount(index) {
            this.pageCount = index
            this.getList()
        },
        jumpTo(page) {
            this.pageCount = page
            this.getList()
        },
        getDetails() {
            const data = {
                page: 1,
                rows: 10000,
                collegeId: 0,
                columnId: 10
            }
            Vue.axios
                .post(this.API_ROOT + 'columnContent/listFront', data)
                .then(res => {
                    this.details =
                        (res.data &&
                            res.data.items.length > 0 &&
                            res.data.items[0]) ||
                        {}
                    this.details.updateTime = new Date(
                        this.details.updateTime
                    ).format('yyyy-MM-dd hh:mm:ss')
                })
        },
        getList() {
            const data = {
                page: this.pageCount,
                rows: 9,
                collegeId: 0,
                columnId: 11
            }
            Vue.axios
                .post(this.API_ROOT + 'columnContent/listFront', data)
                .then(res => {
                    this.newsStyleList = (res.data && res.data.items) || []
                    this.total = (res.data && res.data.total) || 0
                })
        }
    },
    mounted() {
        this.getDetails()
        this.getList()
    }
}
</script>

<style lang="less">
@import url('../../static/css/base');
#center {
    .news-style {
        display: flex;
        flex-wrap: wrap;
    }
    .news-style-item {
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 0 3% 20px 0;
        > img {
            width: 300px;
            height: 220px;
            margin-bottom: 10px;
        }
        .style-item-title {
            width: 100%;
            text-align: center;
        }
    }
}
</style>
