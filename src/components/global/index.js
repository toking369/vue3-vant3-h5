/*
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-04-01 17:52:02
 * @LastEditors: ''
 * @LastEditTime: 2021-04-03 14:54:23
 */

// import { createApp } from 'vue' // 引入vue

// // 处理首字母大写 abc => Abc
// function changeStr(str){
//     return str.charAt(0).toUpperCase() + str.slice(1)
// }

// /*
//     require.context(arg1,arg2,arg3)
//         arg1 - 读取文件的路径
//         arg2 - 是否遍历文件的子目录
//         arg3 - 匹配文件的正则
//     关于这个Api的用法，建议小伙伴们去查阅一下，用途也比较广泛
// */
// const requireComponent = require.context('./components', false, /\.vue$/)

// requireComponent.keys().forEach(fileName => {
//     const config = requireComponent(fileName)
    
//     const componentName = changeStr(
//         fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')   // ./child1.vue => child1
//     )
//     createApp({}).component(componentName, config.default || config) // 动态注册该目录下的所有.vue文件
// })

const context = require.context('./components', true, /\.vue$/);
const global = (Vue) => {
  context.keys().forEach((key) => {
    const component = context(key).default;
    Vue.component(component.name, component);
  });
};

export default global
