<template>
  <section class="notlogged">
    <div class="logget">
      <div class="loggetLogo">
        <img src="/static/images/noLogin.png" alt />
      </div>
      <div class="loggetText">
        <p class="loggetTitle">您还未登录</p>
        <p class="loggetSubTitle">（请先登录/注册再进行此操作）</p>
        <span class="goLogin" @click="goLogin">去登录</span>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    reLaunchUrl: {
      type: String,
      default: "../../login/main"
    }
  },
  methods: {
    goLogin() {
      wx.reLaunch({
        url: this.reLaunchUrl
      });
    }
  }
};
</script>
<style  scoped>
.notlogged {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  padding: 190rpx 80rpx 0 80rpx;
  box-sizing: border-box;
}
.logget {
  width: 100%;
  height: 580rpx;
  background: white;
  border-radius: 15rpx;
  position: relative;
  padding: 0 45rpx;
  box-sizing: border-box;
}
.loggetLogo {
  width: 306rpx;
  height: 290rpx;
  position: absolute;
  top: -120rpx;
  left: 50%;
  transform: translateX(-50%);
}
.loggetLogo > img {
  width: 100%;
  height: 100%;
}
.loggetText {
  padding-top: 230rpx;
  width: 100%;
  height: 100rpx;
  text-align: center;
  box-sizing: border-box;
}
.loggetTitle,
.loggetSubTitle {
  line-height: 50rpx;
}
.goLogin {
  display: block;
  border-radius: 50rpx;
  text-align: center;
  width: 100%;
  line-height: 90rpx;
  color: white;
  font-size: 30rpx;
  font-weight: 500;
  margin-top: 70rpx;
  background: #0070cc;
}
</style>