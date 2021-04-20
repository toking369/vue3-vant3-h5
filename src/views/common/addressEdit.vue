<!--
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-04-04 15:26:10
 * @LastEditors: ''
 * @LastEditTime: 2021-04-04 15:26:36
-->
<template>
    <div class="addressEdit">
        <div class="header_body">
            <header-nav :slefBack="true" @goBack="goBack" titelText="地址列表"></header-nav>
        </div>
        <div class="warp_body">
           <van-address-edit
            :area-list="areaList"
            :address-info="addressInfo"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="areaColumns"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
            />
        </div>
    </div>
</template>

  <script>
import headerNav from '@/components/common/headerNav.vue'
import  util  from '@/util/area'
import {nextTick, onMounted, reactive, toRefs} from 'vue'
import { useStore } from 'vuex'
import { useRouter,useRoute } from 'vue-router'
export default {
  name: 'addressEdit',
  components: {
    headerNav
  },
  props:{
   
  },
  setup(){

    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
        searchResult:[],
        areaList:util.areaList,
        addressInfo:{},
        areaColumns:['请选择', '请选择', '请选择']
    })

    let methodsMap = {
        // 返回
        goBack(){
           router.replace('addressList')
        },
        
        // 保存地址操作
        onSave:()=>{
            router.replace('addressList')
        },

        // 删除地址操作
        onDelete:()=>{
            router.replace('addressList')
        },

        // 修改详细地址
        onChangeDetail:()=>{
           
        },

        // 获取编辑地址数据
        getEditdata:(addressId)=>{

            store.dispatch('My/getAddressedit',{addressId:addressId}).then((res)=>{
                if(res.code == 20000){
                    data.addressInfo = res.data
                    data.areaColumns = [ res.data.province, res.data.city, res.data.area]
                }
                
            }).catch(()=>{

            })
        }
    }
    onMounted(() => {
       
        route?.query.addressId && methodsMap.getEditdata(route.query.addressId);

        if(!route?.query.addressId){
            nextTick(()=>{
                data.addressInfo = {}
            })
        }
        
    })

    return {
      ...toRefs(data),
     ...methodsMap,
    }
  }
}
</script>
<style lang="less" scoped>
    .addressEdit{
        .warp_body{
            height: calc(100vh - 46px);
        }
    }
</style>