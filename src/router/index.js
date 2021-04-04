/*
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-03-05 15:30:48
 * @LastEditors: ''
 * @LastEditTime: 2021-03-15 19:33:46
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'App'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/classify',
    name: 'Classify',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Classify.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/views/Shop.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('@/views/My.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/common/setting.vue')
  },
  {
    path: '/addressList',
    name: 'AddressList',
    component: () => import('@/views/common/addressList.vue')
  },
  {
    path: '/addressEdit',
    name: 'AddressEdit',
    component: () => import('@/views/common/addressEdit.vue')
  },
  {
    path: '/goodsDetail',
    name: 'goodsDetail',
    component: () => import('@/views/common/goodsDetail.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
