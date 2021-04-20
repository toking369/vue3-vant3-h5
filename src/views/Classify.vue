<!--
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-03-08 16:36:05
 * @LastEditors: ''
 * @LastEditTime: 2021-04-03 19:18:22
-->
<template>
  <div class="Classify app_content">

    <div class="header_body">
      <header-nav :leftArrow="false" titelText="分类"></header-nav>
    </div>

    <div class="warp_body">
      <div class="warp_left" v-if="classifyList.length">
        <van-sidebar v-model="classifyActive">
          <van-sidebar-item v-for="(item,index) in classifyList" :key="index" :title="item.classifyName" @click="chioceClassify(item)" />
        </van-sidebar>
      </div>
      <div  class="warp_right">
        <refreshList 
            
            v-model:freshMap="freshMap" 
            :classMap="classMap"
            @refresh="onRefresh"
            @onLoad="onLoad"
            :resetScroll="resetScroll"
            > 
              <div>
                <goodsCard :goodsList="goodsList" :cardAttr="cardAttr"></goodsCard>
              </div>
            <van-empty
                v-if="goodsList.length == 0"
                class="no-data"
                description="暂无数据"
              />
        </refreshList>
      </div>
     
    </div>

    <div class="footer_body">
      <footer-nav></footer-nav>
    </div>

  </div>
</template>

<script>
import headerNav from '@/components/common/headerNav.vue'
import footerNav from '@/components/common/footerNav.vue'
import refreshList from '@/components/common/refreshList.vue'
import goodsCard from '@/components/common/goodsCard.vue'
import {onMounted, reactive, toRefs} from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Classify',
  components: {
    headerNav,
    footerNav,
    goodsCard,
    refreshList
  },
  
  setup(){
    
    const store = useStore()

    const data = reactive({
      classifyActive:0,
      classifyList:[],
      goodsList:[],
      refreshLoad:false,
      listLoading:false,
      listFinished:false,
      classifyId:"",
      freshMap:{
          refreshLoad:false,
          listLoading:false,
          listFinished:false,
      },
      cardAttr:{
        columnNum:2,
        gutter:10,
        itemClass:'recommend_item'
      },
      classMap:{
        refreshClass:'classify_refresh_box'
      },
      resetScroll:0 
    })

    const methodsMap = {
      
      //下拉刷新
      onRefresh:()=>{
        methodsMap.getGoodslist()
      },

      // 触底加载
      onLoad:()=>{
        data.freshMap.listFinished = true
        methodsMap.getGoodslist(true)
      },
      
      // 点击分类
      chioceClassify(item){
        data.classifyId = item.id
        data.resetScroll++
        methodsMap.getGoodslist()
      },

      // 获取分类数据
      getClassify(){
        return new Promise((resolve)=>{
          store.dispatch('Classify/getClassify').then((res)=>{
            if(res.code == 20000){
              data.classifyList = res.data
            }
            resolve(res.data)
          }).catch(()=>{
            resolve('')
          })
        })
         
      },

      //获取分类商品
      getGoodslist:(onLoad)=>{
        store.dispatch('Classify/classifyGoods',{id:data.classifyId}).then((res)=>{
          if(res.code == 20000){
            data.goodsList = onLoad?data.goodsList.concat(res.data):(res.data)
            data.freshMap.refreshLoad = false
            data.freshMap.listLoading = false
            data.freshMap.listFinished = res.listFinished
            if(data.goodsList.length>50){
              data.freshMap.listFinished = true
            }
          }
        })
      },

    }

    onMounted(async ()=>{
      let res =  await methodsMap.getClassify()
      if(res&&res.length){
        data.classifyId = res?.[0].id
        data.classifyId&&methodsMap.getGoodslist()
      }
    })
    return {
      ...toRefs(data),
      ...methodsMap
    }
  }
}
</script>
<style lang="less" scoped>
  .Classify{
    .warp_body{
      display: flex;
      height: calc(100vh - 96px);
      .warp_left{
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
      }
      .warp_right{
        flex: 1;
        
      }
    }
    
  }
</style>