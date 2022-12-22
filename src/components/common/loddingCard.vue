<template>
  <div class="lodding-card" v-if="lodding">
    <div class="lodding-body">
      <van-loading type="spinner" />
    </div>
  </div>
  <slot v-else> </slot>
</template>

<script setup>
import { ref, watchEffect } from "vue";
const props = defineProps({
  isLodding: {
    type: Boolean,
    default: true,
  },
});
let lodding = ref(props.isLodding);
watchEffect(() => {
  lodding.value = props.isLodding;
});
</script>
<style lang="less" scpoed>
.lodding-card {
  height: 100%;
  width: 100%;
  display: flex;
  .lodding-body {
    margin: auto;
  }
}
</style>
