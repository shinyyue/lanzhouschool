<template>
    <common id="expeirment"
            :showCrumbs="false">
        <div class="expeirment-banner">
            <div class="containner">
                <div class="experiment-background">
                    <div class="expeirment-title">{{reportDetail.expName}}</div>
                    <p class="expeirment-content">{{reportDetail.expIntroduct}}</p>
                    <el-button class="expeirment-btn" type="warning" @click="doExperiment()">我要做实验</el-button>
                    <video class="experiment-video" :src="'http://47.105.130.130:8001/' + reportDetail.videoUrl" controls="controls" width="378" height="254">
                    </video>
                </div>
            </div>
        </div>


        <div class="home-guide">
            <div class="containner">
                <div class="guide-list">
                    <div class="guide-item">
                        <div style="height: 200px; width: 280px; float: right; background: #00A7DB" @click="openDialog(reportDetail.team,'项目团队')">
                            <img src="../../static/images/u93.svg" class="guide-img"/>
                            <span class="guide-desc" >项目团队</span>
                        </div>
                    </div>
                    <div class="guide-item">
                        <div class="guide-bg" style="height: 200px; width: 280px; float: right; background: #812DFF;" @click="openDialog(reportDetail.require,'网络要求')">
                            <img src="../../static/images/u89.svg" class="guide-img" />
                            <span class="guide-desc" >网络要求</span>
                        </div>
                    </div>
                    <div class="guide-item">
                        <div style="height: 200px; width: 280px; float: right; background: #FF9000" @click="openDialog(reportDetail.descript,'项目描述')">
                            <img src="../../static/images/u83.svg" class="guide-img" />
                            <span class="guide-desc">项目描述</span>
                        </div>
                    </div>
                    <div class="guide-item">
                        <div style="height: 200px; width: 280px; float: right; background: #00A7DB" @click="openDialog(dataList,'实验资料')">
                            <img src="../../static/images/u175.svg"  class="guide-img"/>
                            <span class="guide-desc" >实验资料</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-guide">
            <div class="containner">
                <div class="guide-list">
                    <div class="guide-item">
                        <div style="height: 200px; width: 280px; float: right; background: #157AFF" @click="openDialog(reportDetail.service,'服务计划')">
                            <img src="../../static/images/u87.svg" class="guide-img" />
                            <span class="guide-desc">服务计划</span>
                        </div>
                    </div>
                    <div class="guide-item">
                        <div style="height: 200px; width: 280px; float: right; background: #30AFC2" @click="openDialog(reportDetail.guide,'实验指导')">
                            <img src="../../static/images/u91.svg" class="guide-img" />
                            <span class="guide-desc">实验指导</span>
                        </div>
                    </div>
                    <div class="guide-item">
                        <div style="height: 200px; width: 280px; float: right; background: #B5C711" @click="openDialog(reportDetail.feature,'项目特色')">
                            <img src="../../static/images/u85.svg" class="guide-img" />
                            <span class="guide-desc">项目特色</span>
                        </div>
                    </div>
                    <div class="guide-item">
                        <div style="height: 200px; width: 280px; float: right; background: #27C0BB" @click="openDialog(reportDetail.structure,'技术架构')">
                            <img src="../../static/images/u177.svg" class="guide-img" />
                            <span class="guide-desc">技术架构</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title=" "
            :visible.sync="dialogVisible"
            width="800px" >
            <div slot="title" class="head-title">
                <span v-show="dialogTitle"  class="title-spec">{{ dialogTitle }}</span>
            </div>
            <div  v-if="ifText" style="height: 480px; line-height: 1.5;overflow: auto;" v-html="dialogContent"></div>
            <div  v-if="title == '实验资料'" style="height: 480px;overflow: auto;"  class="app-inner-right">
                <ul class="news-notice-list">
                    <li v-for="(item, index) in dataList"
                        :key="index"
                        class="news-item">
                        <i class="news-style"></i>
                        <a class="news-desc clamp-line" :href="API_ROOT + 'dataBank/downloadFile?filePath='+item.url">{{item.name}}</a>
                    </li>
                </ul>
            </div>
            <div v-if="title == '实验指导'|| title == '项目描述'" >
                <iframe :src="dialogContent" width="100%" height="480px" frameborder="1">
                </iframe>
            </div>
            <!--<div  v-if="title == '项目描述'" >-->
                <!--<iframe :src=dialogContent width="100%" height="480px" frameborder="1">-->
                <!--</iframe>-->
            <!--</div>-->
        </el-dialog>

    </common>
