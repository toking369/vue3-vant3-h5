import  API  from '@/api/My.js'
import REQ  from '@/request/request.js'
const Classify = {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
        async getAddersslist(state,params){
          let url = REQ.getRequestUrl({
            url: API.getAddersslist
          });
    
          try {
            const rep = await REQ.request(url, params, { method: 'GET' });
            return rep;
          }catch (error) {
              return error;
          }
      },
      async getAddressedit(state,params){
        let url = REQ.getRequestUrl({
          url: API.getAddressedit
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

export default Classify