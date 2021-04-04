<!--
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-04-04 15:26:10
 * @LastEditors: ''
 * @LastEditTime: 2021-04-04 15:26:36
-->
<template>
    <div class="addressList">
        <div class="header_body">
            <header-nav  titelText="地址列表"></header-nav>
        </div>
        <div class="warp_body">
            <van-address-list
                v-model="chosenAddressId"
                :list="list"
                :disabled-list="disabledList"
                disabled-text="以下地址超出配送范围"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit"
                />
        </div>
        <div class="footer_body">
           
        </div>
    </div>
</template>

  <script>
import headerNav from '@/components/common/headerNav.vue'
import {onMounted, reactive, toRefs} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'addressList',
  components: {
    headerNav
  },
  props:{
   
  },
  setup(){

    const store = useStore()
    const router = useRouter()

    const data = reactive({
      chosenAddressId:"",
      list:[
      {
        id: '1',
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: true,
      },
      {
        id: '2',
        name: '李四',
        tel: '1310000000',
        address: '浙江省杭州市拱墅区莫干山路 50 号',
      },
    ],
    disabledList: [
      {
        id: '3',
        name: '王五',
        tel: '1320000000',
        address: '浙江省杭州市滨江区江南大道 15 号',
      },
    ],
    })

    let methodsMap = {
        getList:()=>{
            store.dispatch('Home/getCarousel').then((res)=>{
            if(res.code == 20000){
                console.log(res);
            }
            
          }).catch(()=>{
            
          })
        },
        onAdd:()=>{
            router.push({path:"addressEdit"})
        },
        onEdit:(item)=>{
            router.push({path:"addressEdit",query:{addressId:item.id}})
        }
    }
     onMounted(() => {
     
    })

    return {
      ...toRefs(data),
     ...methodsMap
    }
  }
}
</script>
<style lang="less" scoped>
    .addressList{
        
    }
</style>