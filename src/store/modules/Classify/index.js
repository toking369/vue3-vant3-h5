/*
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-03-11 19:32:12
 * @LastEditors: ''
 * @LastEditTime: 2021-04-03 17:59:26
 */
import  API  from '@/api/Classify.js'
import REQ  from '@/request/request.js'
const Classify = {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
        async classifyGoods(state,params){
            let url = REQ.getRequestUrl({
              url: API.classifyGoods
            });
      
            try {
              const rep = await REQ.request(url, params, { method: 'POST' });
              return rep;
            }catch (error) {
                return error;
            }
        },
        async getClassify(state,params){
          let url = REQ.getRequestUrl({
            url: API.getClassify
          });
    
          try {
            const rep = await REQ.request(url, params, { method: 'GET' });
            return rep;
          }catch (error) {
              return error;
          }
      },
    },
}

export default Classify