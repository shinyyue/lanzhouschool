<template>
    <div class="app-wrapper">
        <div class="app-head">
            <div class="head-top">
                <div class="head-left"
                     @click="jumpToHome()">
                    <img src="../../static/images/logo.png"
                         class="head-logo">
                    <span class="head-name">虚拟仿真实验教学平台</span>
                </div>
                <div class="head-right">
                    <div class="head-search">
                        <input class="search-left"
                               type="text"
                               placeholder="请输入关键字进行搜索">
                        <span class="search-confirm"><img src="../../static/images/search.png"
                                 alt=""></span>
                    </div>
                </div>
            </div>
            <div class="head-menu">
                <ul class="menu-wrapper">
                    <li class="menu-list-item"
                        @click="jumpToPage(item.path)"
                        v-for="(item , index) in menuList"
                        :key="index">{{item.name}}</li>
                </ul>
            </div>
        </div>
        <div class="containner app-crumbs"
             v-show="showCrumbs">
            <span>首页</span>
            <span>></span>
            <span>{{routerObject && routerObject.meta && routerObject.meta.name}}</span>
        </div>
        <div class="app-common-bg"
             v-show="showCrumbs">
            <img src="../../static/images/content-bg.jpg">
        </div>
        <div class="app-content">
            <slot></slot>
        </div>
        <div class="footer">
            <p>
                <span>
                    版权所有 兰州交通大学 通讯地址：兰州市安宁区安宁西路88号 邮编：730070
                </span>
            </p>
            <p>
                <span>
                    域名备案信息：[www.lzjtu.edu.cn/陇ICP备14001560号-2] [www.lzjtu.cn]
                </span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'common',
    props: {
        showCrumbs: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            menuList: [
                {
                    name: '首页',
                    id: 0,
                    path: '/home'
                },
                {
                    name: '学校介绍',
                    id: 1,
                    path: '/introduction'
                },
                {
                    name: '新闻公告',
                    id: 2,
                    path: '/news'
                },
                {
                    name: '规章制度',
                    id: 3,
                    path: '/rules'
                },
                {
                    name: '中心汇总',
                    id: 4,
                    path: '/center'
                },
                {
                    name: '经典案例',
                    id: 5,
                    path: '/example'
                },
                {
                    name: '资源共享',
                    id: 6,
                    path: '/source'
                },

                {
                    name: '视频锦集',
                    id: 7,
                    path: '/video'
                },
                {
                    name: '联系我们',
                    id: 8,
                    path: '/about'
                }
            ]
        }
    },
    computed: {
        routerObject() {
            return this.$router.currentRoute
        }
    },
    methods: {
        jumpToPage(path) {
            this.$router.push(path)
        },
        jumpToHome() {
            this.$router.push('/home')
        }
    }
}
</script>

<style lang="less">
@import url('../../static/css/base');
.app-wrapper {
    width: 100%;
    .app-head {
        background: @df-color;
    }
    .head-top {
        padding: 15px 0;
        margin: 0 auto;
        width: 1220px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: @df-color;
        .head-left {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;
            .head-logo {
                height: 80px;
                margin-right: 10px;
            }
            .head-name {
                border-left: 1px solid #f2f2f2;
                font-size: 32px;
                color: #fff;
                padding: 10px 10px 10px 20px;
            }
        }
        .head-right {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            .head-search {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
            }
            .search-left {
                padding: 0;
                width: 300px;
                height: 33px;
                ::-webkit-input-placeholder {
                    font-size: 12px;
                    color: #666;
                }
                padding: 0 4px;
            }
            .search-confirm {
                width: 70px;
                height: 38px;
                background: #ff6600;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
        }
    }
    .head-menu {
        width: 100%;
        background: @df-color;
        .menu-wrapper {
            margin: 0 auto;
            width: 1220px;
            display: flex;
            flex-direction: row;
            justify-items: space-around;
            align-items: center;
            .menu-list-item {
                flex: 1;
                height: 50px;
                line-height: 50px;
                text-align: center;
                color: #fff;
                font-size: 16px;
                border-bottom: 4px solid @df-color;
                &:hover {
                    border-bottom: 4px solid rgba(25, 158, 216, 1);
                    cursor: pointer;
                }
            }
        }
    }
    .app-crumbs {
        padding: 10px 0;
        > span {
            margin-right: 5px;
        }
    }
    .app-common-bg {
        > img {
            width: 100%;
        }
    }
    .app-content {
        padding: 30px 0 0;
    }
    .footer {
        background: @df-color;
        text-align: center;
        color: #fff;
        padding: 30px 0;
        line-height: 1.4;
    }
}
</style>
