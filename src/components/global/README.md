
## 全局加载组件
```
1.组件入口必须是：componentIndex.js
2.componentIndex.js 只改变引入组件模板即可
3.由于vue3无法使用组件的name属性，组件主文件内必须用以下定义组件名称
<script >
  export default {
      name:"组件注册名称" 
  }
</script>

4.使用时直接使用第3点内的name设置的组件名称
```

