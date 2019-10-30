<template>
  <div class="refund">
    <div class="content" v-for="(item,index) in 2" :key="index">
      <div class="contentHeader">
        <div class="left">
          <div class="icon"></div>
          <span class="contentheaderText">订单号：88888888</span>
        </div>
        <!-- <span class="stateIng">退款中</span> -->
        <span class="stateSuccess">退款成功</span>
      </div>
      <section class="listChildren">
        <!--  @click="details(item)" -->
        <div class="listPhoto">
          <img src="/static/images/index1111.jpg" alt />
        </div>
        <div class="listText">
          <div class="listTextTop">123123213123123123123123</div>
          <div class="listTextBottom">
            <span>10月30日 周三</span>
            <div class="info">
              <div class="infoLogo">
                <img src="/static/images/map.png" alt />
              </div>
              <span>北京</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import "../../../../static/wxss/conetnt.wxss";
export default {
  data() {
    return {};
  }
};
</script>
<style  scoped>
.refund {
  width: 100%;
  height: 100vh;
  padding: 20rpx;
  box-sizing: border-box;
  background: #f4f4f4;
}
.contentHeader {
  width: 100%;
  padding: 20rpx 10rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
}
.left {
  display: flex;
  align-items: center;
}
.icon {
  width: 30rpx;
  height: 30rpx;
  background: red;
  margin-right: 15rpx;
}
.icon img {
  width: 100%;
  height: 100%;
}
.contentheaderText {
  font-size: 28rpx;
  color: #666;
}
.stateIng,
.stateSuccess {
  font-size: 25rpx;
  font-weight: 500;
}
.stateIng {
  color: #0070cc;
}
.stateSuccess {
  color: #666;
}
</style>