import Vue from 'vue'
import Router from 'vue-router'
// eslint-disable-next-line no-unused-vars
import main from '@/components/parts/main'

Vue.use(Router)
// 公共路由
export const constantRoutes = [
    {
        path: '/',
        name: '首页',
        component: (resolve) => require(['@/views/home/index'], resolve),
    },
    {
        path: '/3DPicture',
        name: '3D视图',
        component: main,
        children: [
            {
                path: '/panorama',
                name: '全景图',
                component: (resolve) => require(['@/views/展示3d图片/全景图/index'], resolve),
            },
            {
                path: '/CubeMap',
                name: '立方体贴图',
                component: (resolve) => require(['@/views/展示3d图片/立方体贴图/index'], resolve),
            },
        ]
    },
    {
        path: '/滚动公告',
        name: '滚动公告',
        component: main,
        children: [
            {
                path: '/横向公告',
                name: '横向公告',
                component: (resolve) => require(['@/views/滚动公告/横向公告/index'], resolve),
            },
        ]
    },

]

export default new Router({
    mode: 'hash', // 去掉url中的#
    /*mode: 'history',*/
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})
