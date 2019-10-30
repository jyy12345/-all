<template>
  <div class="myticket">
    <header class="header">
      <!-- （{{use}}） -->
      <div class="use" :class="{'border_bottom':addborder}" @click="border('未使用')">未使用</div>
      <span class="li"></span>
      <!-- （{{has}}） -->
      <div class="has" :class="{'border_bottom':!addborder}" @click="border('已使用')">已使用</div>
    </header>
    <section class="myticketMain" v-if="myTicketList.length">
      <section
        class="listChildren"
        v-for="(item,index) in myTicketList"
        :key="index"
        @click="details(item)"
      >
        <div class="listPhoto">
          <img :src="item.meeting_cover" alt />
        </div>
        <div class="listText">
          <div class="listTextTop">{{item.meeting_name}}</div>
          <div class="listTextBottom">
            <span>{{item.meeting_date}} {{meeting_week}}</span>
            <div class="info">
              <div class="infoLogo">
                <img src="/static/images/map.png" alt />
              </div>
              <span>{{item.meeting_address}}</span>
            </div>
          </div>
        </div>
        <div class="filter" :class="{'useClass':addborder , 'hasClass' : !addborder}"></div>
      </section>
    </section>
    <p class="no" v-else>{{addborder ? '暂无可用票券' :"暂无已使用票券"}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      use: 1, //未使用数量
      has: 2, //已使用数量
      addborder: true,
      lastPage: 1,
      myTicketList: [],
      currentPage: 1,
      url: ""
    };
  },
  onUnload() {
    //页面卸载
    this.myTicketList = [];
    this.addborder = true;
  },
  mounted() {
    this.url = this.domains;
    this.init();
  },
  onReachBottom() {
    this.lower();
  },
  methods: {
    // status = 0(未使用) 1(已使用)
    init(status = 0, page = 1) {
      this.axios
        .post({
          url: "/api/personal/ticketList",
          data: { status: status, page: page }
        })
        .then(res => {
          if (res.data.status == "200") {
            this.lastPage = res.data.data.last_page;
            res.data.data.data.forEach(item => {
              item.meeting_cover = this.domains + item.meeting_cover;
            });
            this.myTicketList = [...this.myTicketList, ...res.data.data.data];
          }
        });
    },
    lower() {
      this.currentPage++;
      if (this.currentPage <= this.lastPage)
        this.init(this.addborder ? 0 : 1, this.currentPage);
      else {
        wx.showToast({
          title: "我是有底线的",
          icon: "none",
          duration: 1000
        });
        return;
      }
    },
    border(v) {
      if (v == "未使用") {
        this.addborder = true;
        this.myTicketList = [];
        this.currentPage = 1;
        this.init();
      } else {
        this.addborder = false;
        this.myTicketList = [];
        this.currentPage = 1;
        this.init(1);
      }
      this.currentPage = 1;
    },
    details(item) {
      //票卷详情
      let has;
      if (this.addborder) {
        has = 0;
      } else {
        has = 1;
      }
      wx.navigateTo({
        url: "../myTicketDetails/main?id=" + item.id + "&has=" + has
      });
    }
  }
};
</script>
<style  scoped>
.myticket {
  width: 100%;
  height: 100vh;
  background: #f4f4f4;
}
.border_bottom {
  border-bottom: 1px solid #0070cc;
}
.header {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  padding: 20rpx 100rpx 0 100rpx;
  box-sizing: border-box;
  background: white;
}
.header > div {
  font-size: 30rpx;
  font-weight: 500;
  color: #222222;
  text-align: center;
  padding-bottom: 30rpx;
  box-sizing: border-box;
}
.li {
  display: block;
  width: 5rpx;
  height: 30rpx;
  background: #f4f4f4;
  margin-top: 10rpx;
}
.myticketMain {
  padding: 20rpx;
  box-sizing: border-box;
  background: #f4f4f4;
}
.listChildren {
  background: white;
  /* margin-bottom: 10rpx; */
  border-radius: 15rpx;
  padding: 30rpx 15rpx;
  display: flex;
  position: relative;
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
  height: 83rpx;
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
.filter {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 15rpx;
}
.useClass {
  /* background: url(https://img-blog.csdnimg.cn/20191010150537433.png) no-repeat
    95% rgba(255, 255, 255, 0.5); */
  background: url(https://img-blog.csdnimg.cn/20191023092733895.png) no-repeat
    95% rgba(255, 255, 255, 0.5);
  background-size: 20%;
}
.hasClass {
  background: url(https://img-blog.csdnimg.cn/20191010150450817.png) no-repeat
    95% rgba(255, 255, 255, 0.8);
  background-size: 20%;
}
.no {
  margin: 40rpx 0;
  text-align: center;
  font-size: 30rpx;
  color: #999999;
}
</style>