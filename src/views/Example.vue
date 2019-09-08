<template>
    <common id="example">
        <div class="app-inner containner">
            <div style="width: 100%;">
                <ul class="example-list">
                    <li class="example-item"
                        v-for="(v, k) in exampleList"
                        :key="k"
                        @click="jumpToDetail(v.id)">
                        <img class="example-img"
                             :src="v.showImg">
                        <div class="example-text">{{v.title}}</div>
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
            exampleList: [
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
        jumpToDetail(id) {
            this.$router.push(`/exampledetail?id=${id}`)
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
                columnId: 7
            }
            Vue.axios
                .post(this.API_ROOT + 'columnContent/listFront', data)
                .then(res => {
                    this.exampleList = (res.data && res.data.items) || []
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
#example {
    .example-list {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        .example-item {
            width: 32%;
            text-align: center;
            font-size: 18px;
            text-align: center;
            margin-bottom: 20px;
            &:nth-of-type(3n - 1) {
                margin: 0 2% 20px;
            }
            .example-img {
                width: 100%;
                cursor: pointer;
                width: 375px;
                height: 240px;
            }
            .example-text {
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
