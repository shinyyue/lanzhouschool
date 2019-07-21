<template>
    <div class="menu-tree-list">
        <div class="menu-title">{{menuTitle}}</div>
        <el-collapse class="menu-content"
                     accordion
                     v-model="currentIndex">
            <el-collapse-item class="menu-item"
                              :title="item.name"
                              :class="{'active': currentIndex === index}"
                              v-for="(item, index) in menuList"
                              :key="index"
                              :name="index"
                              @click="change(index)">
                <div class="menu-item-sub"
                     v-for="(v, k) in item.list"
                     :key="`v_${k}`">
                    {{v.name}}
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import { Collapse, CollapseItem } from 'element-ui'

export default {
    name: 'menu-tree',
    props: {
        menuTitle: '',
        menuList: {
            type: Array,
            default: []
        },
        activeIndex: 0
    },
    components: {
        [Collapse.name]: Collapse,
        [CollapseItem.name]: CollapseItem
    },
    watch: {
        activeIndex(val) {
            this.currentIndex = val
        }
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        change(index) {
            this.currentIndex = index
            this.$emit('change', index)
        }
    }
}
</script>

<style lang="less">
.menu-tree-list {
    width: 230px;
    .menu-title {
        width: 230px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: rgba(47, 88, 137, 1);
        font-size: 18px;
        color: #ffffff;
    }
    .el-collapse-item__header {
        padding: 0px 10px;
        color: #666;
        font-size: 16px;
        text-align: left;
        background: #ededed;
        border-bottom: 1px solid rgba(228, 228, 228, 1);
        cursor: pointer;
        &:hover {
            color: #00659c;
        }
        &.active {
            color: #00659c;
        }
        &.is-active {
            color: #00659c;
        }
    }
    .el-collapse-item__content {
        padding-bottom: 0;
    }
    .menu-item-sub {
        padding: 5px 10px;
        background: #ededed;
        cursor: pointer;
        &:hover {
            color: #00659c;
        }
    }
}
</style>


