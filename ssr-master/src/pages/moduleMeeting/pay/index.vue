<template>
  <div class="pay confirm">
    <section>
      <section class="shop">
        <div class="shopHeader">
          <div class="headerLogo" v-if="data.meeting.cover">
            <img :src="data.meeting.cover" alt />
          </div>
          <div class="headerText">{{data.meeting.title}}</div>
        </div>
        <p class="time border">
          <span class="timeLogo">
            <img src="/static/images/time.png" alt />
          </span>
          <span class="timeText">{{start_time}}-{{end_time}}</span>
        </p>
        <p class="map border">
          <span class="mapLogo">
            <img src="/static/images/map.png" alt />
          </span>
          <span class="timeText">{{data.meeting.address}}</span>
        </p>
      </section>
      <div>
        <section class="success">
          <div class="orderTop">
            <div class="successTop">
              <div class="successLogo">
                <img src="/static/images/wx.png" alt />
              </div>
              <div class="text">订座成功！</div>
            </div>
            <p class="successText">请及时付款，避免座位释放。</p>
          </div>
          <div class="order_sn">
            <!-- <p
              v-for="(item,index) in data.order_ids"
              :key="index"
            >订单号：{{item.order_sn}} 姓名：{{item.order_sn}} </p>
            </div>-->
            <div class="order_sn_title">
              <span style="text-align:left;">订单号</span>
              <span>姓名</span>
            </div>
            <ul class="order_sn_ul">
              <li class="order_sn_lis" v-for="(item,index) in data.order_ids" :key="index">
                <span class="text" >{{item.order_sn}}</span>
                <span class="text">{{item.username}}</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <section class="vesway">
        <ul class="veswayUls">
          <li class="veswayTitle">选择支付方式</li>
          <li class="veswayIcon icon" v-if="is_open_wechat">
            <div class="vaswayLogo">
              <div class="payLogo">
                <img src="/static/images/wx.png" alt />
              </div>
              <span class="vaswayText">微信支付</span>
            </div>
            <radio-group @change="radioChange('wx')">
              <radio :checked="wechat"></radio>
            </radio-group>
          </li>
          <li class="veswayIcon">
            <div class="vaswayLogo">
              <div class="payLogo">
                <img src="/static/images/xx.png" alt />
              </div>
              <span class="vaswayText">线下支付</span>
            </div>
            <radio-group @change="radioChange('xx')">
              <radio :checked="offline"></radio>
            </radio-group>
          </li>
        </ul>
      </section>
      <section class="vesway" v-if="offline" style="margin-top:20rpx;">
        <div class="xxHeader">线下转账信息</div>
        <div class="xxContent">
          <p class="xxcontentText">
            <span class="xxleft">户名</span>
            <span class="xxright">{{data.receipt.name}}</span>
          </p>
          <p class="xxcontentText">
            <span class="xxleft">账户</span>
            <span class="xxright">{{data.receipt.account}}</span>
          </p>
          <p class="xxcontentText">
            <span class="xxleft">开户行</span>
            <span class="xxright">{{data.receipt.bank}}</span>
          </p>
        </div>
      </section>
    </section>
    <section class="soft">
      <div class="sortNum">
        <span>合计：</span>
        <span>￥{{soft}}</span>
      </div>
      <span class="confir" @click="pay">立即支付</span>
    </section>
  </div>
