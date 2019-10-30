<template>
  <div class="my">
    <header class="header">
      <div class="headerInfo">
        <div class="logo" @click="enter">
          <img :src="avatarUrl" alt />
        </div>
        <span class="infotText">
          <p class="company" @click="login">{{company ? company : ''}}</p>
          <p class="name">{{ userName}}</p>
        </span>
      </div>
      <div class="certification" v-if="trck">
        <div class="certificationIcon" v-if="certification ==3">
          <img src="/static/images/certification1.png" alt />
        </div>
        <span v-if="certification ==1" class="goCertifi" @click="enter">去认证</span>
        <span class="certificationIcon" v-if="certification ==2" >
          <img src="/static/images/certification2.png" alt />
        </span>
      </div>
    </header>
    <section class="getTicket" v-if="!role">
      <div class="tickTop">
        <span class="myTick">我的票券</span>
        <div class="fall"  @click="myTicket">
          <span class="fallText">全部票券</span>
          <div class="fallIcon">
            <img src="/static/images/my-icon-right.png" alt />
          </div>
        </div>
      </div>
      <div
        class="tickContent listChildren"
        @click="details(user.ticket.ticket_id)"
        v-if="user.ticket"
      >
        <div class="listPhoto">
          <img :src="url + user.ticket.meeting_cover" alt />
        </div>
        <div class="listText">
          <div class="listTextTop" style="padding-bottom:0;">{{user.ticket.meeting_name}}</div>
          <div class="listTextBottom">
            <span>{{user.ticket.meeting_date}} {{user.ticket.meeting_week}}</span>
            <div class="info">
              <div class="infoLogo">
                <img src="/static/images/map.png" alt />
              </div>
              <span>{{user.ticket.meeting_address}}</span>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="no">暂无可用票券</p>
    </section>
    <section class="order" v-if="!role && user">
      <div class="orderContent" @click="paysState(0)">
        <my-info :num="user.count_unpay" v-if="user.count_unpay"></my-info>
        <div class="orderIcon">
          <img src="/static/images/paystatus0.png" alt />
        </div>
        <p class="orderText">待支付</p>
      </div>
      <div class="orderContent" @click="paysState(1)">
        <my-info :num="user.count_success" v-if="user.count_success"></my-info>
        <div class="orderIcon">
          <img src="/static/images/paystatus1.png" alt />
        </div>
        <p class="orderText">已支付</p>
      </div>
      <div class="orderContent" @click="paysState(2)">
        <div class="orderIcon">
          <img src="/static/images/paystatus2.png" alt />
        </div>
        <p class="orderText">已结束</p>
      </div>
      <div class="orderContent" style="border:none;" @click="paysState(3)">
        <div class="orderIcon">
          <img src="/static/images/paystatus3.png" alt />
        </div>
        <p class="orderText">全部订单</p>
      </div>
    </section>
    <section class="other" v-if="!role">
      <ul class="otherUls">
        <li class="otherLis" v-for="(item,index) in otherList" :key="index" @click="build(item)">
          <span class="otherText">{{item}}</span>
          <div class="fallIcon">
            <img src="/static/images/my-icon-right.png" alt />
          </div>
        </li>
      </ul>
    </section>
       <div class="detail" v-if="role" @click="scanCode">
          <div class="sm">
            <img src="/static/images/inspectSm.png" alt />
          </div>
          <span @click="scanCode">扫码验票</span>
        </div>
  </div>
