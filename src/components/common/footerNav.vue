<!--
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-03-08 17:39:39
 * @LastEditTime: 2021-04-03 18:41:01
-->
<template>
  <div class="footerNav">
    <van-tabbar v-model="footerActive" :route="true">
      <van-tabbar-item name="Home" replace icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item name="Classify" replace icon="shop-o" to="/classify">分类</van-tabbar-item>
      <van-tabbar-item name="Shop" replace icon="cart-o" to="/shop" :dot="dot" :badge="goodsNum" >购物车</van-tabbar-item>
      <van-tabbar-item name="My" replace icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {computed, reactive,toRefs} from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'footerNav',
  components: {

  },
  props:{
    
  },
  setup(){
    const store = useStore()
    let data = reactive({
      footerActive:'Home',
      dot:false
    });
    const goodsNum = computed(()=>{
      return store.state.goods_card_num
    })
    
    return {
      ...toRefs(data),
      goodsNum
    }
  }
}
</script>