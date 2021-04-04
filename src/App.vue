<!--
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-03-05 15:26:44
 * @LastEditors: ''
 * @LastEditTime: 2021-04-03 18:30:02
-->
<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import '@/assets/css/index.less'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import util from '@/util/util'
export default {
  name: 'App',
  components: {},
  setup(){
    const store = useStore()
    let methodsMap = {
      getGoodsnum:()=>{
        store.dispatch('getGoodsNum').then((res)=>{
            if(res.code == 20000){
              util.setGoodsNum(store,res.data || 0)
            }
        }).catch(()=>{})
      }
    }
    onMounted(()=>{
      methodsMap.getGoodsnum()
    })
    return {
      ...methodsMap
    }
  }
}
</script>
