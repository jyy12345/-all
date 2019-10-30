<template>
  <div>
    <index-banner :bannerList="bannerList" v-if="bannerList.length"></index-banner>
    <section class="main">
      <div class="information">
        <div class="informationLeft">
          <div class="meetingLogo">
            <img src="/static/images/information.jpg" alt />
          </div>
          <h3 class="meetingH3">会议信息</h3>
        </div>
        <button class="informationRight" open-type="share">
          <span>分享给好友</span>
          <div class="share">
            <img src="/static/images/share.jpg" alt />
          </div>
        </button>
      </div>
      <div class="list">
          <section
            class="listChildren"
            v-for="(item,index) in meetingList"
            :key="index"
            @click="details(item)"
          >
            <div class="listPhoto">
              <img :src="item.cover" alt />
            </div>
            <div class="listText">
              <div class="listTextTop" style="padding-bottom:0;">{{item.title}}</div>
              <div class="listTextBottom">
                <span>{{item.date}} {{item.week}}</span>
                <div class="info">
                  <div class="infoLogo">
                    <img src="/static/images/map.png" alt />
                  </div>
                  <span>{{item.address}}</span>
                </div>
              </div>
            </div>
          </section>
      </div>
    </section>
  </div>
</template>
<script>
import indexBanner from "../../components/banner"; //banner
import { toast } from "../../utils/validate";
export default {
  components: { indexBanner },
  data() {
    return {
      bannerList: [],
      meetingList: [],
      currentPage: 1,
      lastPage: 1, //总的分页数
      url: ""
    };
  },
  mounted() {
    this.url = this.domains;
    this.init();
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  onShareAppMessage: function(res) {
    if (res.from == "button") {
    }
  },
  onReachBottom() {
   this.lower();
  },
  methods: {
    lower() {
      //分页
      this.currentPage++;
      if (this.currentPage <= this.lastPage) this.init(this.currentPage);
      else {
        toast("我是有底线的");
        return;
      }
    },
    init(page = 1) {
      this.axios
        .post({
          url: `/api/index`,
          data: { page: page }
        })
        .then(res => {
          if (res.data.status == "200") {
            res.data.data.meetingList.data.forEach(item=>{
                  item.cover = this.domains + item.cover;
            });
            this.meetingList = [
              ...res.data.data.meetingList.data,
              ...this.meetingList
            ];
            this.bannerList = res.data.data.banner; //轮播图
            this.lastPage = res.data.data.last_page; //分页的最后一页
          }
        });
    },
    details(v) {
      wx.navigateTo({
        url: "../moduleMeeting/meetingContent/main?item=" + JSON.stringify(v)
      });
    }
  }
};
</script>
<style scoped>
.main {
  padding: 30rpx 20rpx;
  box-sizing: border-box;
  background: #f1f1f1;
}
.information {
  background: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 15rpx;
  box-sizing: border-box;
}
.informationLeft,
.informationRight {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: transparent;
}
.meetingLogo {
  width: 38rpx;
  height: 38rpx;
  background: royalblue;
}
.meetingLogo img {
  width: 100%;
  height: 100%;
}
.meetingH3 {
  font-size: 35rpx;
  font-weight: 600;
  margin-left: 10rpx;
}
.informationRight {
  height: 56rpx;
  border-radius: 15px;
  border: 1px solid #ccc;
  font-size: 25rpx;
  color: #0070cc;
  text-align: center;
  padding: 0 25rpx;
  box-sizing: border-box;
  justify-content: space-between;
  margin: 0;
}
.informationRight::after {
  border: none;
}
.share {
  width: 26rpx;
  height: 26rpx;
  margin-left: 15rpx;
  display: flex;
  align-self: auto;
}
.share img {
  width: 100%;
  height: 100%;
}
.list {
  margin-top: 5rpx;
}
.listChildren {
  background: white;
  margin-bottom: 10rpx;
  padding: 30rpx 15rpx;
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
  /* height: calc(100% - 49rpx); */
  font-size: 28rpx;
  font-weight: 600;
  /* padding-bottom: 45rpx; */
  box-sizing: border-box;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
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
</style>