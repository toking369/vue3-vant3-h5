
<template>
  <van-pull-refresh
    v-model="data.freshData.refreshLoad"
    @refresh="onRefresh"
    :class="classMap.refreshClass"
    @scroll="scrollHander"
    ref="ref_reshList"
  >
    <van-list
      class="van-list-body"
      v-model:loading="data.freshData.listLoading"
      :finished="data.freshData.listFinished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="20"
    >
      <slot></slot>
    </van-list>
  </van-pull-refresh>
</template>

<script setup>
import { reactive, ref, watchEffect } from "vue";
const emit = defineEmits(["onRefresh", "onLoad"]);
const props = defineProps({
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
});
const data = reactive({
  freshData: props.freshMap,
});

let ref_reshList = ref();

//下拉刷新
const onRefresh = () => {
  emit("onRefresh");
};

// 触底加载
const onLoad = () => {
  emit("onLoad");
};

//重置滚动距离
const resetScroll = () => {
  ref_reshList.value.$el.scrollTop = 0;
};

//滚动监听
const scrollHander = () => {};
watchEffect(() => {
  if (props.resetScroll) {
    resetScroll();
  }
});
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
