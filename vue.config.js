const config = require('./src/config/config.js')
module.exports = {
  lintOnSave: false,
  productionSourceMap:false,
  publicPath:'./',
  transpileDependencies:[],
  devServer: {
    host:"localhost",
    proxy: {
      "/app": {
        target: config.webpackUrl, //代理请求地址
        secure: true, 
        changeOrigin: true, 
        pathRewrite: {
          "^/app": "/app", 
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(true) // 修复热更新失效
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js') // 去除国际化警告
  },

  configureWebpack:config =>{
    const plugins = []
    config.plugins = [...config.plugins, ...plugins]
  }
}
