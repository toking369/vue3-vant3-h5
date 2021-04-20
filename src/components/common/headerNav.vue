<!--
 * @Descripttion: 
 * @Author: ''
 * @Date: 2021-03-08 18:03:45
 * @LastEditors: ''
 * @LastEditTime: 2021-04-01 11:51:20
-->
 <template>
  <div class="headerNav">
     <van-nav-bar
        :title="titelTextvalue"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
      <template #left>
        <van-icon v-if="leftArrowtag" class="left-color" name="arrow-left" />
      </template>
     </van-nav-bar>
  </div>
</template>

<script>
import { reactive, toRefs} from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'headerNav',
  components: {

  },
  props:{
    leftArrow:{
      type:Boolean,
      default:true
    },
    slefBack:{
      type:Boolean,
      default:false
    },
    titelText:{
      type:String,
      default:''
    }
  },
  setup(props,{emit}){
    const router = useRouter()
   const data = reactive({
     leftArrowtag: props.leftArrow,
     titelTextvalue: props.titelText
   })
    
    let methodMap = {

      // 左边返回
      onClickLeft:()=>{
        
        if(props.leftArrow){
          if(props.slefBack){
            emit('goBack')
          }else{
            router.go(-1)
          }
        }
       
      },

      // 右边返回
      onClickRight:()=>{

      }
    }
    return {
      ...methodMap,
      ...toRefs(data)
    }
  }
}
</script>
<style lang="less" scpoed>
  .headerNav{
    position: fixed;
    top: 0;
    width: 100%;
    .left-color{
      color: black !important;
    }
  }
</style>