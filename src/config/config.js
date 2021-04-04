/*
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-03-12 09:23:32
 * @LastEditors: ''
 * @LastEditTime: 2021-03-12 10:52:06
 */
let envMap = {
    DEV:'DEV',
    PRO:'PRO'
  }
const prefix = {
    DEV: 'https://mockapi.eolinker.com/I5GcBE7f2ec2e412269ba0036612578a9b3e1bc30976db6',
    PRO: 'https://pro.com/app',
  }
let env = envMap[process.env.NODE_ENV] || 'DEV'

const getBaseUrl = function (type) {
    
    const BASE = prefix[type];

    return {
      baseUrl: BASE + '/app', // 基础接口地址
    }
  }

  let URL = {

    DEV:Object.assign(getBaseUrl('DEV'),{

    }),

    PRO:Object.assign(getBaseUrl('PRO'),{
        
    })
    
  }
  
  let config = {
    baseUrl: URL[env].baseUrl,
  }

export default config