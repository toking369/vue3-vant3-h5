<template>
  <router-view v-slot="{ Component, route }">
    <!-- 路由缓存 -->
    <keep-alive>
      <component
        :is="Component"
        v-if="route?.meta?.isKeepAlive"
        :key="route?.meta?.isRouterKeepAlive ? route?.fullPath : route?.name"
      />
    </keep-alive>

    <!-- 不缓存 -->
    <component
      :is="Component"
      v-if="!route?.meta?.isKeepAlive"
      :key="route.name"
    />
  </router-view>
</template>

<script setup name="App">
import "@/assets/css/index.less"; // 引入样式文件
import { onMounted } from "vue"; // 导出vue
import { getGoodsnum, getLang } from "@/initialize"; // 引入初始化函数
onMounted(() => {
  getGoodsnum();
  getLang();
});
</script>
