<template>
    <common id="source">
        <div class="app-inner containner">
            <div style="width: 100%;">
                <ul class="source-list">
                    <li class="source-item"
                        v-for="(v, k) in sourceList"
                        :key="k"
                        @click="jumpToDetail(v.id)">
                        <img class="source-img"
                             :src="v.showImg">
                        <div class="source-text">{{v.title}}</div>
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
            sourceList: [],
            pageCount: 1,
            total: 0
        }
    },
    methods: {
        jumpToDetail(id) {
            window.location.href = 'http://39.104.97.6/index.html'
        },
        changeCount(count) {
            this.pageCount = count
            this.getList()
        },
        getList() {
            const data = {
                page: this.pageCount,
                rows: 12,
                collegeId: 0,
                columnId: 6
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
#source {
    .source-list {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        .source-item {
            width: 32%;
            text-align: center;
            font-size: 18px;
            text-align: center;
            margin-bottom: 20px;
            &:nth-of-type(3n - 1) {
                margin: 0 2% 20px;
            }
            .source-img {
                width: 375px;
                height: 240px;
                cursor: pointer;
            }
            .source-text {
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
