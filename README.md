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

## 项目安装

```
npm install 或 cnpm install

```

### 项目启动

```
npm run serve
```

### 项目打包

```
npm run build:dev
npm run build:prod
```

### 项目测试

```
npm run lint
```

### 项目目录结构

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

### 项目路由原理

```
路由大体分为两种：缓存页面、不缓存页面 

注意:缓存路由配置只使用push、replace跳转并且使用name:""不能使用path

1.通过路由配置+路由插件+中央事件总线+keep-alive组件+component组件共同构成
2.配置不缓存组件：配置isKeepAlive为fasle或者不配置
{
    path: "/test",
    name: "test",
    component: () => import("@/views/common/test.vue"),
    meta: {
      isKeepAlive: false 
    },
  },

3.配置缓存路由：
   （1）配置isKeepAlive为true并且配置subMsgKey使改值整个项目路由subMsgKey唯一不重复（命名规则可以是：模块_操作_含义）
        {
            path: "/test",
            name: "test",
            component: () => import("@/views/common/test.vue"),
            meta: {
                isKeepAlive: true,
                isRouterKeepAlive: true, // 是否针对路由全路径作为key缓存
                subMsgKey: "APP_GOODS_DETAIL_PAGE", 
            },
        }
   （2）使用页面需要minxs混入：import { configureInit } from "@/common/js/configure";
   （3）在使用页面（缓存页面）的生命周期使用 
        onMounted(() => {
            configureInit(() => {
                console.log("缓存页面时--总监听事件接收--用于初始化操作");
            });
        });
   （4）在（3）的configureInit内做当前页面初始化操作

   通过以上四步配置达到效果是：使用push()、replace()方法跳进页面会初始化当前页面，在当前页面再跳入其他页面后返回当前页面当前页面不会初始化起到缓存效果。例子：A->B->C, B页面缓存，C倒回B不初始化B页面，当C倒回B倒回A后再由A-B页面会执行初始化函数configureInit

4.配置无限自己跳自己缓存路由：
   （1）配置和3步骤一致基础上加isRouterKeepAlive：true配置
    {
        path: "/test",
        name: "test",
        component: () => import("@/views/common/test.vue"),
        meta: {
            isKeepAlive: true,
            isRouterKeepAlive: true, // 是否针对路由全路径作为key缓存
            subMsgKey: "APP_GOODS_DETAIL_PAGE", 
        },
    }

  （2）使用push()、replace() 在query或parmas上带唯一标识（业务Id或时间戳）

```

### 项目国际化配置

```
src/locales文件夹下：
1.ZH-CN文件夹配置中文en.json文件(不可建其他json文件)
2.US-EN文件夹配置英文zh.json文件(不可建其他json文件)
3.modules文件夹下的json,可以建多个json文件，最后以文件名作为模块合并到最终的json国际化中
4.ZH-CN/en.json、US-EN/zh.json 中配置时使用：$t("key"),modules文件夹下的json配置时使用：$t("模块名.key")

```

### 项目 VUEX 配置

```
1.src/store文件夹下index.js内为第一层级的配置
2.动态加载模块：通过读取modules文件夹下的js文件作为模块，模块名为导出名（一般与文件夹名称或文件名称一致）
```

## 项目图片

![首页](preview/home.jpeg "首页")
![分类](preview/分类.jpeg "分类")
![购物车](preview/购物车.jpeg "购物车")
![我的](preview/我的.jpeg "我的")
![地址](preview/地址二.jpeg "地址")
