/*
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-03-20 10:36:18
 * @LastEditors: ''
 * @LastEditTime: 2021-04-03 14:56:29
 */
import  API  from '@/api/ShopCard.js'
import REQ  from '@/request/request.js'
const ShopCard = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    
    async getCard(state,params){
      
      let url = REQ.getRequestUrl({
        url: API.getCard
      });

      try {
        const rep = await REQ.request(url, params, { method: 'GET' });
        return rep;
      }catch (error) {
        return error;
      }
    },
    
    async delGoods(state,params){
      
      let url = REQ.getRequestUrl({
        url: API.delGoods
      });
  
      try {
        const rep = await REQ.request(url, params, { method: 'POST' });
        return rep;
      }catch (error) {
        return error;
      }
    },

    async changeGoods(state,params){
      
      let url = REQ.getRequestUrl({
        url: API.changeGoods
      });
  
      try {
        const rep = await REQ.request(url, params, { method: 'POST' });
        return rep;
      }catch (error) {
        return error;
      }
    },

  },
 
 
}

export default ShopCard