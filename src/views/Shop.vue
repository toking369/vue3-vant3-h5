<!--
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-03-08 16:35:52
 * @LastEditors: ''
 * @LastEditTime: 2021-04-03 18:21:20
-->
<template>
  <div class="Shop app_content">
    
    <div class="header_body">
      <header-nav :leftArrow="false" titelText="购物车"></header-nav>
    </div>

    <div class="warp_body">
      <van-pull-refresh v-model="refreshLoad" @refresh="onRefresh" class="refresh_box"> 
            <div class="refresh_content" v-if="cartList.length">
              <div  class="goods-box" v-for="(item,index) in cartList" :key="index">

                <van-swipe-cell class="swipe-cell">

                  <div class="card-box">
                    <van-checkbox style="margin-left: 10px;" v-model="item.checked" @change="oneCheckbox(item)"></van-checkbox>
                    <van-card
                        class="card-body"
                        :min="1"
                        :max="999"
                        centered
                        :desc="item.desc"
                        :title="item.name"
                        :thumb="item.img"
                        @click.stop="goto($event)"
                      >
                        <template #price>
                          <div style="color:red;"> ¥ {{item.price}}</div>
                        </template>
                      
                        <template #footer>
                          <van-stepper 
                          v-model="item.num" 
                          @plus="plus(item)" 
                          @minus="minus(item)" 
                          @blur="stpBlur(item)"
                          @overlimit="stplimit"
                          :min="1"
                          :max="99"
                          theme="round" 
                          button-size="22" />
                        </template>
                    </van-card>
                  </div>
  
                  <template #right>
                    <div style="height:100%;">
                      <van-button style="height: 100%;" square @click="delGoods(item)" type="danger" text="删除" />
                    </div>
                  </template>

                </van-swipe-cell>
                  
              </div>
            </div>
            <van-empty v-else class="no-data" description="暂无数据"/>
      </van-pull-refresh>
    </div>

    <div class="footer_body">
      <van-submit-bar :price="totalPrice" button-text="提交订单" class="footer-one-btn" @submit="onSubmit">
        <van-checkbox v-model="allchecked"  @click="allCheckbox(allchecked)">全选</van-checkbox>
      </van-submit-bar>
      <footer-nav></footer-nav>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant';
import headerNav from '@/components/common/headerNav.vue'
import footerNav from '@/components/common/footerNav.vue'
import { onMounted, reactive, toRefs, nextTick, onActivated, onDeactivated } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import util from '@/util/util'
export default {
  name: 'Shop',
  components: {
    headerNav,
    footerNav
  },
  
  setup(){
    
    const store = useStore()
    const router = useRouter()

    const data = reactive({
      allchecked:false,
      refreshLoad:false,
      cartList:[],
      totalPrice:0
    })

    const methodsMap = {
      
      //提交订单
      onSubmit:()=>{

      },

      //下拉刷新
      onRefresh:()=>{
        data.allchecked = false
        methodsMap.getCard()
      },

      //计算购物车数量
      calculationNum(){

        let num = 0

        data.cartList.forEach((item)=>{
          num += parseInt((item.num))
        })
        
        util.setGoodsNum(store,num)
      },

      //计算价格
      calculation(){
        let res = 0
        data.cartList.forEach((item)=>{
          if(item.checked){
            res += parseFloat((item.num)*parseFloat(item.price))
          }
        })
        
        methodsMap.calculationNum()
        return isNaN(res)?0:(res.toFixed(2)).replace(/\./,"")
      },

      //计算与总计
      handlerFc(){

        methodsMap.calculation()
        data.totalPrice = parseFloat(methodsMap.calculation())
      },

      //全选择 
      allCheckbox(val){
        nextTick(()=>{
          data.cartList = data.cartList.map((item)=>{
            return {
              ...item,
              checked:val
            }
          })
          data.totalPrice = parseFloat(methodsMap.calculation())
        })
       
      },

      //单个选
      oneCheckbox(item){
       
        data.cartList.forEach((it)=>{
          if(it.id == item.id){
            it.checked = item.checked
          }
        })
        data.totalPrice = parseFloat(methodsMap.calculation())
        data.allchecked = data.cartList.every((item)=>{
          return item.checked
        })
      },

      //加
      async plus(item){
        let res = await methodsMap.changeGoods({id:item.id})
        if(res.code === 20000){
          methodsMap.handlerFc()
        }else{
          item.num -= 1
          Toast(res.msg);
        }
      },

      //减
      async minus(item){

        let res = await methodsMap.changeGoods({id:item.id})
        if(res.code === 20000){
          methodsMap.handlerFc()
        }else{
          item.num += 1
          Toast(res.msg);
        }
      },

      //删除商品
      delGoods(item){

        store.dispatch('ShopCard/delGoods',{id:item.id}).then((res)=>{

          if(res.code == 20000){

            data.cartList = data.cartList.filter((it)=>{
              return it.id != item.id
            })

            nextTick(()=>{
              methodsMap.handlerFc()
            })
            
            data.allchecked = data.cartList?.length?data.cartList.every((item)=>{
              return item.checked
            }) : false
          }
          
        }).catch(()=>{

        })
      },

      //输入框失去焦点
      async stpBlur(item){
        let res = await methodsMap.changeGoods({id:item.id})
        if(res.code === 20000){
          methodsMap.handlerFc()
        }else{
          Toast(res.msg);
        }
      },

      // 最大、最小时提示
      stplimit(e){
        let tip = {
          "plus":'增加',
          "minus":'减少'
        }
        Toast(`宝贝不能再${tip[e]}了`);
      },

      //获取购物车数据
      getCard(){
        store.dispatch('ShopCard/getCard').then((res)=>{
          if(res.code == 20000){
            data.cartList = res.data
          }
          data.refreshLoad = false
        }).catch(()=>{
          data.refreshLoad = false
        })
      },

      //点击加、减、输入框处理
      goto(e){
        let target =  e.srcElement || e.target
        if(!["BUTTON","INPUT"].includes(target.tagName)){
          router.push({path:'goodsDetail'})
        }
      },

      // 操作购物车数量接口
      changeGoods(parmas){
        return new Promise((resolve,rejact)=>{
           store.dispatch('ShopCard/changeGoods',parmas).then((res)=>{
            resolve(res)
          }).catch((err)=>{
            rejact(err)
          })
        })
      }
    }
   
    onMounted(()=>{
      methodsMap.getCard()
    })

    onActivated(()=>{
      if(store.state.is_reload_card){
        methodsMap.getCard()
      }
    }),
    onDeactivated(()=>{
      store.commit("SET_RELAOD_SHOP",false)
    })

    return {
      ...toRefs(data),
      ...methodsMap
    }
  }
}
</script>
<style lang="less">
  .Shop{
    .footer-one-btn{
      bottom: 50px;
      .van-submit-bar__bar>.van-submit-bar__button--danger{
        width: 90px  !important;
        height: 30px !important;
      }
    }
  }
</style>

<style lang="less" scoped>
  .Shop{
    .warp_body{
      height: calc(100vh - 146px);
      position: relative;
      .goods-box{
        display: flex;
        background-color: #FFF;
        margin: 6px;
        border-radius: 10px;
        .swipe-cell{
          width: 100%;
        }
        .card-box{
          display: flex;
          width: 100%;
          .card-body{
            background-color: #FFF;
            border-radius: 10px;
            flex: 1;
          }
        }
        
      }
      
     }
     .warp_body>.refresh_box{
      height: 100% !important;
    }
  }
</style>