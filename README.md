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
   （1）配置isKeepAlive为true并且配置subMsgKey使该值整个项目路由subMsgKey唯一不重复（命名规则可以是：模块_操作_含义）
        {
            path: "/test",
            name: "test",
            component: () => import("@/views/common/test.vue"),
            meta: {
                isKeepAlive: true,
                subMsgKey: "APP_GOODS_DETAIL_PAGE",
            },
        }
   （2）使用页面导入：
        import { configureInit } from "@/common/js/configure";

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
├─src
    ├─locales
    |       ├─modules  // 模块文件夹(业务模块文件夹)
    |       |
    |       ├─ test  // test模块
    |       |     └─ test.json
    |       |
    |       └─ test.json  // test模块集合，会合并test文件夹下的json文件，所以这个（test.json）名称要与test）文件夹一致
    |       ├─ ZH-CN // 项目中文公共国际化配合配置文件
    |       └─ US-EN // 项目英文公共国际化配合配置文件
    └─index.js // 加载国际化入口

1. modules 文件夹下（一级目录）分两种: 一种是文件夹，一种是json文件。
2. modules 文件夹下（一级目录）的json文件作为模块，会以json文件名找到相同名称的文件夹，对文件夹下的json文件进行合并操作。
3. 文件夹内的合并机制是对象合并原理，在一级目录的json和处理后的文件夹下的json集合进行合并时，以一级目录的json为主。
4. 建立新模块时，modules下建一个json文件名称要与文件夹名称相同才能达到合并效果
5. 使用规则: US-EN、ZH-CN 文件夹下 $t('国际化key'),modules文件夹下，json文件->$t('json文件名.定义key')，文件夹内json->$('文件夹名.定义key')
6. 注意：本地调试，在modules文件夹内下的子文件夹内的json改动或新增时，必须要重新启动前端项目。

以上的json文件必须使用以下格式（例如：test.json）：
{
  zh:{},
  en:{}
}

```

### 项目 VUEX 配置

```
1.src/store文件夹下index.js内为第一层级的配置
2.动态加载模块：通过读取modules文件夹下的js文件作为模块，模块名为导出名（一般与文件夹名称或文件名称一致）
3.vuex的辅助函数使用：
 import { storeState，storeGetter，storeMutation，storeAction } from "@/store/storeUtil";
 const stateFn = storeState('模块名',['函数名/键值'])
 const getterFn =storeGetter('模块名',['函数名/键值'])
 const mutationFn =storeMutation('模块名',['函数名/键值'])
 const actionFn =storeAction('模块名',['函数名/键值'])
```

### 项目组件 name 属性设置

```
1.安装unplugin-vue-define-options插件，在vue.config.js进行插件配置
2.在页面组件内使用：
        <script setup>
        defineOptions({
            name: "wc-test-global-2",
        });
        </script>
```

## 项目图片

![首页](preview/home.jpeg "首页")
![分类](preview/分类.jpeg "分类")
![购物车](preview/购物车.jpeg "购物车")
![我的](preview/我的.jpeg "我的")
![地址](preview/地址二.jpeg "地址")
