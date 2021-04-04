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
            <header-nav  titelText="地址列表"></header-nav>
        </div>
        <div class="warp_body">
           <van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
            />
        </div>
    </div>
</template>

  <script>
import headerNav from '@/components/common/headerNav.vue'
import {onMounted, reactive, toRefs} from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'addressEdit',
  components: {
    headerNav
  },
  props:{
   
  },
  setup(){

    const store = useStore()

    const data = reactive({
     searchResult:[],
     areaList:{}
    })

    let methodsMap = {
        getEditdata:()=>{

        },
        onSave:()=>{

        },
        onDelete:()=>{

        },
        onChangeDetail:()=>{
            store.dispatch('Home/getCarousel').then((res)=>{
                if(res.code == 20000){
                    console.log(res);
                }
                
            }).catch(()=>{
                
            })
        }
    }
     onMounted(() => {
     
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