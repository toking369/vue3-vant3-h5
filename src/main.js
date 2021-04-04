/*
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-03-05 15:26:44
 * @LastEditors: ''
 * @LastEditTime: 2021-04-03 17:33:30
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/request/http'
import global from'@/components/global'

createApp(App).use(store).use(router).use(Vant).use(global).mount('#app')
