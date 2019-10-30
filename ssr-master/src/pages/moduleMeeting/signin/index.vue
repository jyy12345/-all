<template>
  <div class="signin">
    <div class="signinBanner">
      <img :src="signinData.cover" alt />
    </div>
    <div class="sinfninmain">
      <section class="basic">
        <h3 class="h3">{{signinData.title}}</h3>
        <p class="number" v-if="signinData.is_show_number">
          <span>报名 {{signinData.apply_number}}</span>
          <span>剩余 {{signinData.number - signinData.apply_number}}</span>
        </p>
        <p class="money" :class="{'moneyTop' : !signinData.is_show_number}">￥{{signinData.amount}}</p>
        <p class="time">
          <span class="timeLogo">
            <img src="/static/images/time.png" alt />
          </span>
          <span class="Text">{{ start_time }}-{{end_time}}</span>
        </p>
        <p class="map">
          <span class="mapLogo">
            <img src="/static/images/map.png" alt />
          </span>
          <span class="Text">{{signinData.address}}</span>
        </p>
      </section>
      <section class="domain">
        <div class="domainLogo">
          <img src="/static/images/home.png" alt />
        </div>
        <div class="domainText">{{signinData.organizer}}</div>
      </section>
      <section class="details">
        <h3 class="detailsH3">会议详情</h3>
        <div class="detailsText">
          <rich-text :nodes="signinData.content"></rich-text>
        </div>
      </section>
    </div>
    <section class="reservation">
      <button open-type="share" class="reservationIcon">
        <div class="reservationIconLogo">
          <img src="/static/images/zfreservation.png" alt />
        </div>
        <p class="reservationIconText">分享</p>
      </button>
      <span class="reser" :class="{'endTrck':endTrck}" @click="reser">订座报名</span>
    </section>
    <go-login v-if="loggetIsHide" reLaunchUrl="../../login/main"></go-login>
  </div>
</template>
<script>
import { time, toast } from "../../../utils/validate";
import goLogin from "../../../components/goLogin";
export default {
  data() {
    return {
      item: null,
      signinData: {},
      loggetIsHide: false, //未登录弹框
      url: "",
      meeting_id: 0
    };
  },
  onShareAppMessage: function(res) {
    if (res.from == "button") {
    }
  },
  onShow() {
    this.loggetIsHide = false;
  },
  components: { goLogin },
  computed: {
    start_time() {
      //开始时间
      return time(this.signinData.start_time);
    },
    end_time() {
      //结束时间
      return time(this.signinData.end_time);
    },
    endTrck() {
      //活动是否截止
      let end_time = new Date(this.end_time).valueOf();
      let date = new Date().valueOf();
      if (end_time < date) return true;
      else return false;
    }
  },
  onLoad(v) {
    this.url = this.domains;
    this.meeting_id = v.id;
    this.init(v.id);
  },
  methods: {
    init(id) {
      this.axios
        .post({
          url: "/api/meeting/detail",
          data: { meeting_id: id }
        })
        .then(res => {
          if (res.data.status == "200") {
            res.data.data.cover = this.domains + res.data.data.cover;
            this.signinData = res.data.data;
            
          }
        });
    },
    reser() {
      if (!this.endTrck) {
        this.axios
          .post({
            url: "/api/order/index",
            data: { meeting_id: this.meeting_id }
          })
          .then(res => {
            if (res.data.status == "200") {
              wx.navigateTo({
                url: `../confirm/main?meeting_id=${
                  this.meeting_id
                }&item=${JSON.stringify(res.data.data)}` //确定订单
              });
            } else if (res.data.status == "401") {
              this.loggetIsHide = true;
            } else if (res.data.status == "400") {
              toast(res.data.message);
            }
          });
      } else {
        toast("报名已截止");
      }
    }
  }
};
</script>
<style scoped>
.signin {
  position: relative;
  padding-bottom: 100rpx;
  box-sizing: border-box;
}
.signinBanner {
  width: 100%;
  height: 350rpx;
}
.signinBanner img {
  width: 100%;
  height: 100%;
}
.sinfninmain {
  background: #f1f1f1;
}
.basic {
  padding: 30rpx 20rpx;
  box-sizing: border-box;
  background: white;
}
.h3 {
  font-size: 38rpx;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.number {
  padding-left: 10rpx;
  display: flex;
  font-size: 25rpx;
  color: #999;
  margin: 20rpx 0 55rpx 0;
}
.number > span:nth-child(2) {
  margin-left: 10rpx;
}
.money {
  padding-left: 20rpx;
  font-size: 38rpx;
  font-weight: 700;
  color: #0070cc;
}
.time {
  display: flex;
  align-items: center;
  margin: 50rpx 0;
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
.Text {
  font-size: 30rpx;
  color: #666;
}
.map {
  align-items: center;
  display: flex;
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
.domain {
  margin: 10rpx 0;
  padding: 20rpx;
  box-sizing: border-box;
  background: white;
  display: flex;
  align-items: center;
}
.domainLogo {
  display: flex;
  align-self: auto;
  width: 32rpx;
  height: 30rpx;
  margin-right: 15rpx;
}
.domainLogo img {
  width: 100%;
  height: 100%;
}
.domainText {
  font-size: 32rpx;
  color: #666;
}
.details {
  padding: 40rpx 20rpx;
  box-sizing: border-box;
  background: white;
}
.detailsH3 {
  font-size: 35rpx;
  font-weight: 700;
  margin-bottom: 25rpx;
}
.detailsText {
  font-size: 25rpx;
  color: #999999;
  word-wrap: break-word;
  word-break: normal;
}
.reservation {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #ccc;
  background: white;
  z-index: 99;
  padding: 10rpx 20rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.reser {
  display: block;
  width: 630rpx;
  border-radius: 50rpx;
  font-size: 30rpx;
  font-weight: 700;
  color: white;
  text-align: center;
  line-height: 75rpx;
  background: #0070cc;
}
.reservationIcon {
  background: transparent;
  padding: 0;
  margin: 0;
}
.reservationIcon::after {
  border: none;
}
.reservationIconLogo {
  width: 33rpx;
  height: 33rpx;
  margin: 0 auto;
}
.reservationIconLogo img {
  width: 100%;
  height: 100%;
}
.reservationIconText {
  margin-top: 15rpx;
  font-size: 23rpx;
  color: black;
}
.endTrck {
  background: #ccc !important;
}
.moneyTop{
  margin-top: 50rpx;
}
</style>