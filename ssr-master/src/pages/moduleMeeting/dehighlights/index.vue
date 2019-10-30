<template>
  <div class="dehighlights">
    <div v-if="dehighList.length">
      <section class="radioTemplate" v-for="(item,index) in dehighList" :key="index">
        <video :src="item.video_url" class="video" @error="error"></video>
        <div class="likeTemplate">
          <span class="text">{{item.title}}</span>
          <div class="linkNum">
            <div class="linkLogo" @click="give(item)">
              <img src="/static/images/give.png" alt v-if="!item.trck" />
              <img src="/static/images/give-active.png" v-else alt />
            </div>
            <span class="linkN">{{item.like}}</span>
          </div>
        </div>
      </section>
    </div>
    <p class="no" v-else>暂无数据</p>
    <go-login v-if="loggetIsHide" reLaunchUrl="../../login/main"></go-login>
  </div>
</template>
<script>
import goLogin from "../../../components/goLogin";
export default {
  data() {
    return {
      dehighList: [],
      url: "",
      loggetIsHide: false
    };
  },
  components: { goLogin },
  onLoad(v) {
    this.url = this.domains;
    this.init(v.id);
  },
  onShow() {
    this.loggetIsHide = false;
  },
  methods: {
    error(e) {
      console.log(e, "error*********");
    },
    give(item) {
      let url = "/api/meeting/like";
      this.like(item.id, url).then(res => {
        if (res.data.status == 200) {
          item.trck = !item.trck;
          if (item.trck) {
            item.like++;
            url = "/api/meeting/like";
          } else {
            item.like--;
            url = "/api/meeting/cancelLike";
          }
        } else if (res.data.status == 401) {
          this.loggetIsHide = true;
        }
      });
    },
    like(id, url) {
      return new Promise((resolve, reject) => {
        this.axios
          .post({
            url: url,
            data: { video_id: id }
          })
          .then(res => {
            resolve(res);
          });
      });
    },
    init(id) {
      this.axios
        .post({
          url: "/api/meeting/video",
          data: { meeting_id: id }
        })
        .then(res => {
          if (res.data.status == "200") {
            res.data.data.video.forEach(item => {
              this.$set(item, "trck", false);
              item.video_url = this.domains + item.video_url;
            });
            this.dehighList = res.data.data.video;
            console.log(this.dehighList, "de******");
          }
        });
    }
  }
};
</script>
<style  scoped>
.no {
  text-align: center;
  font-size: 35rpx;
  color: #666;
  margin-top: 30rpx;
}
.dehighlights {
  height: 100vh;
  background: #f4f4f4;
  padding: 20rpx;
  box-sizing: border-box;
  overflow: auto;
  position: relative;
}
.video {
  width: 100%;
  height: 400rpx;
}
.radioTemplate {
  padding-top: 30rpx;
  box-sizing: border-box;
  border-top: 1px solid #e5e5e5;
}
.radioTemplate:first-child {
  border: none;
}
.likeTemplate {
  padding: 30rpx 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.text {
  font-size: 28rpx;
  font-weight: 700;
  color: black;
}
.linkNum {
  display: flex;
  align-items: center;
}
.linkLogo {
  width: 32rpx;
  height: 32rpx;
  margin-right: 15rpx;
}
.linkLogo img {
  width: 100%;
  height: 100%;
}
.linkN {
  color: #999;
  font-size: 28rpx;
}
.red {
  color: #e60000;
}
</style>