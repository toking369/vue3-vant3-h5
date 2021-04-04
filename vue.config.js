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
    host: '0.0.0.0',
    port: 8080,
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(true) // 修复热更新失效
  },

  configureWebpack:config =>{
    const plugins = []
    config.plugins = [...config.plugins, ...plugins]
  }
}
