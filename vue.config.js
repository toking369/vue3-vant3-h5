/*
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-03-05 16:16:53
 * @LastEditors: ''
 * @LastEditTime: 2021-03-20 14:03:59
 */
module.exports = {
  lintOnSave: false,
  productionSourceMap:false,
  publicPath:'./',
  transpileDependencies:[],
  devServer: {
    // open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
      proxy: {//配置跨域
          '/app': {
              target: 'https://mockapi.eolinker.com/I5GcBE7f2ec2e412269ba0036612578a9b3e1bc30976db6',//这里后台的地址模拟的;应该填写你们真实的后台接口
              ws: true,
              changOrigin: true,//允许跨域
              pathRewrite: {
                '^/app': '/app'//请求的时候使用这个api就可以
              }
          }

      }
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(true) // 修复热更新失效
  },

  configureWebpack:config =>{
    const plugins = []
    config.plugins = [...config.plugins, ...plugins]
  }
}
