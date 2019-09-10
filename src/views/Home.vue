<template>
    <common id="home"
            :showCrumbs="false">
        <div class="home-banner">
            <el-carousel :interval="5000">
                <el-carousel-item class="banner-item"
                                  v-for="(item, index) in bannerList"
                                  :key="index">
                    <img class="item-bg"
                         :src="item.showImg">
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="home-guide">
            <div class="containner project-inner">
                <div class="guide-list">
                    <div class="guide-item" v-for="item in guideList">
                        <img :src="item.showImg"
                             class="guide-bg" @click="jumpTo(item.path)">
                        <div class="guide-desc">
                            <!-- <span class="desc-inner"
                                  @click="jumpToExperiment(k)">{{v.text}}</span> -->
                            <span class="guide-desc" @click="jumpTo(item.path)">{{item.content}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-project">
            <div class="containner project-inner">
                <div class="project-title">
                    <span>实验教学中心 | 虚拟仿真实验项目</span>
                    <div class="project-change">
                        <img :src="proCurrentIndex === 1 ? leftUndoIcon : leftDoIcon"
                             class="change-button"
                             @click="changeLast()">
                        <img :src="proCurrentIndex === projectsList.length  ? rightUndoIcon : rightDoIcon"
                             class="change-button"
                             @click="changeNext()">
                    </div>
                </div>
                <el-carousel :autoplay="false"
                             indicator-position="none"
                             :loop="false"
                             arrow="never"
                             height="250"
                             ref="projectCarousel">
                    <el-carousel-item v-for="(item, index) in projectsList"
                                      :key="index"
                                      class="project-list">
                        <div class="project-item"
                             v-for="(v, k) in item"
                             :key="`list_${k}`" @click="jumpToExperiment(v)">
                            <img :src="FILE_ROOT+ v.imgUrl"
                                 class="project-bg">
                            <div class="project-desc">
                                <span class="desc-inner">{{v.expName}}</span>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="home-news">
            <div class="home-news-inner containner">
                <div class="news-notice">
                    <div class="news-title">
                        <h3>新闻公告</h3>
                        <span @click="jumpToNews()">+ 更多</span>
                    </div>
                    <ul class="news-list">
                        <li class="news-item"
                            @click="jumpToNewsDetail(item.id)"
                            v-for="(item, index) in newsList"
                            :key="index">
                            <i class="news-style"></i>
                            <span class="news-desc clamp-line">{{item.title}}</span>
                            <span class="news-time">{{new Date(item.updateTime).format('yyyy-MM-dd hh:mm:ss')}}</span>
                        </li>
                    </ul>
                </div>
                <div class="news-result">
                    <div class="news-title">
                        <h3>规章制度</h3>
                        <span @click="jumpToRules()">+ 更多</span>
                    </div>
                    <ul class="news-list">
                        <li class="news-item"
                            @click="jumpToRulesDetail(item)"
                            v-for="(item, index) in rulesList"
                            :key="index">
                            <i class="news-style"></i>
                            <span class="news-desc clamp-line">{{item.title}}</span>
                            <span class="news-time">{{new Date(item.updateTime).format('yyyy-MM-dd hh:mm:ss')}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- <div class="home-project home-source">
            <div class="containner">
                <div class="project-title">
                    <span>资源共享</span>
                    <div class="project-change">
                        <img :src="sourceIndex === 1 ? leftUndoIcon : leftDoIcon"
                             class="change-button"
                             @click="changeSourceLast()">
                        <img :src="sourceIndex === sourceList.length  ? rightUndoIcon : rightDoIcon"
                             class="change-button"
                             @click="changeSourceNext()">
                    </div>
                </div>
                <el-carousel :autoplay="false"
                             indicator-position="none"
                             :loop="false"
                             arrow="never"
                             height="300"
                             ref="sourceCarousel">
                    <el-carousel-item v-for="(item, index) in sourceList"
                                      :key="index"
                                      class="project-list">
                        <div class="project-item"
                             v-for="(v, k) in item"
                             :key="`source_list_${k}`"
                             @click="jumpToXuNiWeb()">
                            <img :src="v.showImg"
                                 class="project-bg">
                            <div class="source-desc">{{v.content}}</div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div> -->
        <div class="home-project home-source home-video">
            <div class="containner">
                <div class="project-title">
                    <span>经典案例 | 视频集锦</span>
                    <div class="project-change">
                        <img :src="videoIndex === 1 ? leftUndoIcon : leftDoIcon"
                             class="change-button"
                             @click="changeVideoLast()">
                        <img :src="videoIndex === videoList.length  ? rightUndoIcon : rightDoIcon"
                             class="change-button"
                             @click="changeVideoNext()">
                    </div>
                </div>
                <el-carousel :autoplay="false"
                             indicator-position="none"
                             :loop="false"
                             arrow="never"
                             height="300"
                             ref="videoCarousel">
                    <el-carousel-item v-for="(item, index) in videoList"
                                      :key="index"
                                      class="project-list">
                        <div class="project-item"
                             v-for="(v, k) in item"
                             :key="`video_list_${k}`">
                            <div>
                                <img src="../../static/images/home_video_parse.png"
                                     class="source-video-parse">
                                <img :src="v.showImg"
                                     class="project-bg"
                                     @click="jumpToVideo(v.id)">
                            </div>

                            <div class="source-desc">{{v.name}}</div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <!-- <div class="home-footer">
            <div class="home-footer-inner containner">
                <img src="../../static/images/u150.jpg" />
                <img src="../../static/images/u152.jpg" />
                <img src="../../static/images/u154.jpg" />
                <img src="../../static/images/u156.jpg" />
                <img src="../../static/images/u158.jpg" />
                <img src="../../static/images/u160.jpg" />
                <img src="../../static/images/u162.jpg" />
                <img src="../../static/images/u164.jpg" />
            </div>
        </div> -->

    </common>
</template>

<script>
import { Carousel, CarouselItem } from 'element-ui'
import Vue from 'vue'

export default {
    components: {
        [Carousel.name]: Carousel,
        [CarouselItem.name]: CarouselItem
    },
    data() {
        return {
            bannerList: [
                {
                    bgImg: require('../../static/images/home_bg.jpg'),
                    path: '/center'
                },
                {
                    bgImg: require('../../static/images/home_bg.jpg'),
                    path: '/center'
                },
                {
                    bgImg: require('../../static/images/home_bg.jpg'),
                    path: '/center'
                }
            ],
            projectsList: [],
            proPage: 1,
            proCurrentIndex: 1,
            // sourceList: [],
            sourcePage: 1,
            newsList: [],
            rulesList: [],
            sourceIndex: 1,
            videoList: [],
            videoIndex: 1,
            videoPage: 1,
            leftUndoIcon: require('../../static/images/home_arrow_left_undo.png'),
            rightUndoIcon: require('../../static/images/home_arrow_right_undo.png'),
            leftDoIcon: require('../../static/images/home_arrow_left_do.png'),
            rightDoIcon: require('../../static/images/home_arrow_right_do.png'),
            guideList: [
                {
                    key: 1,
                    showImg: require('../../static/images/student-guide.png'),
                    content: '学生指南',
                    path: '/guide?index=0'
                },
                {
                    key: 2,
                    showImg: require('../../static/images/teacher-guide.png'),
                    content: '教师指南',
                    path: '/guide?index=1'
                },
                {
                    key: 3,
                    showImg: require('../../static/images/manager-guide.png'),
                    content: '管理指南',
                    path: '/guide?index=2'
                },
                {
                    key: 4,
                    showImg: require('../../static/images/review-guide.png'),
                    content: '评审指南',
                    path: '/guide?index=3'
                },
                {
                    key: 5,
                    showImg: require('../../static/images/plat.png'),
                    content: '虚拟仿真实验教学平台',
                    path: 'http://47.105.130.130:8099/index.html#/login'
                },
                {
                    key: 6,
                    showImg: require('../../static/images/class-center.png'),
                    content: '虚拟仿真实验教学中心',
                    path: 'http://gdxkfz.lzjtu.edu.cn/'
                },
            ],
        }
    },
    mounted() {
        this.getBannerList()
        this.getProjectList()
        this.getNewsList()
        this.getRulesList()
        // this.getSourceList()
        this.getVideoList()
        this.getGuideList()
    },
    methods: {
        getBannerList() {
            const data = {
                page: 1,
                rows: 10000,
                collegeId: 0,
                columnId: 1
            }
            Vue.axios
                .post(this.API_ROOT + 'columnContent/listFront', data)
                .then(res => {
                    this.bannerList = (res.data && res.data.items) || []
                })
        },
        getProjectList() {
            const data = {
                page: this.proPage,
                rows: 4,
                collegeId: 0,
                columnId: 2
            }
            Vue.axios
                .post(this.API_ROOT + 'reportExperoment/queryReportExpList', data)
                .then(res => {
                    if (res.data && res.data.items) {
                        if (res.data.items.length === 4) {
                            this.proPage++
                            this.getProjectList()
                        }
                        this.projectsList = [
                            ...this.projectsList,
                            ...[res.data.items]
                        ]
                    }
                })
        },
        getNewsList() {
            const data = {
                page: 1,
                rows: 5,
                collegeId: 0,
                columnId: 12
            }
            Vue.axios
                .post(this.API_ROOT + 'columnContent/listFront', data)
                .then(res => {
                    if (res.data && res.data.items) {
                        this.newsList = res.data.items
                    }
                })
        },
        // getSourceList() {
        //     const data = {
        //         page: this.sourcePage,
        //         rows: 4,
        //         collegeId: 0,
        //         columnId: 6
        //     }
        //     Vue.axios
        //         .post(this.API_ROOT + 'columnContent/listFront', data)
        //         .then(res => {
        //             if (res.data && res.data.items) {
        //                 if (res.data && res.data.items) {
        //                     if (res.data.items.length === 4) {
        //                         this.sourcePage++
        //                         this.getSourceList()
        //                     }
        //                     this.sourceList = [
        //                         ...this.sourceList,
        //                         ...[res.data.items]
        //                     ]
        //                 }
        //             }
        //         })
        // },
        getVideoList() {
            const data = {
                page: this.videoPage,
                rows: 3,
                collegeId: 0,
                columnId: 7
            }
            Vue.axios
                .post(this.API_ROOT + 'columnContent/listFront', data)
                .then(res => {
                    if (res.data && res.data.items) {
                        if (res.data && res.data.items) {
                            if (res.data.items.length === 3) {
                                this.videoPage++
                                this.getVideoList()
                            }
                            this.videoList = [
                                ...this.videoList,
                                ...[res.data.items]
                            ]
                        }
                    }
                })
        },
        getRulesList() {
            Vue.axios
                .get(this.API_ROOT + 'crmColleController/queryGzzd')
                .then(res => {
                    if (res.data && res.data.length > 0) {
                        this.rulesList = res.data
                    }
                })
        },
        getGuideList() {
            // const data = {
            //     page: 1,
            //     rows: 10000,
            //     collegeId: 0,
            //     columnId: 1
            // }
            // Vue.axios
            //     .post(this.API_ROOT + 'columnContent/listFront', data)
            //     .then(res => {
            //         this.bannerList = (res.data && res.data.items) || []
            //     })
        },
        jumpToExperiment(val) {
            // debugger
            this.$router.push(`/experiment?id=${val.id}`)
        },
        jumpToNews() {
            this.$router.push('/news')
        },
        jumpToNewsDetail(id) {
            this.$router.push('/newsdetail?id=' + id + '&index=1')
        },
        jumpToRules() {
            this.$router.push('/rules')
        },
        jumpToXuNiWeb() {
            window.location.href = 'http://47.105.130.130:8099/index.html'
        },
        // todo: 验证数据源是否正确，怀疑columnID不对
        jumpToRulesDetail(item) {
            const index = item.columnId === 17 ? 1 : 0
            this.$router.push('/rulesdetail?id=' + item.id + '&index=' + index)
        },
        changeLast() {
            if (this.proCurrentIndex === 1) return
            this.proCurrentIndex--
            this.$refs.projectCarousel.activeIndex = this.proCurrentIndex - 1
        },
        changeNext() {
            if (
                this.proCurrentIndex === this.projectsList.length &&
                this.proCurrentIndex
            )
                return
            this.proCurrentIndex++
            this.$refs.projectCarousel.activeIndex = this.proCurrentIndex - 1
        },
        // changeSourceLast() {
        //     if (this.sourceIndex === 1) return
        //     this.sourceIndex--
        //     this.$refs.sourceCarousel.activeIndex = this.sourceIndex - 1
        // },
        // changeSourceNext() {
        //     if (this.sourceIndex === this.sourceList.length && this.sourceIndex)
        //         return
        //     this.sourceIndex++
        //     this.$refs.sourceCarousel.activeIndex = this.sourceIndex - 1
        // },
        changeVideoLast() {
            if (this.videoIndex === 1) return
            this.videoIndex--
            this.$refs.videoCarousel.activeIndex = this.videoIndex - 1
        },
        changeVideoNext() {
            if (this.videoIndex === this.videoList.length && this.videoIndex)
                return
            this.videoIndex++
            this.$refs.videoCarousel.activeIndex = this.videoIndex - 1
        },
        jumpToCenter() {
            this.$router.push('/center')
        },
        jumpToVideo(id) {
            this.$router.push('/videodetail?id=' + id)
        },
        jumpTo(url) {
            if(url.indexOf('http') != -1){
                window.location.href = url
            } else {
                this.$router.push(url)
            }
        },
    }
}
</script>

<style lang="less">
@import '../../static/css/base.less';
#home {
    background: #fff;
    position: relative;
    .app-head {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
        width: 100%;
        background: rgba(8, 73, 163, 0.75);
        .head-top {
            background: rgba(8, 73, 163, 0.1);
        }
        .head-menu {
            background: rgba(8, 73, 163, 0.1);
            .menu-list-item {
                border-bottom: 2px solid rgba(8, 73, 163, 0.75);
                &:hover {
                    border-bottom: 2px solid rgba(25, 158, 216, 1);
                }
            }
        }
    }
    .app-content {
        padding: 0;
    }
    .home-banner {
        overflow: hidden;
        .banner-item {
            .item-bg {
                width: 100%;
                height: 500px;
            }
            .item-inner {
                position: absolute;
                top: 0;
                left: 0;
                right: 50%;
                bottom: 0;
                overflow: hidden;
                padding: 50px 0 0 80px;
                text-align: left;
                color: #fff;
                .inner-title {
                    font-size: 24px;
                    font-weight: bold;
                }
                .inner-intro {
                    font-size: 14px;
                    margin: 30px 0;
                }
                .inner-more {
                    padding: 10px 40px;
                    background: #ff9900;
                    border-radius: 4px;
                    border: none;
                    color: #fff;
                }
            }
        }
        .el-carousel__container {
            height: 465px;
        }
        .el-carousel__indicator {
            width: 16px;
            height: 16px;
            margin: 0 5px 0 5px;
            padding: 0;
            background: rgba(25, 158, 216, 1);
            border-radius: 50%;
        }
        .el-carousel__button {
            width: 16px;
            height: 16px;
            border-radius: 50%;
        }
        .el-carousel__indicators--horizontal {
            bottom: 10px;
        }
    }
    .home-project {
        background: #ededed;
        padding: 30px 0;
        .project-title {
            color: #666;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 30px;
            text-align: center;
            position: relative;
            .project-change {
                position: absolute;
                right: 0;
                top: 50%;
                > img {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                }
            }
        }
        .project-list {
            display: flex;
            flex-direction: row;
            align-items: stretch;
            .project-item {
                margin-right: 20px;
                width: 25%;
                text-align: center;

                &:last-child {
                    margin-right: 0;
                }
                .project-bg {
                    width: 100%;
                    width: 280px;
                    height: 180px;
                    cursor: pointer;
                }
                .project-desc {
                    background: @df-color;
                    color: #fff;
                    padding: 20px 0;
                    margin: 0 auto;
                    width: 280px;
                    text-align: center;
                    cursor: pointer;
                    font-size: 16px;
                    &:hover {
                        color: @active-color;
                    }
                }
            }
        }
        .project-inner {
            .el-carousel__container {
                height: 250px;
            }
        }
    }
    .home-news {
        background: #fff;
        .home-news-inner {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        .news-notice,
        .news-result {
            flex: 1;
            align-self: flex-start;
        }
        .news-notice {
            margin-right: 30px;
        }
        .news-title {
            padding: 20px 0;
            border-bottom: 1px solid #999;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            > h3 {
                font-size: 24px;
                color: #6b6b6b;
                font-weight: bold;
            }
            > span {
                &:hover {
                    color: rgb(0, 101, 156);
                    cursor: pointer;
                }
            }
        }
        .news-list {
            padding: 20px 0;
            .news-item {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 10px;
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
    }
    .home-source {
        background: #ededed;
        .project-list {
            .project-item {
                position: relative;
                width: 33.33%;
                .project-bg {
                    width: 375px;
                    height: 240px;
                }
            }
        }
        .source-desc {
            padding: 10px;
            text-align: center;
            font-size: 16px;
            color: #666;
            background: rgba(0, 0, 0, 0);
            cursor: pointer;
            &:hover {
                color: @active-color;
            }
        }

        .source-video-parse {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -60%);
            cursor: pointer;
        }
    }
    .home-video {
        background: #fff;
    }
    .home-footer {
        background: @df-color;
        margin: 0 auto;

        .home-footer-inner {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 30px 0;
            border-bottom: 1px solid #999;
            > img {
                height: 40px;
                margin-right: 5px;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
    .home-guide {
        background: #ededed;
        padding: 30px 0;
        .guide-list {
            display: flex;
            flex-direction: row;
            align-items: stretch;
            .guide-item {
                margin-right: 20px;
                width: 15%;
                text-align: center;
                &:last-child {
                    margin-right: 0;
                }
                .guide-bg {
                    /*width: 100%;*/
                    width: 123px;
                    height: 123px;
                    cursor: pointer;
                }
                .guide-desc {
                    color: #999;
                    padding: 20px 0;
                    margin: 0 auto;
                    width: 123px;
                    text-align: center;
                    cursor: pointer;
                    font-size: 15px;
                    &:hover {
                        color: @active-color;
                    }
                }
            }
        }
    }
}
</style>

