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
                <div v-show="this.currentIndex === 0">
                    <!--<img class="news-img"-->
                         <!--src="../../static/images/news_img.png">-->
                    <div class="news-title">{{details.title}}</div>
                    <div class="news-common-time">发布时间:{{details.updateTime}}</div>
                    <div class="news-content"
                         v-html="details.content">
                    </div>
                </div>
                <!-- 通知公告 -->
                <div v-show="this.currentIndex === 1">
                    <!--<img class="news-img"-->
                    <!--src="../../static/images/news_img.png">-->
                    <div class="news-title">{{details.title}}</div>
                    <div class="news-common-time">发布时间:{{details.updateTime}}</div>
                    <div class="news-content"
                         v-html="details.content">
                    </div>
                </div>
                <div v-show="this.currentIndex === 2">
                    <!--<img class="news-img"-->
                    <!--src="../../static/images/news_img.png">-->
                    <div class="news-title">{{details.title}}</div>
                    <div class="news-common-time">发布时间:{{details.updateTime}}</div>
                    <div class="news-content"
                         v-html="details.content">
                    </div>
                </div>
                <div v-show="this.currentIndex === 3">
                    <!--<img class="news-img"-->
                    <!--src="../../static/images/news_img.png">-->
                    <div class="news-title">{{details.title}}</div>
                    <div class="news-common-time">发布时间:{{details.updateTime}}</div>
                    <div class="news-content"
                         v-html="details.content">
                    </div>
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
            total: 0,
            details: {}
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
        getList(columnId) {
            const data = {
                page: this.pageCount,
                rows: 10,
                collegeId: 0,
                columnId: columnId
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
    },
    mounted() {
        const query = this.$route.query
        if (query && query.index) {
            this.currentIndex = Number(query.index) || 0
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
