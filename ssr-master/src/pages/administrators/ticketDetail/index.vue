<template>
  <div class="myticketdetails">
    <h3 class="h3">订单信息</h3>
    <div class="mainHeader">
      <div class="shopHeader">
        <div class="headerLogo">
          <img :src="data.meeting_cover" alt />
        </div>
        <div class="headerText">{{data.meeting_name}}</div>
      </div>
    </div>
    <section class="code">
      <h3 class="codeH3">入场码</h3>
      <div class="codeIcon">
        <div class="icon">
          <img :src="data.qrcode" alt />
        </div>
      </div>
      <div class="userInfo">
        <ul class="uls">
          <li class="userInfoLis right">姓名：{{data.username}}</li>
          <li class="userInfoLis">座位：空</li>
          <li class="userInfoLis right">手机号：{{data.phone}}</li>
          <li class="userInfoLis">费用：￥{{data.amount}}</li>
          <li class="userInfoLis">
            支付状态：
            <span :class="{'red':data.status == 1 }">{{status}}</span>
          </li>
        </ul>
      </div>
    </section>
    <footer class="footer">
      <span class="ok" @click="detaile(1)">确认入场</span>
      <span class="pay" @click="detaile(0)">现场支付</span>
    </footer>
  </div>
</template>
<script>
import { toast } from "../../../utils/validate";
export default {
  data() {
    return {
      data: {},
      item: null,
      url: ""
    };
  },
  computed: {
    status() {
      let status = this.data.status;
      if (status == 1) {
        return "待支付";
      } else if (status == 2) {
        return "支付中";
      } else if (status == 3) {
        return "已支付";
      } else if (status == 4) {
        return "支付失败";
      } else if (status == 3) {
        return "取消订单";
      } else {
        return "已支付";
      }
    }
  },
  onLoad(v) {
    this.item = JSON.parse(v.data);
    this.url = this.domains;
    this.init(this.item.order_id, this.item.meeting_id, this.item.user_id);
  },
  methods: {
    init(order_id, meeting_id, user_id) {
      let query = {
        order_id: order_id,
        meeting_id: meeting_id,
        user_id: user_id
      };
      this.axios
        .post({
          url: "/api/ticketer/ticketDetail",
          data: query
        })
        .then(res => {
          if (res.data.status == "200") {
             res.data.data.meeting_cover = this.domains + res.data.data.meeting_cover;
            res.data.data.qrcode = this.domains + '/' + res.data.data.qrcode;
            this.data = res.data.data;
          }
        });
    },
    detaile(v) {
      let url;
      if (v) {
        url = "/api/ticketer/confirm";
      } else {
        url = "/api/ticketer/payment";
      }
      this.axios
        .post({
          url: url,
          data: { order_id: this.item.order_id }
        })
        .then(res => {
          if (res.data.status == "200") {
            toast(res.data.message);
            wx.navigateBack({
              delta: 1
            });
          } else if (res.data.status == "400") {
            toast(res.data.message);
          }
        });
    }
  }
};
</script>
<style  scoped>
.myticketdetails {
  width: 100%;
  min-height: 100vh;
  background: #f4f4f4;
  padding: 20rpx;
  box-sizing: border-box;
  position: relative;
}
.mainHeader {
  width: 100%;
  padding: 35rpx 30rpx;
  box-sizing: border-box;
  border-radius: 15rpx;
  background: white;
  margin-bottom: 10rpx;
}
.shopHeader {
  display: flex;
  padding-bottom: 40rpx;
  box-sizing: border-box;
}
.headerLogo {
  width: 226rpx;
  height: 154rpx;
  margin-right: 30rpx;
  /* background: rebeccapurple; */
}
.headerLogo img {
  width: 100%;
  height: 100%;
}
.headerText {
  width: calc(100% - 256rpx);
  height: 83rpx;

  font-size: 30rpx;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.border {
  padding: 30rpx 0;
  box-sizing: border-box;
  border-top: 1px solid #f1f1f1;
  align-items: center;
  display: flex;
}
.timeLogo {
  display: flex;
  align-self: auto;
  width: 30rpx;
  height: 30rpx;
  margin-right: 15rpx;
}
.timeLogo img {
  width: 100%;
  height: 100%;
}
.timeText {
  font-size: 30rpx;
  color: #666;
}
.mapLogo {
  display: block;
  width: 28rpx;
  height: 34rpx;
  margin-right: 15rpx;
}
.mapLogo img {
  width: 100%;
  height: 100%;
}
.code {
  width: 100%;
  border-radius: 15rpx;
  background: white;
  margin-bottom: 40rpx;
  padding-bottom: 60rpx;
  box-sizing: border-box;
}
.codeH3 {
  padding: 0 30rpx;
  box-sizing: border-box;
  font-size: 30rpx;
  font-weight: 600;
  line-height: 90rpx;
  border-bottom: 1px solid #f1f1f1;
}
.codeIcon {
  padding: 85rpx 0;
  box-sizing: border-box;
}
.icon {
  width: 310rpx;
  height: 310rpx;
  margin: 0 auto;

  background: black;
}
.icon img {
  width: 100%;
  height: 100%;
}
.uls {
  display: flex;
  flex-wrap: wrap;
}
.userInfo {
  padding: 0 30rpx;
  box-sizing: border-box;
}
.userInfoLis {
  width: 49%;
  line-height: 65rpx;
  border: 1px solid #f1f1f1;
  font-size: 25rpx;
  color: #646464;
  padding-left: 15rpx;
  box-sizing: border-box;
  margin-bottom: 20rpx;
}
.right {
  margin-right: 2%;
}
.red {
  color: red;
}
.green {
  color: #09bb07;
}
.footer {
  width: 100%;
  /* position: absolute; */
  bottom: 20rpx;
  left: 0;
  display: flex;
  justify-content: space-between;
}
.footer > span {
  display: block;
  width: 48%;
  border-radius: 50rpx;
  font-size: 35rpx;
  line-height: 100rpx;
  text-align: center;
  font-weight: 500;
}
.ok {
  border: 1px solid #0070cc;
  color: #0070cc;
  background: #eaf6ff;
}
.pay {
  background: #0070cc;
  color: white;
}
.h3 {
  font-size: 30rpx;
  font-weight: 600;
  padding-left: 20rpx;
  box-sizing: border-box;
  margin-bottom: 20rpx;
}
</style>