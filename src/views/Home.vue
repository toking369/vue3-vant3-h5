<template>
  <div class="home app_content">
    <div class="header_body">
      <header-nav :leftArrow="false" titelText="首页"></header-nav>
    </div>

    <div class="warp_body">
      <refreshList
        v-model:freshMap="freshMap"
        @refresh="onRefresh"
        @onLoad="onLoad"
      >
        <div class="carousel_box">
          <carousel
            v-if="carouselList.length"
            v-model:carouselList="carouselList"
          ></carousel>
        </div>
        <div class="boutique_box">
          <van-cell :border="false" title="精品" />
          <div class="boutique_body">
            <goodsCard
              :goodsList="boutique"
              :cardAttr="boutiqueAttr"
            ></goodsCard>
          </div>
        </div>
        <div class="recommend_box">
          <van-cell :border="false" title="推荐" />
          <div class="recommend_body">
            <goodsCard :goodsList="recommend"></goodsCard>
          </div>
        </div>
      </refreshList>
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
import carousel from "@/components/home/carousel.vue";
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();
let carouselList = reactive([]);
let boutique = reactive([]);
let recommend = reactive([]);
let freshMap = reactive({
  refreshLoad: false,
  listLoading: false,
  listFinished: false,
});
const boutiqueAttr = reactive({
  columnNum: 4,
  itemClass: "boutique_item",
  goodsCradclass: "boutique-crad",
});

//获取轮播
const getCarousel = () => {
  return new Promise((resolve, reject) => {
    store
      .dispatch("Home/getCarousel")
      .then((res) => {
        if (res.code == 20000) {
          carouselList = res.data;
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//精品
const boutiqueGoods = () => {
  return new Promise((resolve, reject) => {
    store
      .dispatch("Home/boutiqueGoods")
      .then((res) => {
        if (res.code == 20000) {
          boutique = res.data;
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//推荐
const recommendGoods = (onLoad) => {
  return new Promise((resolve, reject) => {
    store
      .dispatch("Home/recommendGoods")
      .then((res) => {
        if (res.code == 20000) {
          recommend = onLoad ? recommend.concat(res.data) : res.data;
          freshMap.listLoading = false;
          freshMap.listFinished = res.listFinished;

          if (recommend.length > 50) {
            freshMap.listFinished = true;
          }
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//下拉刷新
const onRefresh = () => {
  freshMap.refreshLoad = true;
  Promise.all([
    getCarousel(),
    boutiqueGoods(),
    recommendGoods(),
  ]).then(() => {
    freshMap.refreshLoad = false;
  });
};

// 触底加载
const onLoad = () => {
  recommendGoods(true);
};

onMounted(() => {
  getCarousel();
  boutiqueGoods();
  recommendGoods();
});
</script>

<style lang="less" scoped>
.home {
  .warp_body {
    .carousel_box {
      height: 150px;
      width: 100%;
      padding-bottom: 10px;
    }
  }
  .boutique_box {
    .boutique_body {
      padding: 0px 0px 10px 0px;
    }
  }
  .recommend_box {
    .recommend_body {
    }
  }
}
</style>
