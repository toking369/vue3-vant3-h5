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
import i18n from "@/locales"; // 导出国际化
import { onMounted } from "vue"; // 导出vue
import { useStore } from "vuex"; // 导出vuex
import { setGoodsNum, isObject } from "@/util/util"; // 导出工具类
const store = useStore(); // 实例化vuex
let methodsMap = {
  // 进入应用查询购物车数量
  getGoodsnum: () => {
    store
      .dispatch("getGoodsNum")
      .then((res) => {
        if (res?.code === 20000) {
          setGoodsNum(store, res?.data || 0);
        }
      })
      .catch(() => {});
  },

  // 远程国际化-会和本地国际化合并
  getLang: () => {
    store
      .dispatch("getLang")
      .then((res) => {
        if (res?.code === 20000) {
          if (isObject(res) && isObject(res?.data)) {
            Object.keys(res?.data).forEach((key) => {
              i18n.global.mergeLocaleMessage(key, res?.data[key]);
            });
          }
        }
      })
      .catch(() => {});
  },
};
onMounted(() => {
  methodsMap.getGoodsnum();
  methodsMap.getLang();
});
</script>
