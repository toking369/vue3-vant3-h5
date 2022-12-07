<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="Shop">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
import "@/assets/css/index.less";
import { onMounted } from "vue";
import { useStore } from "vuex";
import util from "@/util/util";
const store = useStore();
let methodsMap = {
  // 进入应用查询购物车数量
  getGoodsnum: () => {
    store
      .dispatch("getGoodsNum")
      .then((res) => {
        if (res.code == 20000) {
          util.setGoodsNum(store, res.data || 0);
        }
      })
      .catch(() => {});
  },
};
onMounted(() => {
  methodsMap.getGoodsnum();
});
</script>
