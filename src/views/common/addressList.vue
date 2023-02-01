<template>
  <div class="addressList">
    <div class="header_body">
      <header-nav titelText="地址列表"></header-nav>
    </div>
    <div class="warp_body">
      <lodding-card :isLodding="isLodding">
        <van-address-list
          v-model="chosenAddressId"
          :list="data.list"
          :disabled-list="data.disabledList"
          disabled-text="以下地址超出配送范围"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          @select="selectDefault"
        />
      </lodding-card>
    </div>
    <div class="footer_body"></div>
  </div>
</template>

<script setup>
import headerNav from "@/components/common/headerNav.vue";
import loddingCard from "@/components/common/loddingCard.vue";
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
let chosenAddressId = ref("");
let isLodding = ref(true);
const data = reactive({
  list: [],
  disabledList: [],
});

// 获取列表数据
const getList = () => {
  store
    .dispatch("My/getAddersslist")
    .then((res) => {
      isLodding.value = false;
      if (res.code === 20000) {
        chosenAddressId = res.data.list.filter((item) => {
          return item.isDefault;
        })?.[0].id;
        data.list = res.data.list;
        data.disabledList = res.data.disabledList;
      }
    })
    .catch(() => {
      isLodding.value = false;
    });
};

// 添加地址
const onAdd = () => {
  router.replace({ path: "addressEdit" });
};

// 修改地址
const onEdit = (item) => {
  router.replace({
    path: "addressEdit",
    query: { addressId: item.id }
  });
};

// 切换地址触发
const selectDefault = (item) => {
  const dataArr = data.list.map((it) => {
    return {
      ...it,
      isDefault: it.id == item.id ? true : false,
    };
  });
  data.list = dataArr;
};

onMounted(() => {
  getList();
});
</script>
<style lang="less" scoped>
.addressList {
  width: 100%;
}
</style>
