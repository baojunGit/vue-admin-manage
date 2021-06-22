/**
 * @Description: router setting
 * @Author: Baojun
 * @Date: 2021-6-16
 * @LastEditors: Baojun
 * @LastEditTime: 2021-6-16
 */

 import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'

 const routes: Array<RouteRecordRaw> = [
     {
         name:'login',
         path:'/login',
         meta:{
             title:'登陆页'
         },
         component:()=>import('@/views/common/Login.vue')
     },
     {
        name:'Axios',
        path:'/Axios',
        meta:{
            title:'axios请求'
        },
        component:()=>import('@/views/common/Axios.vue')
    },
    {
        name:'test',
        path:'/test',
        meta:{
            title:'登陆页'
        },
        component:()=>import('@/views/common/Test.vue')
    },
    {
        name:'vuex',
        path:'/vuex',
        meta:{
            title:'登陆页'
        },
        component:()=>import('@/views/common/Vuex.vue')
    }
 ]

 const router: Router = createRouter({
     history:createWebHashHistory(),
     routes  // 相当于 routes:routes
 })

 export default router