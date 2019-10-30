<template>
  <div class="myticketdetails">
    <div class="mainHeader">
      <div class="shopHeader">
        <div class="headerLogo">
          <img :src="data.meeting_cover" alt />
        </div>
        <div class="headerText">{{data.meeting_name}}</div>
      </div>
      <p class="time border">
        <span class="timeLogo">
          <img src="/static/images/time.png" alt />
        </span>
        <span class="timeText">{{start_time}}-{{end_time}}</span>
      </p>
      <p class="map border" style="padding-bottom:0;">
        <span class="mapLogo">
          <img src="/static/images/map.png" alt />
        </span>
        <span class="timeText">{{data.address}}</span>
      </p>
    </div>
    <section class="code">
      <h3 class="codeH3">入场码</h3>
      <div class="codeIcon">
        <div class="icon" v-if="data.qrcode">
          <img :src="data.qrcode" alt />
          <div class="hasClass" v-if="has == 1">
            <img src="/static/images/has.png" alt />
          </div>
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
  </div>
</template>
<script>
import { time } from "../../../utils/validate";
export default {
  data() {
    return {
      data: {},
      url: "",
      has: false
    };
  },
  computed: {
    start_time() {
      return time(this.data.start_time);
    },
    end_time() {
      return time(this.data.end_time);
    },
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
    this.url = this.domains;
    this.has = v.has;
    this.init(v.id);
  },
  methods: {
    init(id) {
      this.axios
        .post({
          url: "/api/personal/ticketDetail",
          data: { id: id }
        })
        .then(res => {
          if (res.data.status == "200") {
            res.data.data.meeting_cover =
              this.domains + res.data.data.meeting_cover;
            res.data.data.qrcode = this.domains + "/" + res.data.data.qrcode;
            this.data = res.data.data;
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
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-wrap: break-word;
  word-break: normal;
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
  position: relative;
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
.hasClass {
  width: 150rpx;
  height: 150rpx;
  position: absolute;
  right: -10%;
  bottom: 0;
  z-index: 99;
}
.hasClass > img {
  width: 100%;
  height: 100%;
}
</style>