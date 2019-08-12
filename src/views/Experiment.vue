<template>
    <common id="expeirment"
            :showCrumbs="false">
        <div class="expeirment-banner">
            <div class="app-common-bg" style="">
                <img src="../../static/images/u33.jpg">
            </div>
            <div>
                <div>
                    <span>{{reportDetail.expName}}</span>
                    <p>{{reportDetail.expIntroduct}}</p>
                    <el-button type="warning" @click="doExperiment()">我要做实验</el-button>
                </div>
                <div>
                    <video :src="reportDetail.videoUrl" controls="controls">
                    </video>
                </div>
            </div>
        </div>

        <div style="display: block">
            <div style="height: 200px; width: 280px; float: right; background: #00A7DB" @click="openDialog(reportDetail.data)">
                <img src="../../static/images/u175.svg"/>
                <span>实验资料</span>
            </div>
            <div style="height: 200px; width: 280px; float: right; background: #812DFF" @click="openDialog(reportDetail.require)">
                <img src="../../static/images/u89.svg"/>
                <span>网络要求</span>
            </div>
            <div style="height: 200px; width: 280px; float: right; background: #FF9000" @click="openDialog(reportDetail.descript)">
                <img src="../../static/images/u83.svg"/>
                <span>项目描述</span>
            </div>
            <div style="height: 200px; width: 280px; float: right; background: #00A7DB" @click="openDialog(reportDetail.team)">
                <img src="../../static/images/u93.svg"/>
                <span>项目团队</span>
            </div>
        </div>
        <div style="display: block">
            <div style="height: 200px; width: 280px; float: right; background: #157AFF" @click="openDialog(reportDetail.service)">
                <img src="../../static/images/u87.svg"/>
                <span>服务计划</span>
            </div>
            <div style="height: 200px; width: 280px; float: right; background: #30AFC2" @click="openDialog(reportDetail.guide)">
                <img src="../../static/images/u91.svg"/>
                <span>实验指导</span>
            </div>
            <div style="height: 200px; width: 280px; float: right; background: #B5C711" @click="openDialog(reportDetail.feature)">
                <img src="../../static/images/u85.svg"/>
                <span>项目特色</span>
            </div>
            <div style="height: 200px; width: 280px; float: right; background: #27C0BB" @click="openDialog(reportDetail.structure)">
                <img src="../../static/images/u177.svg"/>
                <span>技术架构</span>
            </div>
        </div>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="800px" >
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
            dialogContent: ''
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
        openDialog(content) {
            // 弹窗
            this.dialogContent = content
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
    }

</style>

