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
                @select="selectDefault"
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
      list:[],
      disabledList: [],
    })

    let methodsMap = {
        getList:()=>{
            store.dispatch('My/getAddersslist').then((res)=>{
            if(res.code == 20000){
              data.chosenAddressId = res.data.list.filter((item)=>{return item.isDefault})?.[0].id
              data.list = res.data.list
              data.disabledList = res.data.disabledList
            }
            
          }).catch(()=>{})
        },
        onAdd:()=>{
            router.push({path:"addressEdit"})
        },
        onEdit:(item)=>{
            router.push({path:"addressEdit",query:{addressId:item.id}})
        },
        selectDefault(item){
          
          data.list.forEach((it)=>{
            if(it.id == item.id){
              it.isDefault = true
            }else{
              it.isDefault = false
            }
          })
        }
    }
    onMounted(() => {
      methodsMap.getList()
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