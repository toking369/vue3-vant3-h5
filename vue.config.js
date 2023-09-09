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
  configureWebpack: (config) => {
    const plugins = [require('unplugin-vue-define-options/webpack')];
    config.plugins = [...config.plugins, ...plugins];
  },
};
