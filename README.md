# vue3+vant4

## 环境版本
```
nuc 16.10.9 (ncu -u)
nvm 1.1.11
node 20.0.0
npm 9.6.4
```
## 脚手架
```
master分支使用 vue-cli
vite分支使用 vite
```
## Project setup
```
npm install 或 cnpm install 

```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build:dev
npm run build:prod
```

### Lints and fixes files
```
npm run lint
```
### files
```
|-- .env    // 本地环境配置
|-- .env.dev // 测试环境配置
|-- .env.prod // 生产环境配置
|-- .eslintrc.js // es配置
|-- babel.config.js // babel配置
|-- getLocalesModel.js // 动态合并模块下多语言
|-- vue.config.js // 脚手架配置
|-- src
    |-- App.vue // 入口文件
    |-- initialize.js // 初始化文件
    |-- main.js // 入口js文件
    |-- api // api地址
    |-- assets // 样式以及图片
    |-- common // 公用模块
    |   |-- js
    |       |-- configure.js // 页面缓存时初始化函数
    |       |-- eventBus.js // 全局通知实例
    |-- components // 公用组件
    |   |-- common // 自引的公用组件
    |   |-- global // 全局注册的组件
    |-- locales // 多语言配置
    |-- request // 请求模块
    |-- router // 路由模块
    |-- store // vuex
    |-- util // 工具类
    |-- views // 页面
```
 

   
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

###

![首页](preview/home.jpeg "首页")
![分类](preview/分类.jpeg "分类")
![购物车](preview/购物车.jpeg "购物车")
![我的](preview/我的.jpeg "我的")
![地址](preview/地址二.jpeg "地址")
