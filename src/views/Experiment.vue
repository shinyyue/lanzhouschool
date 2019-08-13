<template>
    <common id="expeirment"
            :showCrumbs="false">
        <div class="expeirment-banner">
            <div>
                <div class="experiment-background">
                    <span class="expeirment-title">{{reportDetail.expName}}</span>
                    <p class="expeirment-content">{{reportDetail.expIntroduct}}</p>
                    <el-button class="expeirment-btn" type="warning" @click="doExperiment()">我要做实验</el-button>
                    <video :src="reportDetail.videoUrl" controls="controls" width="378" height="234" style="position: relative;left: 1100px">
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
                        <div style="height: 200px; width: 280px; float: right; background: #00A7DB" @click="openDialog(reportDetail.data,'实验资料')">
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
            <div slot="title">
                <span v-show="dialogTitle" >{{ dialogTitle }}</span>
            </div>
            <div style="height: 480px">{{dialogContent}}</div>
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
            dialogTitle: ''
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
                })
        },
        openDialog(content,title) {
            // 弹窗
            this.dialogContent = content
            this.dialogTitle = title
            this.dialogVisible = true

        },
        doExperiment() {
            // 我要做实验
            alert(1111)
        }

    }
}
</script>

<style lang="less">
    @import '../../static/css/base.less';
    #expeirment {
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
        .expeirment-banner {
            padding-top: 168px;
            overflow: hidden;
        }
        .experiment-background {
            background-image: url(../../static/images/u33.jpg);
            background-size: 1903px 300px;
        }
        .expeirment-title {
            color: #FFFFFF;
            font-size: 30px;
            position: relative;
            left:380px;top:25px;
        }
        .expeirment-content {
            color: #FFFFFF;
            font-size: 18px;
            position: relative;
            left:380px;top:45px;
        }
        .expeirment-btn {
            color: #FFFFFF;
            font-size: 18px;
            position: relative;
            left:380px;bottom:20px
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
                    width: 25%;
                    text-align: center;
                    &:last-child {
                        margin-right: 0;
                    }
                    .guide-bg {
                        width: 123px;
                        height: 123px;
                        cursor: pointer;
                        &:hover {
                            color: @active-color;
                        }
                    }
                    .guide-img {
                        position:relative;left:45px;top:60px;
                    }
                    .guide-desc {
                        color: #FFFFFF;
                        font-size: 24px;
                        position: relative;
                        right:30px;top:120px;
                        &:hover {
                            color: @active-color;
                        }
                    }
                }
            }
        }
    }

</style>

