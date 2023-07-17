const localesPath = "./getLocalesModel";
const modelPath = "./src/locales/modules"
const { getLangJson } = require(localesPath);
getLangJson(modelPath)
module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: "./",
  transpileDependencies: [],
  devServer: {
    host: "localhost",
    proxy: {
      "/app": {
        target: process.env.VUE_APP_BASE_URL, //代理请求地址
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          "^/app": "/app",
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(true); // 修复热更新失效
    config.resolve.alias.set("vue-i18n", "vue-i18n/dist/vue-i18n.cjs.js"); // 去除国际化警告
   
  },

  configureWebpack: (config) => {
    const plugins = [require('unplugin-vue-define-options/webpack')];
    config.plugins = [...config.plugins, ...plugins];
  },
};
