<template>
  <div class="footerNav">
    <van-tabbar v-model="data.footerActive" :route="true">
      <van-tabbar-item name="Home" replace icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item name="Classify" replace icon="shop-o" to="/classify">分类</van-tabbar-item>
      <van-tabbar-item
        name="Shop"
        replace
        icon="cart-o"
        to="/shop"
        :dot="data.dot"
        :badge="goodsNum"
        >购物车</van-tabbar-item>
      <van-tabbar-item name="My" replace icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();
let data = reactive({
  footerActive: "Home",
  dot: false,
});

const goodsNum = computed(() => {
  return store.state.goods_card_num;
});
</script>