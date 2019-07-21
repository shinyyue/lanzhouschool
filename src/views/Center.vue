<template>
    <common id="center">
        <div class="app-inner containner">
            <ul class="center-list">
                <li class="center-item"
                    v-for="(v, k) in centerList"
                    :key="k">{{v.name}}</li>
            </ul>
        </div>
    </common>
</template>

<script>
export default {
    data() {
        return {
            centerList: [
                {
                    name: '土木工程学院'
                },
                {
                    name: '交通运输学院'
                },
                {
                    name: '土木工程学院'
                },
                {
                    name: '交通运输学院'
                }
            ]
        }
    },
    methods: {}
}
</script>

<style lang="less">
@import url('../../static/css/base');
#center {
    .center-list {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        .center-item {
            width: 32%;
            text-align: center;
            height: 70px;
            line-height: 70px;
            font-size: 18px;
            background: #99ccff;
            text-align: center;
            margin-bottom: 20px;
            &:nth-of-type(3n - 1) {
                margin: 0 2% 20px;
            }
            &:hover {
                background: rgba(196, 225, 255, 1);
                cursor: pointer;
            }
        }
    }
}
</style>
