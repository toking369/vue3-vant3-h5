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
> &ensp;&ensp; master分支使用 vue-cli

> &ensp;&ensp;vite分支使用 vite 

> &ensp;&ensp;pinia分支使用 vite + pinia ($\color{red} {推荐} $)

> &ensp;&ensp;$\color{red}{注} $：pinia分支利用脚手架(vite.config.js)插件自动导入全局库、方法、变量等

```

## 项目安装

```
npm install 或 cnpm install

```

### 项目启动

```
npm run vite
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

注意:缓存路由配置只能使用push、replace方式跳转

1.通过路由配置+路由插件+中央事件总线+keep-alive组件+component组件共同构成
2.配置不缓存组件：配置isKeepAlive为fasle或者不配置
```
```js
{
    path: "/test",
    name: "test",
    component: () => import("@/views/common/test.vue"),
    meta: {
      isKeepAlive: false 
    },
  },
```
```
3.配置缓存路由：
   （1）配置isKeepAlive为true并且配置subMsgKey使该值整个项目路由subMsgKey唯一不重复（命名规则可以是：模块_操作_含义）
```
```js
        {
            path: "/test",
            name: "test",
            component: () => import("@/views/common/test.vue"),
            meta: {
                isKeepAlive: true,
                subMsgKey: "APP_GOODS_DETAIL_PAGE", 
            },
        }
```
```
   （2）使用页面需要导入：
```
```js
        import { configureInit } from "@/common/js/configure";
```
```
   （3）在使用页面（缓存页面）的生命周期使用 
```
```js
        onMounted(() => {
            configureInit(() => {
                console.log("缓存页面时--总监听事件接收--用于初始化操作");
            });
        });
```
```
   （4）在（3）的configureInit内做当前页面初始化操作
   通过以上四步配置达到效果是：使用push()、replace()方法跳进页面会初始化当前页面，在当前页面再跳入其他页面后,再返回当前页面当前页面不会初始化起到缓存效果。例子：A->B->C, B页面缓存，C倒回B不初始化B页面，当C倒回B倒回A后，再由A-B页面会执行初始化函数configureInit

4.配置无限A页面跳A页面缓存路由：
   （1）配置和3步骤一致基础上加isRouterKeepAlive：true配置
```
```js
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
```
```

  （2）使用push()、replace() 在query或parmas上带唯一标识（业务Id或时间戳）
  （3）该配置实现的效果，A页面内有链接，点击跳转还是跳到A页面，但当业务id改变时，跳转后会触发页面初始化函数，在点击回退上一页面时，
       上一页面缓存的是跳转前的页面数据。
 5.路由(编程式)传参
   （1）使用query传参
        跳转：
```
```js
            import { useRouter } from "vue-router";
            const router = useRouter();
            router.push({
                name: "路由名称",
                query: { 参数 },
            });
```
```
        接收：
```
```js
            import { useRouter } from "vue-router";
            const router = useRouter();
            const queryParmas =  router?.currentRoute?.value?.query
```
```
    (2) 使用state传参 (用于传较多参数)
       
         跳转：
```
```js
            import { useRouter } from "vue-router";
            const router = useRouter();
            router.push({
                name: "路由名称",
                state: { 参数 },
            });
```
```
        接收：
```
```js
            const stateParmas =  history.state
```


### 项目国际化配置

```
src/locales文件夹下：
1.ZH-CN文件夹配置中文json
2.US-EN文件夹配置英文json
3.ZH-CN/common.json、US-EN/common.json 中配置时使用：$t("文件名.json文件内定义的key") 如 $t("common.home")
4. 接口返回的json格式要与本地配置的json格式一致才能起到远程覆盖本地的效果
```

### 项目 VUEX 配置

```
1.src/store文件夹下index.js内为第一层级的配置
2.动态加载模块：通过读取modules文件夹下的js文件作为模块，模块名为导出名（一般与文件夹名称或文件名称一致）
3.vuex的辅助函数使用：
```
```js
 import { storeState，storeGetter，storeMutation，storeAction } from "@/store/storeUtil";
 const stateFn = storeState('模块名',['函数名/键值'])
 const getterFn =storeGetter('模块名',['函数名/键值'])
 const mutationFn =storeMutation('模块名',['函数名/键值'])
 const actionFn =storeAction('模块名',['函数名/键值'])
```


### 项目组件 name 属性设置

```
1.安装vite-plugin-vue-setup-extend插件，在vite.config.js进行插件配置
```
```js
   import vueSetupExtend from 'vite-plugin-vue-setup-extend'
  defineConfig({
		...
        plugins: [vueSetupExtend()],
        ...
	});
```
```
2.在页面组件内使用：
```
```js
    <script setup name="wc-test-global-2">
        import { onMounted } from "vue"; // 导出vue
        onMounted(()=>{})
    </script>
```

## 项目图片

![首页](preview/home.jpeg "首页")
![分类](preview/分类.jpeg "分类")
![购物车](preview/购物车.jpeg "购物车")
![我的](preview/我的.jpeg "我的")
![地址](preview/地址二.jpeg "地址")
