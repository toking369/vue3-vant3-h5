/*
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-03-12 09:23:32
 * @LastEditors: ''
 * @LastEditTime: 2021-03-12 10:52:06
 */
let envMap = {
    development:"LOC",
    DEV:'DEV',
    PRO:'PRO'
  }
const prefix = {
    LOC:"https://mockapi.eolinker.com/I5GcBE7f2ec2e412269ba0036612578a9b3e1bc30976db6", //本地（webpack配置了代理地址）
    DEV: 'https://dev.com', //测试环境
    PRO: 'https://pro.com', //生产环境
  }

let env = envMap[process.env.NODE_ENV] || 'LOC'

const getBaseUrl = function (type) {
    
    const BASE = prefix[type];

    return {
      baseUrl: BASE + '/app', // 基础接口地址
    }
  }

  let URL = {

    LOC:Object.assign(getBaseUrl('LOC'),{
      webpackUrl: prefix[env],
      baseUrl:"/app",
    }),

    DEV:Object.assign(getBaseUrl('DEV'),{

    }),

    PRO:Object.assign(getBaseUrl('PRO'),{
        
    })
    
  }
  
  let config = {
    webpackUrl:URL[env].webpackUrl || "",
    baseUrl:URL[env].baseUrl,
  }

module.exports = config