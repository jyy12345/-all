<template>
  <div class="inspect">
    <div class="inspectContent">
      <h3 class="title">扫描二维码验票</h3>
      <div class="insperctFooter">
        <div class="inco">
          <img src="/static/images/inspectBanner.png" alt />
        </div>
        <div class="detail" @click="scanCode">
          <div class="sm">
            <img src="/static/images/inspectSm.png" alt />
          </div>
          <span>扫码验票</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    scanCode() {
      wx.scanCode({
        success: res => {
          let result = res.result;
          result = result.split("&");
          let data = {
            meeting_id: result[0].split("=")[1],
            order_id: result[1].split("=")[1],
            user_id: result[2].split("=")[1]
          };
          wx.navigateTo({
            url: "../ticketDetail/main?data=" + JSON.stringify(data)
          });
        }
      });
    }
  }
};
</script> 
<style  scoped>
.inspect {
  width: 100%;
  height: 100vh;
  background: #0374d1;
  padding: 60rpx 30rpx;
  box-sizing: border-box;
  overflow: auto;
}
.title {
  text-align: center;
  font-size: 35rpx;
  color: #0374d1;
  background: #f8f8f8;
  line-height: 95rpx;
  font-weight: 500;
}
.inspectContent {
  background: white;
  padding-bottom: 125rpx;
  box-sizing: border-box;
}
.insperctFooter {
  padding: 0 50rpx;
  box-sizing: border-box;
  margin-top: 125rpx;
}
.inco {
  width: 566rpx;
  height: 261rpx;
}
.inco > img {
  width: 100%;
  height: 100%;
}
.detail {
  border-radius: 50rpx;
  text-align: center;
  width: 100%;
  line-height: 90rpx;
  color: white;
  font-size: 35rpx;
  font-weight: 500;
  background: #0070cc;
  margin-top: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sm {
  display: flex;
  align-self: auto;
  width: 40rpx;
  height: 40rpx;
  margin-right: 30rpx;
}
.sm > img {
  width: 100%;
  height: 100%;
}
</style>