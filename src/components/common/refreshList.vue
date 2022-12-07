
<template>
  <van-pull-refresh
    v-model="freshData.refreshLoad"
    @refresh="onRefresh"
    :class="classMap.refreshClass"
    @scroll="scrollHander"
    ref="ref_reshList"
  >
  
    <van-list
      class="van-list-body"
      v-model:loading="freshData.listLoading"
      :finished="freshData.listFinished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="20"
    >
      <slot></slot>
    </van-list>
    
  </van-pull-refresh>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from "vue";
export default {
  name: "refreshList",
  props: {
    freshMap: {
      type: Object,
      default: () => {
        return {
          refreshLoad: false,
          listLoading: false,
          listFinished: false,
        };
      },
    },
    classMap: {
      type: Object,
      default: () => {
        return {
          refreshClass: "",
        };
      },
    },
    resetScroll: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const data = reactive({
      freshData: props.freshMap,
    });

    let ref_reshList = ref();

    let methodMap = {
      //下拉刷新
      onRefresh: () => {
        emit("onRefresh");
      },

      // 触底加载
      onLoad: () => {
        emit("onLoad");
      },

      //重置滚动距离
      resetScroll: () => {
        ref_reshList.value.$el.scrollTop = 0;
      },

      //滚动监听
      scrollHander() {},
    };
    watchEffect(() => {
      if (props.resetScroll) {
        methodMap.resetScroll();
      }
    });

    return {
      ...methodMap,
      ...toRefs(data),
      ref_reshList,
    };
  },
};
</script>

<style lang="less" scoped>
.classify_refresh_box {
  height: calc(100vh - 96px);
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.van-list-body {
  height: 100%;
}
</style>
