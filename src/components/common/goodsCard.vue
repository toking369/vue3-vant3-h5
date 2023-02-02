<template>
  <van-grid
    :class="cardAttr.goodsCradclass"
    :column-num="cardAttr.columnNum"
    :gutter="cardAttr.gutter"
    class="goods-crad"
  >
    <van-grid-item
      v-for="(item, index) in goodsList"
      :key="index"
      @click="goGoodsdetail(item)"
      :class="cardAttr.itemClass"
    >
      <transition
        appear
        appear-class="card-appear-class"
        appear-to-class="card-appear-to-class"
        appear-active-class="card-appear-active-class"
      >
        <div class="card-body">
          <van-image :src="item.img" />
          <div class="name_text">{{ item.name }}</div>
          <div class="price_text">¥ {{ item.price }}</div>
        </div>
      </transition>
    </van-grid-item>
  </van-grid>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  goodsList: {
    type: Array,
    default: () => {
      return [];
    },
  },
  cardAttr: {
    type: Object,
    default: () => {
      return {
        columnNum: 2,
        gutter: 6,
        itemClass: "recommend_item",
      };
    },
  },
});
const goGoodsdetail = (item) => {
  router.push({
    name: "goodsDetail",
    query: { goodsId: item.goodsId },
    isSendBusMsg: true,
  });
};
</script>
<style lang="less">
.goods-crad {
  .recommend_item {
    border-radius: 10px;
    max-width: 50%;
    .van-grid-item__content {
      border-radius: 10px;
    }
    .van-grid-item__content--surround::after {
      border-width: 0;
    }
  }
  .van-grid-item {
    max-width: 50%;
  }
}
</style>
<style lang="less" scoped>
.goods-crad {
  padding-top: 10px;
  padding-bottom: 10px;
  .card-body {
    text-align: center;
  }

  .name_text {
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    width: 100%;
    text-align: center;
    margin-top: 6px;
    font-size: 14px;
  }

  .price_text {
    margin-top: 6px;
    font-size: 12px;
    color: red;
    text-align: center;
  }

  /** 卡片过渡动画 */
  .card-appear-class {
    transform: scale(0);
  }
  .card-appear-to-class {
    transform: scale(1);
  }
  .card-appear-active-class {
    transition: transform 2s ease;
  }
}

.boutique-crad {
  flex-wrap: nowrap !important;
  overflow-x: scroll;
  .boutique_item {
    width: 25%;
  }
}
</style>
