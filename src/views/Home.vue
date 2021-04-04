<!--
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-03-05 15:30:48
 * @LastEditors: ex_lanlj2@partner.midea.com
 * @LastEditTime: 2021-04-04 15:04:32
-->
<template>
  <div class="home app_content">
    
    <div class="header_body">
      <header-nav 
      :leftArrow="false" 
      titelText="首页"></header-nav>
    </div>

    <div class="warp_body">
          <refreshList 
            v-model:freshMap="freshMap" 
            @refresh="onRefresh"
            @onLoad="onLoad"
            >
            
            <div class="carousel_box">
              <carousel v-if="carouselList.length" v-model:carouselList="carouselList"></carousel>
            </div>

            <div class="boutique_box">
              <van-cell :border="false" title="精品" />
              <div class="boutique_body">
                <goodsCard :goodsList="boutique" :cardAttr="boutiqueAttr"></goodsCard>
              </div>
            </div>

            <div class="recommend_box">
              <van-cell :border="false" title="推荐" />
              <div class="recommend_body">
                
                <goodsCard :goodsList="recommend" ></goodsCard>
                
              </div>
            </div>
          </refreshList>
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
import carousel from '@/components/home/carousel.vue'
import {onMounted, reactive, toRefs} from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Home',
  components: {
    headerNav,
    footerNav,
    carousel,
    refreshList,
    goodsCard
  },
  setup(){
    
    const store = useStore()
   
    const data = reactive({
        carouselList:[],
        boutique:[],
        recommend:[],
        freshMap:{
          refreshLoad:false,
          listLoading:false,
          listFinished:false,
        },
        boutiqueAttr:{
          columnNum:4,
          itemClass:'boutique_item',
          goodsCradclass:'boutique-crad'
        }
    })

    const methodsMap =  {

      //获取轮播
      getCarousel:()=>{
        return new Promise((resolve,reject)=>{
          store.dispatch('Home/getCarousel').then((res)=>{
            if(res.code == 20000){
              data.carouselList = res.data
            }
            resolve(res)
          }).catch((err)=>{
            reject(err)
          })
        })
      },

      //精品
      boutiqueGoods:()=>{
        return new Promise((resolve,reject)=>{
          store.dispatch('Home/boutiqueGoods').then((res)=>{
            if(res.code == 20000){
              data.boutique = res.data
            }
            resolve(res)
          }).catch((err)=>{
            reject(err)
          })
        })
      },

      //推荐
      recommendGoods:(onLoad)=>{
         
        return new Promise((resolve,reject)=>{
          store.dispatch('Home/recommendGoods').then((res)=>{
            if(res.code == 20000){
              
              data.recommend = onLoad?data.recommend.concat(res.data):res.data
              data.freshMap.listLoading = false;
              data.freshMap.listFinished = res.listFinished; 
              
              if(data.recommend.length>50){
                data.freshMap.listFinished = true;
              }
            }
            resolve(res)
          }).catch((err)=>{
            reject(err)
          })
        })
      },

      //下拉刷新
      onRefresh:()=>{
        data.freshMap.refreshLoad = true;
        Promise.all([
          methodsMap.getCarousel(),
          methodsMap.boutiqueGoods(),
          methodsMap.recommendGoods(),
        ]).then(()=>{
         data.freshMap.refreshLoad = false;
        })
      },
      
      onLoad:()=>{
        methodsMap.recommendGoods(true)
      },
    }

    onMounted(() => {
      methodsMap.getCarousel()
      methodsMap.boutiqueGoods()
      methodsMap.recommendGoods()
    })

    return {
      ...toRefs(data),
      ...methodsMap
    }
  }
}
</script>

<style lang="less" scoped>
  .home{
    .warp_body{
      .carousel_box{
        height: 150px;
        width: 100%;
        padding-bottom: 10px;
      }
    }
    .boutique_box{
      .boutique_body{
        padding: 0px 0px 10px 0px;
       
      }
    }
    .recommend_box{
      .recommend_body{
      }
    }
  
  }
</style>
