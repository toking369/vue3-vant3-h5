<!--
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-03-09 09:53:00
 * @LastEditors: ''
 * @LastEditTime: 2021-04-04 15:08:38
-->

 <template>
  <div class="goodsDetail">
      <div class="header_body">
        <header-nav  titelText="商品详情"></header-nav>
      </div>
      <div class="warp_body">

        <refreshList 
            v-model:freshMap="freshMap" 
            @refresh="onRefresh"
            @onLoad="onLoad"
            >

            <div class="carousel_box">
              <carousel  v-if="carouselList.length" v-model:carouselList="carouselList"></carousel>
            </div>

            <div class="goods-info-box">
              <div class="price-body">¥ 115.56</div>
              <div class="name-body">米家恒温电水壶</div>
              <div class="share-body" @click="showShare = true"><van-icon style="float: right;" name="share-o" /></div>
            </div>

            <div class="goods-pra-box">
              <van-cell-group>
                <van-cell is-link title="选择" value="配送至:广州" />
                <van-cell is-link title="发货" value="北京 | 快递:" label="配送至:广州" />
                <van-cell is-link title="保障" value="假一赔十" />
                <van-cell is-link title="参数" value="书名" />
              </van-cell-group>
            </div>

            <div class="goods-comment-box">
             
            </div>

        </refreshList>

      </div>
      <div class="footer_body">
          <van-action-bar>
            <van-action-bar-icon icon="cart-o" @click="goShopcart" text="购物车" />
            <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
            <van-action-bar-button type="warning" text="加入购物车" />
            <van-action-bar-button type="danger" text="立即购买" />
          </van-action-bar>
      </div>
      <van-share-sheet
        v-model:show="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
      />
  </div>
</template>

<script>
import headerNav from '@/components/common/headerNav.vue'
import carousel from '@/components/home/carousel.vue'
import refreshList from '@/components/common/refreshList.vue'
import {onMounted, reactive, toRefs} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'goodsDetail',
  components: {
    headerNav,
    carousel,
    refreshList
  },
  props:{
   
  },
  setup(){

    const store = useStore()
    const router = useRouter()

    const data = reactive({
      carouselList:[],
      showShare:false,
      freshMap:{
          refreshLoad:false,
          listLoading:false,
          listFinished:false,
        },
      options: [
     [
        { name: '微信', icon: 'wechat' },
        { name: '朋友圈', icon: 'wechat-moments' },
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' },
      ],
      [
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
        { name: '小程序码', icon: 'weapp-qrcode' },
      ]
      ]
    })

    let methodsMap = {
     
      //下拉刷新
      onRefresh:()=>{
        data.freshMap.refreshLoad = true;
        Promise.all([
          methodsMap.getCarousel(),
          methodsMap.getComment(),
        ]).then(()=>{
         data.freshMap.refreshLoad = false;
        })
      },
      
      onLoad:()=>{
        
      },
      onSelect:()=>{

      },

      goShopcart(){
        router.push({path:'shop'})
      },

      //获取啥商品信息
      getCarousel:()=>{
        return new Promise((resolve,reject)=>{
          store.dispatch('Home/getCarousel').then((res)=>{
            if(res.code == 20000){
              data.carouselList = res.data
              console.log(data.carouselList);
            }
            resolve(res)
          }).catch((err)=>{
            reject(err)
          })
        })
      },

      //获取评论
      getComment:()=>{
        return new Promise((resolve,reject)=>{
          store.dispatch('Home/getCarousel').then((res)=>{
            if(res.code == 20000){
              
              console.log(res);
            }
            resolve(res)
          }).catch((err)=>{
            reject(err)
          })
        })
      },
    }
     onMounted(() => {
      methodsMap.getCarousel()
      methodsMap.getComment()
    })

    return {
      ...toRefs(data),
     ...methodsMap
    }
  }
}
</script>
<style lang="less">
  .goodsDetail{
    .goods-pra-box>.van-cell-group{
      border-radius: 10px;
      .van-cell--clickable{
        border-radius: 10px;
      }
    }
  }
</style>
<style lang="less" scoped>
    .goodsDetail{
        .carousel_box{
          height: 150px;
          width: 100%;
          padding-bottom: 10px;
        }
        .goods-info-box{
          display:flex;
          flex-direction: column;
          background-color:#FFF;
          margin: 10px;
          position: sticky;
          top: 0;
          border-radius: 10px;
          .price-body{
            color:red;
          }
          .name-body{
            font-size: 14px;
            font-weight:600;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
          }
          .price-body,.name-body,.share-body{
            padding: 10px;
          }
        }
        .goods-pra-box{
          margin-left: 10px;
          margin-right: 10px;
        }
    }
</style>