</template>
<script>
import myInfo from "../../components/myInfo"; //订单个状态的数量(待支付，已支付，已结束)
export default {
  data() {
    return {
      otherList: [
        "我的企业",
        "会议展板",
        "我的发票",
        "添加到我的小程序",
        "报错反馈"
      ],
      avatarUrl: "/static/images/avatar.png", //用户头像
      userName: " 登录后体验更多功能", //用户姓名
      company: "点击登录", //公司名字
      trck: false, //判断是否显示当前用户的认证状态
      certification: 1, //判断当前用户是否认证/待审核 1未绑定企业,2待审核，3审核成功
      user: {ticket:null},
      role: false, //true是管理员
      url:""
    };
  },
  components: { myInfo },
  mounted() {
    this.url = this.domains;
  },
  onShow() {
     let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
         this.myInfo();
      userInfo = JSON.parse(userInfo);
      this.avatarUrl = userInfo.avatarUrl;  //头像
      // this.userName = userInfo.nickName; //昵称
      // this.company = "暂未认证公司";
      // this.trck = true;
    }
  },
  methods: {
    myInfo() {
      this.axios
        .post({
          url: "/api/personal/index"
        })
        .then(res => {
          if (res.data.status == "200") {
            this.user = res.data.data;
            let data = res.data.data;
            this.trck = true;
            this.certification = data.status  //公司审核状态
            if(data.status == 2){
              this.company = "企业认证审核中";
            }else if(data.status == 1){
              this.company = "暂无认证公司";
            }else{
              this.company = data.user.company_name ;//公司名称
            }
            this.role = data.user.type ?  true:false ;  //是否为管理员
            this.userName = data.user.username; //姓名
          }else if(res.data.status == '401'){
              wx.clearStorageSync();
              this.userName = '登录后体验更多功能';
              this.company = '点击登录';
              this.trck = false;
          }
        });
    },
    build(v) {
      if (wx.getStorageSync("userInfo")) {
        switch (v) {
          case "我的企业":
            wx.navigateTo({ url: "../moduleMy/mybrand/main" });
            break;
          case "管理员":
            wx.navigateTo({ url: "../administrators/inspectTicket/main" });
          default:
            break;
        }
      } else wx.reLaunch({ url: "../login/main" });
    },
    personal() {
      //个人资料
      if (wx.getStorageSync("userInfo")) {
        wx.navigateTo({ url: "../moduleMy/personalData/main" });
      } else wx.reLaunch({ url: "../login/main" });
    },
    paysState(v) {
      //订单状态
      if (wx.getStorageSync("userInfo")) {
        wx.navigateTo({ url: "../moduleMy/paysState/main?state=" + v });
      } else wx.reLaunch({ url: "../login/main" });
    },
    login() {
      if (!wx.getStorageSync("userInfo"))
        wx.navigateTo({
          url: "../login/main"
        });
    },
    enter() {
      //公司认证
      if (wx.getStorageSync("userInfo")) {
        wx.navigateTo({
          url:
            "../moduleMy/enterprisesEnter/main?certification=" +
            this.certification + "&avatarUrl=" + this.avatarUrl + '&userName=' + this.userName
        });
      } else wx.reLaunch({ url: "../login/main" });
    },
    myTicket() {
      //我的票券
      if (wx.getStorageSync("userInfo")) {
        wx.navigateTo({
          url: "../moduleMy/myTicket/main"
        });
      } else wx.reLaunch({ url: "../login/main" });
    },
    details(id) {
      //票券详情
      if (wx.getStorageSync("userInfo")) {
        wx.navigateTo({ url: "../moduleMy/myTicketDetails/main?id=" + id });
      } else wx.reLaunch({ url: "../login/main" });
    },
    scanCode(){
      wx.navigateTo({
        url:"../administrators/inspectTicket/main"
      })
    }
  }
};
</script>
<style  scoped>
.my {
  width: 100%;
  height: 100vh;
background: url(https://img-blog.csdnimg.cn/20191010150102879.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zOTc3MzIxOA==,size_16,color_FFFFFF,t_70) no-repeat;
  background-size: cover;
  padding: 50rpx 20rpx 20rpx 20rpx;
  box-sizing: border-box;
  overflow: auto;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.no {
  /* margin: 30rpx 0 25rpx 0; */
  text-align: center;
  line-height: 100rpx;
  font-size: 30rpx;
  color: #ccc;
}
.headerInfo {
  display: flex;
  align-items: center;
}
.logo {
  width: 118rpx;
  height: 118rpx;
  /* background: #ccc; */
  border-radius: 50%;
  margin-right: 25rpx;
}
.logo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.company {
  font-size: 30rpx;
  font-weight: 600;
  color: white;
  margin-bottom: 25rpx;
}
.name {
  font-size: 30rpx;
  color: white;
}
.infoType {
  width: 108rpx;
  height: 43rpx;
  background: red;
}
.infoType img {
  width: 100%;
  height: 100%;
}
.getTicket {
  border-radius: 15rpx;
  background: white;
  margin: 30rpx 0 25rpx 0;
}
.tickTop {
  padding: 25rpx 20rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
}
.myTick {
  font-size: 33rpx;
  font-weight: 600;
}
.fall {
  display: flex;
  align-items: center;
}
.listChildren {
  background: white;
  margin-bottom: 10rpx;
  padding: 25rpx 20rpx;
  box-sizing: border-box;
  display: flex;
}
.listPhoto {
  width: 230rpx;
  height: 155rpx;
  border-radius: 5rpx;
  background: yellowgreen;
  margin-right: 30rpx;
}
.listPhoto img {
  width: 100%;
  height: 100%;
}
.listText {
  width: calc(100% - 260rpx);
}
.listTextTop {
  font-size: 28rpx;
  font-weight: 600;
  padding-bottom: 45rpx;
  box-sizing: border-box;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-all;
}
.listTextBottom {
  margin-top: 29rpx;
  font-size: 20rpx;
  display: flex;
  justify-content: space-between;
  color: #999999;
}
.info {
  display: flex;
}
.infoLogo {
  width: 28rpx;
  height: 34rpx;
  margin-right: 15rpx;
}
.infoLogo img {
  width: 100%;
  height: 100%;
}
.fallText {
  font-size: 28rpx;
  color: #ccc;
}
.fallIcon {
  width: 15rpx;
  height: 25rpx;
  margin-left: 15rpx;
  display: flex;
  align-self: auto;
}
.fallIcon img {
  width: 100%;
  height: 100%;
}
.order {
  display: flex;
  background: white;
  border-radius: 15rpx;
  padding: 30rpx 20rpx;
  box-sizing: border-box;
  margin-bottom: 20rpx;
}
.order > div {
  width: 25%;
}
.orderContent {
  position: relative;
  text-align: center;
  border-right: 1px solid #f1f1f1;
}
.orderIcon {
  width: 50rpx;
  height: 50rpx;
  margin: 0 auto;
}
.orderIcon > img {
  width: 100%;
  height: 100%;
}
.orderText {
  font-size: 28rpx;
  margin-top: 10rpx;
}
.other {
  background: white;
  border-radius: 15rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
}
.otherLis {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 0;
  box-sizing: border-box;
  border-top: 1px solid #f1f1f1;
}
.otherLis:first-child {
  border: none;
}
.otherText {
  font-size: 30rpx;
  font-weight: 500;
}
.goCertifi {
  padding: 0 20rpx;
  box-sizing: border-box;
  font-size: 23rpx;
  text-align: center;
  border-radius: 15rpx;
  background: white;
  color: #0070cc;
  line-height: 35rpx;
}
.certificationIcon {
  display: block;
  width: 108rpx;
  height: 43rpx;
}
.certificationIcon > img {
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
  margin-top: 300rpx;
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