</template>
<script>
import { time, toast } from "../../../utils/validate";
export default {
  data() {
    return {
      offline: true, //线下支付
      wechat: false, //微信支付
      meeting_id: 0, //会议id
      data: null,
      soft: 0, //总价
      url: "",
      is_open_wechat: false //是否启用微信缴费0否，1启用
    };
  },
  computed: {
    start_time() {
      //开始时间
      return time(this.data.meeting.start_time);
    },
    end_time() {
      //结束时间
      return time(this.data.meeting.end_time);
    }
  },
  onLoad(v) {
    this.data = JSON.parse(v.data);
    // this.data.meeting.cover = this.domains + this.data.meeting.cover;
    this.meeting_id = v.meeting_id;
    this.soft = v.soft;
    this.url = this.domains;
    let is_open_wechat = this.data.meeting.is_open_wechat; //是否启用微信缴费0否，1启用
    if (is_open_wechat) {   //控制微信支付是否显示
       this.is_open_wechat = true; //是否显示微信支付
       //this.offline = true; //默认支付状态是线下支付
       //this.wechat = false; 
    } else {
        this.is_open_wechat = false;
      // this.offline = false;
        // this.wechat = false;
    }

    //（从订单列表跳转过来）生成订单的时候用户选择的支付方式 
    let channel = this.data.channel; //1-线上微信支付，2-线下支付，3现场支付  
    if(channel == '1'){
        this.wechat = true;
        this.offline = false;
    }else if(channel == '2'){
      this.wechat = false;
        this.offline = true;
    }
  },
  methods: {
    pay() {
      //立即支付
      if (this.wechat) {
        //微信支付
        let query = {
          order_ids: JSON.stringify(this.data.order_ids), //订单号群
          meeting_id: this.meeting_id, //会议id
          total_amount: this.soft, //总价
          unique_sn: this.data.unique_sn //订单唯一标识
        };
        this.axios
          .post({
            url: "/api/payment",
            data: query
          })
          .then(res => {
            if (res.data.status == "200") {
              let data = res.data.data;
              wx.requestPayment({
                timeStamp: String(data.timeStamp),
                nonceStr: String(data.nonceStr),
                package: String(data.package),
                paySign: String(data.paySign),
                signType: "MD5",
                success(res) {
                  wx.navigateTo({
                    url: "../../moduleMy/paysState/main?state=" + 1 //已支付
                  });
                },
                fail(res) {
                  wx.navigateTo({
                    url: "../../moduleMy/paysState/main?state=" + 0 //待支付
                  });
                }
              });
            } else if (res.data.status == "400") {
              toast(res.data.message);
            }
          });
      } else {
        //线下支付
        this.axios
          .post({
            url: "/api/order/offLine",
            data: { unique_sn: this.data.unique_sn }
          })
          .then(res => {
            if (res.data.status == "200") {
              wx.navigateTo({
                url: "../../moduleMy/paysState/main?state=" + 0
              }); //待支付
            } else if (res.data.status == "400") {
              toast(res.data.message);
            }
          });
      }
    },
    radioChange(e) {
      if (e == "wx") {
        this.wechat = true;
        this.offline = false;
      } else {
        this.wechat = false;
        this.offline = true;
      }
    }
  }
};
</script>
<style  scoped>
.confirm {
  width: 100%;
  height: 100vh;
  /* overflow-y: auto; */
  /* -webkit-overflow-scrolling: touch; */
  /* background: #0070cc; */
  background: url(https://img-blog.csdnimg.cn/20191010150102879.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zOTc3MzIxOA==,size_16,color_FFFFFF,t_70
) no-repeat;
  background-size: cover;
  padding: 40rpx 20rpx 120rpx 20rpx;
  box-sizing: border-box;
  position: relative;
  overflow: auto;
}
.shop {
  width: 100%;
  border-radius: 15rpx;
  background: white;
  padding-top: 40rpx;
  box-sizing: border-box;
}
.shopHeader {
  display: flex;
  padding: 0 30rpx 40rpx 30rpx;
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
  word-wrap: break-word;
  word-break: normal;
}
.border {
  padding: 30rpx;
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
.soft {
  width: 100%;
  height: 100rpx;
  position: fixed;
  left: 0;
  bottom: 0;
  background: white;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20rpx;
  box-sizing: border-box;
}
.softNum {
  display: flex;
}
.sortNum > span:nth-child(1) {
  font-size: 25rpx;
  color: #ccc;
}
.sortNum > span:nth-child(2) {
  font-size: 35rpx;
  font-weight: 600;
  color: #0070cc;
}
.confir {
  display: block;
  width: 435rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 30rpx;
  font-weight: 600;
  color: white;
  border-radius: 50rpx;
  background: #0070cc;
}
.success {
  padding: 35rpx 25rpx;
  box-sizing: border-box;
  background: #eaf6ff;
  border: 1px solid #48a0e8;
  margin: 20rpx 0;
}
.successTop {
  display: flex;
  align-items: center;
}
.successLogo {
  width: 39rpx;
  height: 36rpx;
  margin-right: 15rpx;
}
.successLogo img {
  width: 100%;
  height: 100%;
}
.text {
  font-size: 30rpx;
  color: #333;
}
.successText {
  margin-top: 20rpx;
  font-size: 27rpx;
  color: #666666;
  padding-left: 44rpx;
  box-sizing: border-box;
}
.vesway {
  background: white;
  border-radius: 10rpx;
}
.veswayUls > li {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 30rpx 20rpx;
  box-sizing: border-box;
}
.veswayTitle,
.xxHeader {
  font-size: 32rpx;
  font-weight: 600;
}
.xxHeader {
  padding: 30rpx 20rpx;
  /* line-height: 60rpx; */
  box-sizing: border-box;
  border-bottom: 1px solid #f1f1f1;
}
.xxContent {
  padding: 30rpx 20rpx;
  box-sizing: border-box;
}
.xxcontentText {
  display: flex;
  line-height: 70rpx;
}
.xxleft,
.xxright {
  font-size: 26rpx;
}
.xxleft {
  width: 80rpx;
  color: #888888;
  margin-right: 35rpx;
}
.icon {
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
}
.vaswayLogo {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.payLogo {
  width: 39rpx;
  height: 36rpx;
  margin-right: 15rpx;
}
.payLogo img {
  width: 100%;
  height: 100%;
}
.vaswayText {
  font-size: 30rpx;
  font-weight: 500;
}
.orderTop {
  padding-bottom: 30rpx;
  box-sizing: border-box;
  border-bottom: 1px dashed #0070cc;
}
.order_sn {
  padding-top: 30rpx;
  padding-left: 44rpx;
  box-sizing: border-box;
  font-size: 25rpx;
  color: #666666;
  line-height: 70rpx;
}
.order_sn_title {
  display: flex;
}
.order_sn_title > span {
  display: block;
  width: 50%;
  font-size: 30rpx;
  font-weight: 550;
  line-height: 60rpx;
  text-align: center;
}
.order_sn_lis {
  display: flex;
  justify-content: center;
  text-align: center;
  line-height: 70rpx;
  font-size: 27rpx;
  color: #666666;
}
.order_sn_lis > span {
  width: 50%;
}
</style>