</template>

<script>
import Vue from 'vue'
import { Dialog, Button } from 'element-ui'


export default {
    components: {
        [Dialog.name]: Dialog,
        [Button.name]: Button
    },
    data() {
        return {
            reportDetail: {},
            dialogVisible: false,
            dialogContent: '',
            dialogTitle: '',
            title: '',
            ifText: true,
            list : [],
            dataList: []
        }
    },
    computed: {
        id() {
            return this.$route.query && Number(this.$route.query.id)
        }
    },
    mounted() {
        this.queryByReportExpId()
    },
    methods: {
        queryByReportExpId() {
            const data = {
                id: this.id
            }
            Vue.axios
                .get(this.API_ROOT + 'reportExperoment/queryByReportExpId', {
                    params: data
                })
                .then(res => {
                    this.reportDetail = res.data || {}
                    this.getList(res.data.id)
                })
        },
        openDialog(content,title) {
            this.title = title
            if (title === '项目描述' || title=== '实验指导') {
                this.content = content =  (content ? 'http://47.105.130.130:8001/' + content : '')
            }
            if(title != '实验资料' && title != '项目描述' && title != '实验指导'){
                this.ifText = true
            } else {
                this.ifText = false
            }
            // 弹窗
            this.dialogContent = content
            this.dialogTitle = title
            this.dialogVisible = true

        },
        doExperiment() {
            // 我要做实验
            window.location.href="http://47.105.130.130:8099/index.html#/login"
        },
        getList(id) {
            Vue.axios
                .post(this.API_ROOT + 'reportDate/queryReportDataList', {
                    page: 1,
                    rows: 10,
                    key: id
                })
                .then(res => {
                    this.dataList = (res.data && res.data.items) || []                    
                })
        },
    }
}
</script>

<style lang="less">
    @import '../../static/css/base.less';
    #expeirment {
        background: #fff;
        position: relative;
        .el-dialog__headerbtn {
            width: 30px;
            height: 30px;
            top:9px;
        }
        .el-dialog__headerbtn .el-dialog__close {
            color: #fff;
        }
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
        .head-title{
            position: absolute;
            left: 0px;
            top: 0px;
            width: 800px;
            height: 50px;
            background: inherit;
            background-color: rgba(0, 167, 219, 1);
            border: none;
            border-bottom: 0px;
            border-radius: 0px;
            border-bottom-right-radius: 0px;
            border-bottom-left-radius: 0px;
        }
        .title-spec{
            position: relative;
            left: 12px;
            top: 12px;
            font-size: 24px;
            color: white;
        }
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
        .app-content {
            padding: 0;
        }
        .expeirment-banner {
            padding: 164px 0 0;
            overflow: hidden;
            background: rgba(10, 27, 53, 1);
        }
        .containner {
            padding: 0 15px;
        }
        .experiment-background {
            background-image: url(../../static/images/u33.jpg);
            background-size: 100% 100%;
            position: relative;
            height: 300px;
            padding: 20px 15px;
            box-sizing: border-box;
        }
        .expeirment-title {
            color: #FFFFFF;
            font-size: 24px;
        }
        .expeirment-content {
            color: #FFFFFF;
            font-size: 14px;
            margin: 20px 0;
            width: calc(100% - 450px);
            max-width: 800px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
            line-height: 1.6;
            word-break: break-all;
        }
        .expeirment-btn {
            color: #FFFFFF;
            font-size: 18px;
            position: absolute;
            left: 20px;
            bottom:20px;
        }
        .experiment-video {
            position: absolute;
            right: 0;
            bottom: 20px;
            object-fit:fill;
        }
        .home-guide {
            background: #ededed;
            padding: 15px 0;
            .guide-list {
                display: flex;
                flex-direction: row;
                align-items: stretch;
                .guide-item {
                    margin-right: 20px;
                    width: 25%;
                    text-align: center;
                    cursor: pointer;
                    &:hover {
                        opacity: 0.8;
                    }
                    >div {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    &:last-child {
                        margin-right: 0;
                    }
                    .guide-bg {
                        width: 123px;
                        height: 123px;
                        cursor: pointer;
                    }
                    .guide-img {
                        margin-bottom: 10px;
                        // position:absolute;left:45px;top:60px;
                    }
                    .guide-desc {
                        color: #FFFFFF;
                        font-size: 24px;
                        // position: relative;
                        // right:30px;top:120px;
                        &:hover {
                            color: #fff;
                        }
                    }
                }
            }
        }
    }

</style>

