import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import( /* webpackChunkName: "about" */ './views/Home.vue')
const Introduction = () => import( /* webpackChunkName: "Introduction" */ './views/Introduction.vue')
const News = () => import( /* webpackChunkName: "News" */ './views/News.vue')
const NewsDetail = () => import( /* webpackChunkName: "NewsDetail" */ './views/NewsDetail.vue')
const Rules = () => import( /* webpackChunkName: "Rules" */ './views/Rules.vue')
const RulesDetail = () => import( /* webpackChunkName: "RulesDetail" */ './views/RulesDetail.vue')
const Example = () => import( /* webpackChunkName: "Example" */ './views/Example.vue')
const ExampleDetail = () => import( /* webpackChunkName: "ExampleDetail" */ './views/ExampleDetail.vue')
const Center = () => import( /* webpackChunkName: "Center" */ './views/Center.vue')
const Source = () => import( /* webpackChunkName: "Source" */ './views/Source.vue')
const Video = () => import( /* webpackChunkName: "Video" */ './views/Video.vue')
const VideoDetail = () => import( /* webpackChunkName: "VideoDetail" */ './views/VideoDetail.vue')
const About = () => import( /* webpackChunkName: "about" */ './views/About.vue')
const Experiment = () => import( /* webpackChunkName: "about" */ './views/Experiment.vue')

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '',
            redirect: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                name: '首页'
            }
        },
        {
            path: '/introduction',
            name: 'introduction',
            component: Introduction,
            meta: {
                name: '学校介绍'
            }
        },
        {
            path: '/news',
            name: 'news',
            component: News,
            meta: {
                name: '新闻公告'
            }
        },
        {
            path: '/newsdetail',
            name: 'newsdetail',
            component: NewsDetail,
            meta: {
                name: '新闻公告'
            }
        },
        {
            path: '/center',
            name: 'center',
            component: Center,
            meta: {
                name: '中心汇总'
            }
        },
        {
            path: '/example',
            name: 'example',
            component: Example,
            meta: {
                name: '经典案例'
            }
        },
        {
            path: '/exampleDetail',
            name: 'exampleDetail',
            component: ExampleDetail,
            meta: {
                name: '经典案例'
            }
        },
        {
            path: '/source',
            name: 'source',
            component: Source,
            meta: {
                name: '资源共享'
            }
        },
        {
            path: '/rules',
            name: 'rules',
            component: Rules,
            meta: {
                name: '规章制度'
            }
        },
        {
            path: '/rulesdetail',
            name: 'rulesDetail',
            component: RulesDetail,
            meta: {
                name: '规章制度'
            }
        },
        {
            path: '/video',
            name: 'video',
            component: Video,
            meta: {
                name: '视频集锦'
            }
        },
        {
            path: '/videodetail',
            name: 'videodetail',
            component: VideoDetail,
            meta: {
                name: '视频集锦'
            }
        },
        {
            path: '/about',
            name: 'about',
            component: About,
            meta: {
                name: '关于我们'
            }
        },
        {
            path: '/experiment',
            name: 'Experiment',
            component: Experiment,
            meta: {
                name: '实验详情'
            }
        }
    ]
})
