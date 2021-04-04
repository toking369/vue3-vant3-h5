/*
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-03-05 15:30:57
 * @LastEditors: ''
 * @LastEditTime: 2021-04-03 18:02:38
 */
import { createStore } from 'vuex'
import  API  from '@/api/common.js'
import REQ  from '@/request/request.js'
import Home from './modules/Home'
import Classify from './modules/Classify'
import ShopCard from './modules/ShopCard'

export default createStore({
  namespaced: true,
  state: {
    goods_card_num:0
  },
  mutations: {
    SET_GOODS_NUM(state, data){
      state.goods_card_num = data
    }
  },
  actions: {
    async getGoodsNum(state,params){
      
      let url = REQ.getRequestUrl({
        url: API.getGoodsNum
      });

      try {
        const rep = await REQ.request(url, params, { method: 'GET' });
        return rep;
      }catch (error) {
        return error;
      }
    },
  },
  modules: {
    
    Home,
    Classify,
    ShopCard
  }
})
