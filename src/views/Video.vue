<template>
    <common id="video">
        <div class="app-inner containner">
            <div style="width: 100%;">
                <ul class="video-list">
                    <li class="video-item"
                        v-for="(v, k) in sourceList"
                        :key="k"
                        @click="jumpToDetail(v.id)">
                        <img class="video-img"
                             :src="v.showImg">
                        <img src="../../static/images/home_video_parse.png"
                             class="video-pause">
                        <div class="video-text">{{v.title}}</div>
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
                    <button :class="{'disable': pageCount === total}"
                            :disabled="pageCount === total">尾页</button>
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
            sourceList: [
                {
                    name: 'yj7型电液转辙机'
                },
                {
                    name: 'yj7型电液转辙机'
                },
                {
                    name: 'yj7型电液转辙机'
                },
                {
                    name: 'yj7型电液转辙机'
                }
            ],
            pageCount: 1,
            total: 0
        }
    },
    methods: {
        changeCount(count) {
            this.pageCount = count
            this.getList()
        },
        jumpToDetail(id) {
            this.$router.push(`/videodetail?id=${id}`)
        },
        getList() {
            const data = {
                page: this.pageCount,
                rows: 12,
                collegeId: 0,
                columnId: 8
            }
            Vue.axios
                .post(this.API_ROOT + 'columnContent/listFront', data)
                .then(res => {
                    this.sourceList = (res.data && res.data.items) || []
                    this.total = (res.data && res.data.total) || 0
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
#video {
    .video-list {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        .video-item {
            width: 32%;
            text-align: center;
            font-size: 18px;
            text-align: center;
            margin-bottom: 20px;
            position: relative;
            &:nth-of-type(3n - 1) {
                margin: 0 2% 20px;
            }
            .video-img {
                width: 100%;
                width: 375px;
                height: 240px;
            }
            .video-pause {
                width: 50px;
                height: 50px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -60%);
                cursor: pointer;
            }
            .video-text {
                padding: 10px;
                text-align: center;
                cursor: pointer;
                &:hover {
                    color: rgba(0, 101, 156, 1);
                }
            }
        }
    }
}
</style>
