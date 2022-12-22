
<template>
  <div class="setting">
    <div class="header_body">
      <header-nav titelText="设置"></header-nav>
    </div>
    <div class="warp_body">
      <div class="user-info-box">
        <van-row gutter="20">
          <van-col span="4">
            <van-image
              round
              width="60"
              height="60"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </van-col>
          <van-col span="20">
            <div class="right-box">
              <div class="name-text">昵称</div>
              <div class="sign-text">签名</div>
            </div>
          </van-col>
        </van-row>
        <van-cell
          class="addr-cell"
          value="收货地址"
          is-link
          @click="goAddress"
        ></van-cell>
      </div>
    </div>
    <div class="footer_body"></div>
  </div>
</template>

<script setup>
import headerNav from "@/components/common/headerNav.vue";
import { onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
const data = reactive({});
// 获取个人中心信息
const getList = () => {
  store
    .dispatch("")
    .then((res) => {
      if (res.code === 20000) {
        console.log(res);
      }
    })
    .catch(() => {});
};

// 前往地址列表
const goAddress = () => {
  router.push({ path: "addressList" });
};
onMounted(() => {});
</script>
<style lang="less" scoped>
.setting {
  .warp_body {
    height: calc(100vh - 46px);
    .user-info-box {
      position: relative;
      margin: 10px;
      padding: 10px;
      background: #fff;
      border-radius: 6px;
      font-size: 14px;
      color: #aaa;
      .right-box {
        display: flex;
        flex-direction: column;
        height: 100%;
        .name-text {
          margin: auto auto auto 10px;
        }
        .sign-text {
          margin: auto auto auto 10px;
        }
      }
      .addr-cell {
        border-top: 1px solid #eee;
        margin-top: 10px;
        padding-bottom: 0px;
      }
    }
  }
}
</style>