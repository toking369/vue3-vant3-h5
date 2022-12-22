<template>
  <div class="Classify app_content">
    <div class="header_body">
      <header-nav :leftArrow="false" titelText="分类"> </header-nav>
    </div>
    <div class="warp_body">
      <lodding-card :isLodding="isLodding">
        <div class="warp_left" v-if="classifyList.length">
          <van-sidebar v-model="classifyActive">
            <van-sidebar-item
              v-for="(item, index) in classifyList"
              :key="index"
              :title="item.classifyName"
              @click="chioceClassify(item)"
            />
          </van-sidebar>
        </div>
        <div class="warp_right">
          <refreshList
            v-model:freshMap="freshMap"
            :classMap="classMap"
            @refresh="onRefresh"
            @onLoad="onLoad"
            :resetScroll="resetScroll"
          >
            <div>
              <goodsCard
                :goodsList="goodsList"
                :cardAttr="cardAttr"
              ></goodsCard>
            </div>
            <van-empty
              v-if="goodsList.length == 0"
              class="no-data"
              description="暂无数据"
            />
          </refreshList>
        </div>
      </lodding-card>
    </div>

    <div class="footer_body">
      <footer-nav></footer-nav>
    </div>
  </div>
</template>

<script setup>
import headerNav from "@/components/common/headerNav.vue";
import footerNav from "@/components/common/footerNav.vue";
import refreshList from "@/components/common/refreshList.vue";
import goodsCard from "@/components/common/goodsCard.vue";
import loddingCard from "@/components/common/loddingCard.vue";
import { onMounted, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";

const store = useStore();
let classifyId = ref("");
let classifyActive = ref(0);
let resetScroll = ref(0);
let isLodding = ref(true);
let classifyList = reactive([]);
let goodsList = reactive([]);
let freshMap = reactive({
  refreshLoad: false,
  listLoading: false,
  listFinished: false,
});
const cardAttr = reactive({
  columnNum: 2,
  gutter: 10,
  itemClass: "recommend_item",
});
const classMap = reactive({
  refreshClass: "classify_refresh_box",
});
//下拉刷新
const onRefresh = () => {
  getGoodslist();
};

// 触底加载
const onLoad = () => {
  freshMap.listFinished = true;
  getGoodslist(true);
};

// 点击分类
const chioceClassify = (item) => {
  classifyId = item.id;
  resetScroll.value += 1;
  getGoodslist();
};

// 获取分类数据
const getClassify = () => {
  return new Promise((resolve) => {
    store
      .dispatch("Classify/getClassify")
      .then((res) => {
        if (res.code === 20000) {
          classifyList.push(...res.data);
          resolve(res.data);
        } else {
          resolve("");
        }
      })
      .catch(() => {
        resolve("");
      });
  });
};

//获取分类下的商品列表
const getGoodslist = (onLoad) => {
  store.dispatch("Classify/classifyGoods", { id: classifyId }).then((res) => {
    if (res.code === 20000) {
      goodsList = onLoad ? goodsList.concat(res.data) : res.data;
      freshMap.refreshLoad = false;
      freshMap.listLoading = false;
      freshMap.listFinished = res.listFinished;
      if (goodsList.length > 50) {
        freshMap.listFinished = true;
      }
    }
    isLodding.value = false
  }).catch(()=>{
    isLodding.value = false
  });
};

onMounted(async () => {
  let res = await getClassify();
  if (res && res.length) {
    classifyId = res?.[0].id;
    classifyId && getGoodslist();
  }else{
    isLodding.value = false
  }
});
</script>
<style lang="less" scoped>
.Classify {
  .warp_body {
    display: flex;
    height: calc(100vh - 96px);
    .warp_left {
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .warp_right {
      flex: 1;
    }
  }
}
</style>
